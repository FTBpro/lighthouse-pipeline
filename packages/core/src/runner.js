import { runLighthouse } from './core';

export function runPipeline() {
  return new class Runner {
    constructor() {
      this.plugins = [];
      this.url = '';
      this.options = {};
      this.context = {
        tag: 'default tag',
      };
      this.chromePath;
    }

    registerUrl(inputUrl) {
      this.url = inputUrl;
      return this;
    }

    registerLighthouseOptions(options) {
      this.options = options;
      return this;
    }

    registerChromePath(chromePath) {
      this.chromePath = chromePath;
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
      const result = await runLighthouse(this.url, this.chromePath, this.options);

      const pluginResults = this.plugins.map((plugin) => {
        const pluginRunner = plugin.plugin;
        return pluginRunner(plugin.config, result, this.context);
      });

      return Promise.all(pluginResults);
    }
  }();
}
