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
      const result = await runLighthouse(this.url);

      const pluginResults = this.plugins.map((plugin) => {
        const pluginRunner = plugin.plugin;
        return pluginRunner(plugin.config, result, this.context);
      });

      return Promise.all(pluginResults);
    }
  }();
}
