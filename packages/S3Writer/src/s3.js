import AWS from 'aws-sdk';

function uploadObject(s3, bucket, data, key, contentType) {
  return new Promise((resolve, reject) => {
    s3.upload({
      Body: data,
      Bucket: bucket,
      ContentType: contentType,
      Key: key,
    }, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

/**
 * 
 * @param {{credentials: string, path: string, bucket: string}} config
 * @param {{lhr: {}, report: {}}} data the data returned from lighthouse
 */
export function runS3Plugin(config, data, context) {
  const { path, bucket } = config;

  AWS.config.loadFromPath(config.credentials);

  const s3 = new AWS.S3();

  const now = (new Date()).toISOString();

  const [html, json] = data.report;

  return Promise.all([
    uploadObject(s3, bucket, html, `${path}/${now}/lighthouse.html`, 'text/html'),
    uploadObject(s3, bucket, json, `${path}/${now}/lighthouse.json`, 'application/json'),
  ]);
}
