import 'dotenv/config';
import data from './data.js';
import axios from 'axios';
import fs from 'fs';

const API_KEY = process.env.API_KEY;
const API_ENDPOINT = process.env.API_ENDPOINT;

const main = async () => {
  const emails = emailToLowerCase(data);

  for (const email of emails) {
    await axios
      .get(`${API_ENDPOINT}${email}&api_key=${API_KEY}`)
      .then(function (response) {
        // handle success
        //   https://hunter.io/api-documentation/v2#email-verifier
        let email = response.data.data.email;
        let status = response.data.data.status;
        let mxRecords = response.data.data.mx_records;
        let smtpServer = response.data.data.smtp_server;
        let smtpCheck = response.data.data.smtp_check;

        appendToFile(email, status, mxRecords, smtpServer, smtpCheck);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
};

const emailToLowerCase = (array) => {
  return array.map((value) => value.toLowerCase());
};

const appendToFile = async (
  email,
  status,
  mxRecords,
  smtpServer,
  smtpCheck
) => {
  const vendorInfo = `${email}     ${status}      ${mxRecords}    ${smtpServer}      ${smtpCheck}`;

  await fs.appendFile('output.txt', `${vendorInfo}\n`, (err) => {
    if (err) {
      console.log(err);
    } else {
      // Get the file contents after the append operation
      console.log('Appended to File');
    }
  });
};

main();
