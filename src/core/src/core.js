const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

export function runLighthouse(url) {
  return new Promise(async (resolve, reject) => {
    const chromeOptions = {
      chromeFlags: ['--headless', '--disable-gpu'],
    };

    try {
      const chrome = await chromeLauncher.launch(chromeOptions);
      const { port } = chrome;
      const lighthouseResults = await lighthouse(url, { port, output: ['html', 'json'] });
      await chrome.kill();

      resolve(lighthouseResults);
    } catch (e) {
      reject(e);
    }
  });
}
