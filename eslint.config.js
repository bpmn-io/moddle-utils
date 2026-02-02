import bpmnIoPlugin from 'eslint-plugin-bpmn-io';

const files = {
  build: [
    'eslint.config.js'
  ],
  test: [
    'test/**/*.js'
  ],
  ignored: []
};

export default [
  {
    'ignores': files.ignored
  },

  // lib
  ...bpmnIoPlugin.configs.recommended.map(config => {

    return {
      ...config,
      ignores: files.build
    };
  }),

  // build + test
  ...bpmnIoPlugin.configs.node.map(config => {

    return {
      ...config,
      files: files.build
    };
  }),

  // test
  ...bpmnIoPlugin.configs.mocha.map(config => {

    return {
      ...config,
      files: files.test
    };
  }),

  {
    files: files.test,
    languageOptions: {
      ecmaVersion: 2025
    }
  }
];
