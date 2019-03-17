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
 * @param {{credentials: string}} config credentials: path to the file containing AWS credentials
 * @param {{path: string, data: string, type: "json | html"}} data 
 */
export function runS3Plugin(config, data) {
  const { path } = config;
  AWS.config.loadFromPath(config.credentials);

  const s3 = new AWS.S3();

  const now = (new Date()).toISOString();

  return Promise.all([
    uploadObject(s3, JSON.stringify(data.lhr), `${path}/${now}/lighthouse.json`, 'application/json'),
    uploadObject(s3, JSON.stringify(data.report), `${path}/${now}/lighthouse.html`, 'text/html'),
  ]);
}
