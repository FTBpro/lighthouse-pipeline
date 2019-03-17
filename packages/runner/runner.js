import { runLighthouse } from '../core/core';
import { runInfluxDbPlugin } from '../plugins/influxDbWriter/src';

export function runPipeline() {
  // run core
  runLighthouse();
  // run plugins
  runInfluxDbPlugin();
}
