/* global require, process, __dirname */

var AWS = require('aws-sdk'),
  RSVP = require('rsvp'),
  path = require('path'),
  zlib = require('zlib'),
  fs = require('fs');

const BUCKET = 'flamingo-bench',
  REGION = process.env.REGION || 'eu-central-1',
  ACCESS = process.env.ACCESS,
  SECRET = process.env.SECRET;

AWS.config.update({
  region: REGION,
  accessKeyId: ACCESS,
  secretAccessKey: SECRET
});

var s3 = new AWS.S3();

var params = {
  Bucket: BUCKET /* required */
};

function getObject(key) {
  var params = {
    Bucket: BUCKET, /* required */
    Key: key /* required */
  };
  return new RSVP.Promise((resolve, reject) => {
    s3.getObject(params, function (err, data) {
      if (err) reject(err); // an error occurred
      resolve(data);
    });
  });
}


s3.listObjects(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response

  const keys = data.Contents
    .map(object => object.Key.replace(/.gz$/, ''))
    .filter(key => {
      var fileExists = false;
      try {
        fileExists = fs.statSync(path.join(__dirname, `results/${key}`)).isFile();
      } catch (e) {
        fileExists = false;
      }
      return !fileExists;
    });

  RSVP.all(keys.map(key => getObject(`${key}.gz`).then(object =>
      fs.writeFileSync(path.join(__dirname, `results/${key}`),
        zlib.gunzipSync(object.Body).toString('utf8'), 'utf8'))))
    .then(() => {

      var benchmarks = fs.readdirSync(path.join(__dirname, 'results'))
        .map(benchmarkName => JSON.parse(fs.readFileSync(path.join(__dirname, `results/${benchmarkName}`), 'utf8')).benchmark)
        .map(benchmark => {
          if (!benchmark.tags) {
            benchmark.tags = [];
          }
          return benchmark;
        })
        .map(JSON.stringify);

      fs.writeFileSync(path.join(__dirname, '../public/assets/benchmarks.json'), `[${benchmarks.join(',')}]`, 'utf8');
    }).catch(e => console.error(e));
});
