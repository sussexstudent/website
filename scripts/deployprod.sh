npm run prod;
s3cmd put --recursive ./dist/ s3://ussu-static/ --config=.s3cfg --acl-public
npm run gen;
