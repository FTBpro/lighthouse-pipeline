import { runLighthouse } from './core';

export function runPipeline() {
  return new class Runner {
    constructor() {
      this.plugins = [];
      this.url = '';
      this.context = {
        tag: 'default tag',
      };
    }

    registerUrl(inputUrl) {
      this.url = inputUrl;
      return this;
    }

    registerTag(inputTag) {
      this.context.tag = inputTag;
      return this;
    }

    registerPlugin(plugin, config) {
      this.plugins.push({ plugin, config });
      return this;
    }

    async run() {
      return new Promise(async (resolve, reject) => {
        const result = await runLighthouse(this.url);
        const pluginResults = [];

        for (let i = 0; i < this.plugins.length; i++) {
          const plugin = this.plugins[i];
          const pluginRunner = plugin.plugin;
          pluginResults.push(await pluginRunner(plugin.config, result, this.context));
        }

        resolve(pluginResults);
      });
    }
  }();
}
