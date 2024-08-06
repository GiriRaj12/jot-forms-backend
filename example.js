const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {google} = require('googleapis');
const { GoogleAuth, auth } = require('google-auth-library');

async function getSheetsClient(values){
    const client = auth.fromJSON({
            "type": "service_account",
            "project_id": "sustained-flow-340218",
            "private_key_id": process.env.PRIVATE_KEY_ID,
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQD3NmAQD98hK2um\nWsvIE4193okwQcpwwB9hj/KtepnNM85bjvChW41Rn9pDG7lUhXU/qQvFQnNzKyTy\nTI4L+wDBNrJipDVg67WrAb+hRQhzbsNq10HGKHSWxylSUzvZAsj2LRIVbROWGspS\nX7wikQKXtwvTS7AIZ36/1hQLbHLr7M+uFOR3WudUfh7viicm2g4v+LvOmFjwJ9JW\n0RVWqqpCC3dxMGoudHHjQLHhsmO/dGweLsA2AY74QuyeyPLEGbz8vpdF3Bjr4jSH\nc/uUhEtY1gbfSr28BHVNvLRRlBeN0pPXTB6krmm6rj9Nf85zr4+UxBi0ao2IB+/v\nCUpKLCGfAgMBAAECggEAGn5N0jrZN1VPbp8ZasJJrh0cx7qtRuMYGd0S7WuPsxGj\nwmUxvaExpndCrWF5vail1aI4vDWwaL3Nclgo+vi17n79pBukCtSH/iEsV8ytqK1M\nrRUPm/x27je+4m9AITQutE9FOl2btUD+wNA4ud2fkQHRdx4L6gKpb0aylDzVnhnn\nhX51lZDkLiRAlSH/w6OV01a9M3AgzoowRxLP9bZHPC8iKFlecp67lM1u3jPPxR00\nW7cvMWOZAqfhgcZUOtEwRezmNrYbBuvc0YmOh68t42qewkPd387l3zJ7YGHWxSvS\nGtckGo4rILItO9c5NQYM2OooxfoXzWvk8tJbV+yb5QKBgQD986XmCJy/kZKi/kUa\nlqAtuPfT4rn6bfRFMpuwmhuKP2ljb9ygEEkYAdXtFFOuo7p3yzi7vWuUlTgT6rVV\nGSdtoV4rmRGqdnT0xp1TK79y042uYYf9kxL1zruLCZqJkT0KOhQfYX5Cbwnp0q5T\n9nP0OiWwSLRnO+blUflMZg8e2wKBgQD5NM/fZTGr8VcXguF5VzBUFYSmTnzgkiqO\nGQidV1ApRQxQkOGHc/IVEDxA6AahGbj9T8nTiRYw+nSroORlXeoWYgW2SDv/gbt6\na/QD3pCOlIlF9gm/kgQd780upOTT6e/nJ6AGWDo+Q2lcpDCEhZtTqPKUhOcXK6VR\n4b1WZbpZjQKBgC8+RH6m24JH8p+f7fskSmg3IOOqKi8MhYTaBVy1TqpJYbG9/a1J\nWk+9B68zON4kV2wxwjwq4PijSetqnpFWPJ+IhZxWvZKYtulSibIPUW5rLNBkFIh3\n8+8Gpp0XDEjLXC+q3lN4L6TsQ0vchdHY53ln19sTq3wJCMtglKBB3E5BAoGAcNE0\nzhh8vS970vwAYTNUgKxhKfzcUbo6I6w3lytg8d39bje4sd6OmHSKIoQoBCSl9594\nahhkgHXR/aTP4Qf8InfryBK5frlXi1t1046deL7Lym1RCnXrATZ/d/9UTI9aeRYa\nPuUQMQHJoBQAlu35XI1ejFgCWh37MK92TLeu/j0CgYA8tEowdLftkWRI4VJQX6v5\ne9Adqf4lwADgUaB4RZN8vIpJ0jaGyAb/5saBYj2tXlMh+K6Ez7fc7btboKRp0C4u\n4x2GEzO0vIOUwBAeFI2GIKBNDkKTLGD+IXHXrkOiWGC/KZal/MIUFsLdTax/jeWA\nHtqN8Av6v4GsWoKJgL9Mww==\n-----END PRIVATE KEY-----\n",
            "client_email": process.env.CLIENT_EMAIL,
            "client_id": "106746565490532137965",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": process.env.CLIENT_URI,
            "universe_domain": "googleapis.com"     
    });

    client.scopes = ["https://www.googleapis.com/auth/spreadsheets"];
    client.apiKey = process.env.API_KEY;


    const token = await client.getAccessToken();

    console.log(token);

    const sheets = google.sheets({version: 'v4', auth: client});

    const range = await sheets.spreadsheets.values.batchGet({
        spreadsheetId: '1fqhfrhLkx65Hkd0A52aLWGOWXxvO97DrhINo1H_fOGI',
        ranges: 'A1:M1000'
    });

    const upendCursor = Number(range.data.valueRanges.length) + 2;

    console.log(`A${upendCursor}:M${upendCursor}`);

    const result = await sheets.spreadsheets.values.append({
        spreadsheetId: '1fqhfrhLkx65Hkd0A52aLWGOWXxvO97DrhINo1H_fOGI',
        range: `A${upendCursor}:M${upendCursor}`,
        valueInputOption: 'RAW',
        requestBody: {'values' : [values]}
    });

    return result;
}


function getPushValues(values){
    const pushValues = [];
    pushValues.push(values['ID']);
    pushValues.push(values['First_Name']);
    pushValues.push(values['Last_Name']);
    pushValues.push(values['DOB']);
    pushValues.push(values['Gender']);
    pushValues.push(values['City']);
    pushValues.push(values['State']);
    pushValues.push(values['Country']);
    pushValues.push(values['Company_Name']);
    pushValues.push(values['Courses']);
    pushValues.push(values['Phone_Number']);
    pushValues.push(values['Profession']);
    pushValues.push(values['Photo']);

    return pushValues;
}

async function upload(values){
    try {
        values = getPushValues(values);
        console.log("Push Values ", values);
        const result = await getSheetsClient(values);
        console.log(`${result.data.updates.updatedCells} cells appended.`);
        return result;
      } catch (err) {
        console.log(err);
        // TODO (developer) - Handle exception
        throw err;
      }
}

module.exports = { upload }