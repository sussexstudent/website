npm run prod;
s3cmd put --recursive ./dist/ s3://ussu-static/ --config=.s3cfg --acl-public
node ./scripts/combine-prod-wintersmith-assets.js
(cd ./prototypes && `npm bin`/wintersmith build --config ./config-prod.json);
mkdir ./prototypes/build/assets
mv ./dist/* ./prototypes/build/assets/;
(cd ./prototypes/build && surge --domain ussu.surge.sh)
