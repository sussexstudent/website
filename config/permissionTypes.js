const path = require('path');
const fetch = require('node-fetch');
const fs = require('fs');

// const LOCAL = 'http://localhost:8000';
const FALMER = 'https://falmer.sussexstudent.com';

fetch(`${FALMER}/graphql/`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      query P {
        permissions {
          id
          name
          codename
          contentType
        }
      }
    `,
  }),
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const permissions = result.data.permissions.map(
      permission => `${permission.contentType}_${permission.codename} = ${permission.id},`,
    );
    fs.writeFile(path.join(__dirname, '../src/types/permissions.generated.ts'), `export enum Permission {\n${permissions.join('\n')}\n}`, err => {
      if (err) {
        console.error('Error writing permissions types file', err);
      } else {
        console.log('Permission types generated!');
      }
    });
  });
