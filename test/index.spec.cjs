const { expect } = require('chai');


describe('index - CommonJS', function() {

  it('should expose CommonJS export', function() {

    // when
    const {
      getPath
    } = require('@bpmn-io/moddle-utils');

    // then
    expect(getPath).to.exist;
  });

});