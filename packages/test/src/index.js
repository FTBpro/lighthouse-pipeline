import { runPipeline } from '@lighthouse-pipeline/core';
import { runInfluxDbPlugin } from '@lighthouse-pipeline/influx-db-writer-plugin';
import { runS3Plugin } from '@lighthouse-pipeline/s3-writer-plugin';
import { runSlackPlugin } from '@lighthouse-pipeline/slack-plugin';

console.log(runSlackPlugin);

const path = require('path');
const app = require('express')();

const port = 1337;

app.get('/', (req, res) => {
  const { url, tag } = req.query;
  if (!url) {
    return res.status(500).send('URL not defined');
  }

  console.log('running pipeline');

  runPipeline()
    .registerTag(tag)
    .registerUrl(url)
    .registerPlugin(runS3Plugin, { credentials: path.join(__dirname, '../.env'), path: 'test', bucket: 'minutemedia-lighthouse' })
    .registerPlugin(runSlackPlugin, { endpoint: 'https://hooks.slack.com/services/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' })
    .registerPlugin(runInfluxDbPlugin, {
      host: 'localhost',
      database: 'lighthouse',
      port: 8086,
    })
    .run()
    .then((response) => {
      if (response.length >= 2) {
        const [html, json] = response[0];
        res.send(`Done:<br /><a href="${html.Location}">HTML</a><br /><a href="${json.Location}">JSON</a>`);
      } else {
        res.send('All done, boy!');
      }
    });
});

app.listen(port, () => {
  console.log(`Mock server running on ${port}`);
});
