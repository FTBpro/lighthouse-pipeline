import { runLighthouse } from './core';

export function runPipeline() {
  return new class Runner {
    constructor() {
      this.plugins = [];
      this.url = '';
      this.tag = 'default tag';
    }

    registerUrl(inputUrl) {
      this.url = inputUrl;
      return this;
    }

    registerTag(inputTag) {
      this.tag = inputTag;
      return this;
    }

    registerPlugin(plugin, config) {
      this.plugins.push({ plugin, config });
      return this;
    }

    async run() {
      const result = await runLighthouse();
      const pluginResults = this.plugins.map((plugin) => {
        const pluginRunner = plugin.plugin;
        return pluginRunner(plugin.config, result);
      });

      return Promise.all(pluginResults);
    }
  }();
}
