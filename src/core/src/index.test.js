import { runPipeline } from './runner';

describe('core', () => {
  it('should run plugins', async () => {
    const pipe = runPipeline().registerUrl('https://cnn.com').registerTag('my-tag').registerPlugin(() => console.log('my-plugin'));
    const res = await pipe.run();
    expect(res).toBe(2);
  });
});
