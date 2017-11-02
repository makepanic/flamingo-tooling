const fs = require('fs');
const path = require('path');
const got = require('got');

const logs = fs.readdirSync(path.join(__dirname, 'logs'));

got('https://api.travis-ci.org/repos/piobyte/flamingo/builds', {
  headers: {
    'Accept': 'Accept: application/vnd.travis-ci.2+json'
  },
  json: true
}).then(({body: {builds}}) => {
  const jobs = [];

  builds.forEach(({job_ids}) => jobs.push(...job_ids));

  let prom = Promise.resolve();

  jobs
    .map(jobId => `${jobId}`)
    .filter(jobId => logs.indexOf(jobId) === -1)
    .forEach(jobId => {
      prom = prom.then(() => {
        console.log(`loading job ${jobId} log`);
        return got(`https://api.travis-ci.org/jobs/${jobId}/log.txt?deansi=true`)
          .then(({body}) => fs.writeFileSync(path.join(__dirname, 'logs', `${jobId}`), body));
      });
    });

  prom.catch(e => console.error(e));
  prom.then(() => console.log('done'));
});
//
// fs.readdirSync(path.join(__dirname, 'results'))
//   .forEach(fileName => {
//     try{
//       const benchmark = JSON.parse(fs.readFileSync(path.join(__dirname, 'results', fileName)));
//       all.push(benchmark.benchmark);
//     } catch (e) {
//       console.error('error for', fileName, e);
//     }
//   });
//
// console.log('writing');
// fs.writeFileSync(path.join(__dirname, '..', 'public', 'assets', 'benchmarks.json'), JSON.stringify(all));
//
//
// // build fixtures dataset
// const inputs = {};
// all.forEach(benchmark => {
//   let suite = benchmark.suites[0];
//   let timestamp = new Date(benchmark.t).setHours(0, 0, 0, 0);
//   const version = benchmark.v;
//
//   suite.topics.forEach(topic => {
//     topic.inputs.forEach(input => {
//       inputs[input.name] = inputs[input.name] || {};
//
//       input.variants.forEach(variant => {
//         inputs[input.name][variant.name] = inputs[input.name][variant.name] || {};
//         inputs[input.name][variant.name][version] = inputs[input.name][variant.name][version] || {
//             max: Number.MIN_VALUE,
//             min: Number.MAX_VALUE,
//             time: timestamp,
//             version: version,
//             sum: 0,
//             count: 0
//           };
//         inputs[input.name][variant.name][version].count++;
//         inputs[input.name][variant.name][version].sum += variant.hz;
//
//         if (variant.hz > inputs[input.name][variant.name][version].max) {
//           inputs[input.name][variant.name][version].max = variant.hz;
//         }
//         if (variant.hz < inputs[input.name][variant.name][version].min) {
//           inputs[input.name][variant.name][version].min = variant.hz;
//         }
//       });
//     });
//   });
// });
//
// fs.writeFileSync(path.join(__dirname, '..', 'public', 'assets', 'fixtures.json'), JSON.stringify(inputs));
