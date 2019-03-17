const app = require('express')();
const core = require('@lighthouse-pipeline/core');

const port = 1337;

app.get('/', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(500).send('URL not defined');
  }
});

app.listen(port, () => {
  console.log(`Mock server running on ${port}`);
});