import { InfluxDB, Precision } from 'influx';

const getAuditsFetchTime = json => new Date(json.fetchTime).getTime();

const getAuditsPerformanceScore = json => json.categories.performance.score;

const getAuditsPerformancePoints = (json) => {
  const auditsFetchTime = Date.now();
  return [
    {
      timestamp: auditsFetchTime,
      measurement: 'performance',
      fields: {
        interactive: json.audits.interactive.rawValue,
      },
    },
    {
      timestamp: auditsFetchTime,
      measurement: 'performance',
      fields: {
        firstMeaningfulPaint: json.audits['first-meaningful-paint'].rawValue,
      },
    },
    {
      timestamp: auditsFetchTime,
      measurement: 'performance',
      fields: {
        estimatediInputLatency: json.audits['estimated-input-latency'].rawValue,
      },
    },
    {
      timestamp: auditsFetchTime,
      measurement: 'performance',
      fields: {
        firstCpuIdle: json.audits['first-cpu-idle'].rawValue,
      },
    },
    {
      timestamp: auditsFetchTime,
      measurement: 'performance',
      fields: {
        firstContentfulPaint: json.audits['first-contentful-paint'].rawValue,
      },
    },
    {
      timestamp: auditsFetchTime,
      measurement: 'performance',
      fields: {
        speedIndex: json.audits['speed-index'].rawValue,
      },
    },
    {
      timestamp: auditsFetchTime,
      measurement: 'total-scores',
      tags: {
        audit: 'performance',
      },
      fields: {
        performance: getAuditsPerformanceScore(json),
      },
    },
  ];
};

const setInfluxDB = config => (new InfluxDB(config));

export function runInfluxDbPlugin(config, result) {
  const json = JSON.parse(result.report[1]);
  const influx = setInfluxDB(config);
  return influx.writePoints(getAuditsPerformancePoints(json), {
    precision: Precision.Milliseconds,
  });
}

