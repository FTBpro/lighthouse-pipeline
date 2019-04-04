// const chromePath = require.resolve('@serverless-chrome/lambda/dist/headless-chromium');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

export function runLighthouse(url, chromePath, lighthouseOptions) {
  return new Promise(async (resolve, reject) => {
    const chromeFlags = [
      '--headless',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-software-rasterizer',
      '--disable-dev-shm-usage',
    ];

    try {
      const chrome = await chromeLauncher.launch({ chromeFlags, chromePath });
      const { port } = chrome;
      const lighthouseResults = await lighthouse(url, { ...lighthouseOptions, port, output: ['html', 'json'] });
      await chrome.kill();

      resolve(lighthouseResults);
    } catch (e) {
      reject(e);
    }
  });
}
