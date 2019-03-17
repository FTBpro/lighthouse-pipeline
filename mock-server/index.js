const app = require('express')();
const port = 1337;

app.get('/', (req, res) => {
  res.send('Suck my piss');
});

app.listen(port, () => {
  console.log(`Mock server running on ${port}`);
});