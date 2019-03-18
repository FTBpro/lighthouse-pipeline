import AWS from 'aws-sdk';

function uploadObject(s3, data, key, contentType) {
  return new Promise((resolve, reject) => {
    s3.upload({
      Body: data,
      Bucket: 'minutemedia-lighthouse',
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
 * @param {{path: string}} config {path: path to the file containing AWS credentials}
 * @param {{lhr: {}, report: {}}} data the data returned from lighthouse
 */
export function runS3Plugin(config, data) {
  const { path } = config;

  AWS.config.loadFromPath(config.credentials);

  const s3 = new AWS.S3();

  const now = (new Date()).toISOString();

  return Promise.all([
    uploadObject(s3, data.report[0], `${path}/${now}/lighthouse.html`, 'text/html'),
    uploadObject(s3, data.report[1], `${path}/${now}/lighthouse.json`, 'application/json'),
  ]);
}
