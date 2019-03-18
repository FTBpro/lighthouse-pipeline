const path = require('path');
const app = require('express')();
import { runPipeline } from '@lighthouse-pipeline/core';
import { runS3Plugin } from '@lighthouse-pipeline/s3-writer-plugin';

const port = 1337;

app.get('/', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(500).send('URL not defined');
  }

  runPipeline()
    .registerUrl(url)
    .registerPlugin(runS3Plugin, { credentials: path.join(__dirname, '../.env'), path: 'test' })
    .run()
    .then((response) => {
      res.send(`Done: ${new Date()}`);
    });
});

app.listen(port, () => {
  console.log(`Mock server running on ${port}`);
});