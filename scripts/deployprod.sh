npm run prod;
s3cmd put --recursive --add-header="Cache-Control: public, max-age=365000000, immutable" ./dist/ s3://ussu-static/ --config=.s3cfg --acl-public
npm run gen;
