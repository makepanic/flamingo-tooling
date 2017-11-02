const fs = require('fs');
const path = require('path');

let logs = fs.readdirSync(path.join(__dirname, 'logs'));

const benchmarkHeaderRegex = /^result:\r\n benchmark\-[0-9a-f]{8}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-z]{12}\.json/gm;
const whitespaceRegex = /}\r\n/gm;
const filenameRegex = /(benchmark\-[0-9a-f]{8}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-z]{12}\.json)/;

function resetRegexes() {
  benchmarkHeaderRegex.lastIndex = 0;
  whitespaceRegex.lastIndex = 0;
  filenameRegex.lastIndex = 0;
}

function extractLogBenchmarkResults(logfile) {
  const fileContent = fs.readFileSync(path.join(__dirname, `logs/${logfile}`), {encoding: 'utf8'});
  const benchmarkHeaderResult = benchmarkHeaderRegex.exec(fileContent);

  if (benchmarkHeaderResult && benchmarkHeaderResult.length) {
    const json = fileContent.substring(benchmarkHeaderResult.index + benchmarkHeaderResult[0].length);
    const fileNameResult = filenameRegex.exec(fileContent.substring(benchmarkHeaderResult.index));


    if (fileNameResult && fileNameResult.length > 1) {
      const fileName = fileNameResult[1];

      const whitespaceAfterJson = whitespaceRegex.exec(json);
      const benchmarkResult = json.substring(0, whitespaceAfterJson.index).trim() + "}";

      console.log(`writing results for ${fileName}`);
      fs.writeFileSync(path.join(__dirname, 'results', fileName), benchmarkResult, {encoding: 'utf8'});
    } else {
      console.log(`skipping ${logfile}`);
    }
  } else {
    console.log(`skipping ${logfile}`);
  }

  resetRegexes();
}

logs.forEach(extractLogBenchmarkResults);
