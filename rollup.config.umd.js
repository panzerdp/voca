import config from './rollup.config';

config.format = 'umd';
config.dest = 'dist/voca.js';
config.moduleName = 'voca';

export default config;