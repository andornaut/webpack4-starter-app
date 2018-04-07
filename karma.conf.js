module.exports = (config) => {
  config.set({
    base: '',
    frameworks: ['mocha', 'chai'],
    files: [{ pattern: 'src/**/*.js', type: 'module', included: false }, { pattern: 'test/**/*.js', type: 'module' }],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // https://developers.google.com/web/updates/2017/06/headless-karma-mocha-chai
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity,
  });
};
