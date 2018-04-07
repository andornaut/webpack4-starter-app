module.exports = {
  env: {
    mocha: true,
  },
  globals: {
    expect: true,
  },
  plugins: ['chai-friendly'],
  rules: {
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': ['error', { allowTaggedTemplates: true }],
  },
};
