const request = require('request');

export function runSlackPlugin(config, data, context) {
  const { endpoint } = config;
  const { S3 } = context;
  console.log(S3);
  console.log(Object.keys(data));
  request({
    url: endpoint,
    method: 'POST',
    json: true,
    body: {
      attachments: [{
        text: 'Lighthouse Test Completed',
        title: `Lighthouse results for ${S3.jsonResult.requestedUrl}:`,
        title_url: S3.htmlResult.Location,
      }]
    }
  });
  return 'poop';
}