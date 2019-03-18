const fs = require('fs');
const path = require('path');
const app = require('express')();
const core = require('@lighthouse-pipeline/core');
const s3 = require('@lighthouse-pipeline/s3-writer-plugin');
const influxDb = require('@lighthouse-pipeline/influx-db-writer-plugin');

const port = 1337;

app.get('/', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(500).send('URL not defined');
  }

  core()
    .registerUrl(url)
    .registerPlugin(s3, { credentials: path.join(__dirname, '../.env'), path: 'test' })
    .registerPlugin(influxDb)
    .run()
    .then((response) => {
      res.send('Look at meeee!!!');
    });
});

app.listen(port, () => {
  console.log(`Mock server running on ${port}`);
});