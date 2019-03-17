import { runLighthouse } from './core';
import { runInfluxDbPlugin } from '../../plugins/influxDbWriter/src/influxDbWriter';

export function runPipeline() {
  // run core
  runLighthouse();
  // run plugins
  runInfluxDbPlugin();
}
