const fs = require('fs');
const path = require('path');

const index = [];
const benchmarks = [];

const assetsPath = path.join(__dirname, '..', 'public', 'assets');

fs.readdirSync(path.join(__dirname, 'results'))
  .forEach(fileName => {
    try{
      let {benchmark} = JSON.parse(fs.readFileSync(path.join(__dirname, 'results', fileName)));
      const {suites} = benchmark;

      delete benchmark.suites;
      index.push(benchmark.id);

      fs.writeFileSync(path.join(assetsPath, 'suites', `${benchmark.id}.json`), JSON.stringify({suites: suites.map(suite => {
        suite.benchmark = benchmark.id;
        return suite;
      })}));
      fs.writeFileSync(path.join(assetsPath, 'benchmarks', `${benchmark.id}.json`), JSON.stringify({benchmark}));
    } catch (e) {
      console.error('error for', fileName);
    }
  });

fs.writeFileSync(path.join(assetsPath, 'benchmarks.json'), JSON.stringify({benchmarks: index}));
