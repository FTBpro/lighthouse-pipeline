import { runLighthouse } from '../core/core';
import { runInfluxDbPlugin } from '../influxDbWriter/src';

export function runPipeline() {
  // run core
  runLighthouse();
  // run plugins
  runInfluxDbPlugin();
}
