import { InfluxDB, Precision } from 'influx';

const getAuditsFetchTime = json => new Date(json.fetchTime).getTime();

const getAuditsPerformanceScore = json => json.categories.performance.score;

const getAuditsPerformancePoints = (json) => {
  const auditsFetchTime = Date.now();
  const url = json.requestedUrl;
  return [
    {
      timestamp: auditsFetchTime,
      measurement: 'performance',
      tags: {
        site: url
      },
      fields: {
        interactive: json.audits.interactive.rawValue,
      },
    },
    {
      timestamp: auditsFetchTime,
      measurement: 'performance',
      tags: {
        site: url
      },
      fields: {
        firstMeaningfulPaint: json.audits['first-meaningful-paint'].rawValue,
      },
    },
    {
      timestamp: auditsFetchTime,
      measurement: 'performance',
      tags: {
        site: url
      },
      fields: {
        estimatediInputLatency: json.audits['estimated-input-latency'].rawValue,
      },
    },
    {
      timestamp: auditsFetchTime,
      measurement: 'performance',
      tags: {
        site: url
      },
      fields: {
        firstCpuIdle: json.audits['first-cpu-idle'].rawValue,
      },
    },
    {
      timestamp: auditsFetchTime,
      measurement: 'performance',
      tags: {
        site: url
      },
      fields: {
        firstContentfulPaint: json.audits['first-contentful-paint'].rawValue,
      },
    },
    {
      timestamp: auditsFetchTime,
      measurement: 'performance',
      tags: {
        site: url
      },
      fields: {
        speedIndex: json.audits['speed-index'].rawValue,
      },
    },
    {
      timestamp: auditsFetchTime,
      measurement: 'total-scores',
      tags: {
        audit: 'performance',
        site: url
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

