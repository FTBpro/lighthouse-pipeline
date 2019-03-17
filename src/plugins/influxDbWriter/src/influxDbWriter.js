const Influx = require('influx');

export function runInfluxDbPlugin(json) {
  console.log('running influxDb plugin');
  const influx = new Influx.InfluxDB({
    host: 'localhost',
    database: 'lighthouse',
    port: 8086,
  });
  influx.writePoints([
    {
      measurement: 'stats',
      tags: 'tags',
      fields: { ...json },
    }])
    .then(() => {
      console.log('Added data to the lighthouse influxDB');
    });
}
