const path = require('path');
const fetch = require('node-fetch');
const { promises: fs } = require('fs');

const FALMER = 'https://falmer.sussexstudent.com';


async function createPermissionTypes() {
  const req = await fetch(`${FALMER}/graphql/`, {
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
  });

  const result = await req.json();

  // here we're filtering out any type information unrelated to unions or interfaces
  const permissions = result.data.permissions.map(
    permission => `${permission.contentType}_${permission.codename} = ${permission.id},`,
  );

  try {
    await fs.writeFile(path.join(__dirname, '../packages/common/src/types/permissions.generated.ts'), `export enum Permission {\n${permissions.join('\n')}\n}`);
    console.log('Permission types generated!');
  } catch (e) {
    console.error('Error writing permissions types file', e);
  }
}

async function createApolloTypes() {
  const req = await fetch(`${FALMER}/graphql/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
    }),
  });

  const result = await req.json();

  // here we're filtering out any type information unrelated to unions or interfaces
  const filteredData = result.data.__schema.types.filter(
    type => type.possibleTypes !== null,
  );

  result.data.__schema.types = filteredData;
  try {await fs.writeFile(path.join(__dirname, '../fragmentTypes.json'), JSON.stringify(result.data));
    console.log('Fragment types successfully extracted!');
  } catch(e) {
    console.error('Error writing fragmentTypes file', e);

  }
}

async function localRequired() {
  await fs.writeFile('packages/website/webpack-assets.json', '{}', 'utf-8');

  try {
    await fs.stat('packages/website/dist');
  } catch (e) {
    await fs.mkdir('packages/website/dist');
  }

  try {
    await fs.stat('sanguine-dist');
  } catch (e) {
    await fs.mkdir('sanguine-dist');
  }

  await fs.writeFile('packages/website/dist/manifest.json', '{}', 'utf-8');
}


module.exports = { createApolloTypes, localRequired, createPermissionTypes };
