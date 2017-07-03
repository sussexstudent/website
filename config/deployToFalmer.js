require('isomorphic-fetch');
const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

if (process.env.FALMER_DEPLOY_SECRET === undefined) {
  console.error('Deploy key not set!');
  process.exit(1);
}

readFileAsync('./dist-falmer/index.html', {
  encoding: 'utf-8',
})
  .then(content =>
    fetch('https://falmer.sussexstudent.com/frontend/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${process.env.FALMER_TOKEN}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: content,
      }),
    })
  )
  .then(res => {
    if (res.status === 200) {
      console.log('Deployed!');
      process.exit(0);
    } else {
      console.error('Failed to deploy!', res.status);
    }
  })
  .catch(e => console.error('Failed to deploy!', e));
