## Verify Emails

Reference:  
https://hunter.io/api-documentation/v2#email-verifier

- Checks email, status, MX records, connection to SMTP server, and SMTP check for bounced emails.
- Reads from `data.js` file. Data must be in the format of an array of string emails.
- Data gets output and appended to `output.txt`.
