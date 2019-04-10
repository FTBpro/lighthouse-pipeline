import { runPipeline } from '@lighthouse-pipeline/core';
import { runInfluxDbPlugin } from '@lighthouse-pipeline/influx-db-writer-plugin';
import { runS3Plugin } from '@lighthouse-pipeline/s3-writer-plugin';

const path = require('path');
const app = require('express')();

const jobs = [];

const port = 1337;

app.get('/add', (req, res) => {
  const { url, tag } = req.query;
  if (!url) {
    return res.status(400).send('URL not defined');
  }
  if (!tag) {
    return res.status(400).send('Tag not defined');
  }
  addToJobs(url, tag);
  res.sendStatus(204);
});

const addToJobs = (url, tag) => {
  const job = { url, tag, timestamp: Date.now() };
  jobs.push(job);
  console.log('added job: ', job);
};


function runLighthouseAudit(url, tag) {
  return runPipeline()
    .registerUrl(url)
    .registerChromePath('/usr/bin/chromium-browser')
    .registerLighthouseOptions({
      blockedUrlPatterns: ['facebook.com/tr'],
    })
    .registerPlugin(runS3Plugin, {
      credentials: path.join(__dirname, './.env'),
      path: 'test',
      bucket: 'minutemedia-lighthouse'
    })
    .registerPlugin(runInfluxDbPlugin, {
      host: '10.0.15.132',
      database: 'lighthouse',
      port: 8086,
    })
    .run()
    .catch(err => console.log('err', err));
}

const jobRunner = () => {
  if (jobs.length !== 0) {
    const job = jobs.pop();
    console.log('running job: ', job);
    runLighthouseAudit(job.url, job.tag)
      .then(() => console.log('finished running job: ', job))
      .catch(() => console.log('error while running job: ', job))
      .finally(() => setTimeout(jobRunner, 10000));
  }
  else {
    setTimeout(jobRunner, 10000);
  }
};

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
jobRunner();
