import { InfluxDB } from 'influx';

export function runInfluxDbPlugin() {
  console.log('running influxDb plugin');
  const influx = new InfluxDB({
    host: 'localhost',
    database: 'lighthouse',
    port: 8086,
  });
  influx.writePoints([
    {
      measurement: 'stats',
      tags: 'tags',
      fields: {},
    }])
    .then(() => {
      console.log('Added data to the lighthouse influxDB');
    });
}
