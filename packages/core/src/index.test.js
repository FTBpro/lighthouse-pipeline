import { runPipeline } from './runner';

jest.mock('./core.js');
describe('core', () => {
  it('should run plugins', async () => {
    const myPlugin = jest.fn();
    const myPluginConfig = {
      myConfig: 'bla',
    };
    await runPipeline()
      .registerUrl('https://cnn.com')
      .registerTag('my-tag')
      .registerPlugin(myPlugin, myPluginConfig)
      .run();
    expect(myPlugin).toHaveBeenCalledWith(myPluginConfig, 'res');
  });
});
