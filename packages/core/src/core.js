// const chromePath = require.resolve('@serverless-chrome/lambda/dist/headless-chromium');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

export function runLighthouse(url) {
  return new Promise(async (resolve, reject) => {
    const chromeFlags = [
      '--headless',
      '--disable-gpu',
    ];

    try {
      const chrome = await chromeLauncher.launch({ chromeFlags });
      const { port } = chrome;
      const lighthouseResults = await lighthouse(url, { port, output: ['html', 'json'] });
      await chrome.kill();

      resolve(lighthouseResults);
    } catch (e) {
      reject(e);
    }
  });
}
