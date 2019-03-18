import { runPipeline } from '@lighthouse-pipeline/core';
import { runInfluxDbPlugin } from '@lighthouse-pipeline/influx-db-writer-plugin';
import { runS3Plugin } from '@lighthouse-pipeline/s3-writer-plugin';

const path = require('path');
const app = require('express')();

const port = 1337;

app.get('/', (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(500).send('URL not defined');
  }

  runPipeline()
    .registerUrl(url)
    .registerPlugin(runS3Plugin, { credentials: path.join(__dirname, '../.env'), path: 'test', bucket: 'minutemedia-lighthouse' })
    .registerPlugin(runInfluxDbPlugin, {
      host: 'localhost',
      database: 'lighthouse',
      port: 8086,
    })
    .run()
    .then((response) => {
      const [html, json] = response[0];
      res.send(`Done:<br /><a href="${html.Location}">HTML</a><br /><a href="${json.Location}">JSON</a>`);
    });
});

app.listen(port, () => {
  console.log(`Mock server running on ${port}`);
});
