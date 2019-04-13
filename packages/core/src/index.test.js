import { runPipeline } from './runner';
import { runLighthouse } from './core';

jest.mock('./core.js');
describe('core', () => {
  it('should runLighthouse with url, chrome path and options', async () => {
    await runPipeline()
      .registerUrl('https://cnn.com')
      .registerChromePath('chromePath')
      .registerLighthouseOptions({option: 'one'})
      .run();
    expect(runLighthouse).toHaveBeenCalledWith('https://cnn.com', 'chromePath', {option: 'one'});
  });

  it('should run a plugin with config, runLighthouse response and tag', async () => {
    const myPlugin = jest.fn();
    const myPluginConfig = {
      myConfig: 'bla',
    };
    await runPipeline()
      .registerTag('my-tag')
      .registerPlugin(myPlugin, myPluginConfig)
      .run();
    expect(myPlugin).toHaveBeenCalledWith(myPluginConfig, 'res', {"tag": "my-tag"});
  });

  it('should run a plugin with config, runLighthouse response and default tag', async () => {
    const myPlugin = jest.fn();
    const myPluginConfig = {
      myConfig: 'bla',
    };
    await runPipeline()
      .registerPlugin(myPlugin, myPluginConfig)
      .run();
    expect(myPlugin).toHaveBeenCalledWith(myPluginConfig, 'res', {tag: 'default tag'});
  });

  it('should run each plugin once and in the right order with corresponding params', async () => {
    const myPlugin1 = jest.fn();
    const myPluginConfig1 = {
      myConfig: 'bla1',
    };
    const myPlugin2 = jest.fn();
    const myPluginConfig2 = {
      myConfig: 'bla2',
    };
    const myPlugin3 = jest.fn();
    const myPluginConfig3 = {
      myConfig: 'bla3',
    };
    await runPipeline()
      .registerUrl('https://cnn.com')
      .registerChromePath('chromePath')
      .registerLighthouseOptions({option: 'one'})
      .registerTag('my-tag')
      .registerPlugin(myPlugin1, myPluginConfig1)
      .registerPlugin(myPlugin2, myPluginConfig2)
      .registerPlugin(myPlugin3, myPluginConfig3)
      .run();
    expect(myPlugin1).toHaveBeenCalledWith(myPluginConfig1, 'res', {tag: 'my-tag'});
    expect(myPlugin2).toHaveBeenCalledWith(myPluginConfig2, 'res', {tag: 'my-tag'});
    expect(myPlugin3).toHaveBeenCalledWith(myPluginConfig3, 'res', {tag: 'my-tag'});
    expect(myPlugin1).toHaveBeenCalledTimes(1);
    expect(myPlugin2).toHaveBeenCalledTimes(1);
    expect(myPlugin3).toHaveBeenCalledTimes(1);
    expect(myPlugin1).toHaveBeenCalledBefore(myPlugin2);
    expect(myPlugin2).toHaveBeenCalledBefore(myPlugin3);
  });
});
