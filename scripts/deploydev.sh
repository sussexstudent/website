`npm bin`/webpack -p --config webpack.prod.config.js;
(cd ./prototypes && `npm bin`/wintersmith build ./prototypes);
mkdir ./prototypes/build/assets
mv ./dist/* ./prototypes/build/assets/;
(cd ./prototypes/build && surge --domain ussu.surge.sh)
