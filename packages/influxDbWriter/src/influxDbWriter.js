import { InfluxDB, Precision } from 'influx';

const getAuditsPerformancePoints = (json) => {
  const auditsFetchTime = Date.now();
  const url = json.requestedUrl;
  return [
    {
      timestamp: auditsFetchTime,
      measurement: 'performance',
      tags: {
        site: url,
      },
      fields: {
        speedIndex: json.audits['speed-index'].rawValue,
        firstContentfulPaint: json.audits['first-contentful-paint'].rawValue,
        firstCpuIdle: json.audits['first-cpu-idle'].rawValue,
        estimatedInputLatency: json.audits['estimated-input-latency'].rawValue,
        firstMeaningfulPaint: json.audits['first-meaningful-paint'].rawValue,
        interactive: json.audits.interactive.rawValue,
      },
    },
    {
      timestamp: auditsFetchTime,
      measurement: 'total-scores',
      tags: {
        audit: 'performance',
        site: url,
      },
      fields: {
        performance: json.categories.seo.score,
      },
    },
    {
      timestamp: auditsFetchTime,
      measurement: 'total-scores',
      tags: {
        audit: 'seo',
        site: url,
      },
      fields: {
        seo: json.categories.seo.score,
      },
    },
    {
      timestamp: auditsFetchTime,
      measurement: 'total-scores',
      tags: {
        audit: 'best-practices',
        site: url,
      },
      fields: {
        bestPractices: json.categories['best-practices'].score,
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
