import config from './rollup.config';

config.format = 'umd';
config.dest = 'dist/voca.js';
config.moduleName = 'v';

export default config;