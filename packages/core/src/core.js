const chromePath = require.resolve('@serverless-chrome/lambda/dist/headless-chromium');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

export function runLighthouse(url) {
  return new Promise(async (resolve, reject) => {
    const chromeFlags = [
      '--headless',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--no-zygote',
      '--no-sandbox',
      '--single-process',
      '--hide-scrollbars',
    ];

    try {
      const chrome = await chromeLauncher.launch({ chromeFlags, chromePath });
      const { port } = chrome;
      const lighthouseResults = await lighthouse(url, { port });
      await chrome.kill();

      resolve(lighthouseResults);
    } catch (e) {
      reject(e);
    }
  });
}
