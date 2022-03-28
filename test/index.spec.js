const path = require('path');

const { expect } = require('chai');

const {
  getPath,
  pathConcat,
  pathEquals,
  pathParse,
  pathStringify
} = require('../index');

const { readModdle } = require('./helper');

describe('index', function() {

  let definitions;

  beforeEach(async function() {
    ({ rootElement: definitions } = await readModdle(path.join(__dirname, 'diagram.bpmn')));
  });


  describe('#getPath', function() {

    it('should return path (flow element)', function() {

      // given
      const moddleElement = definitions
        .get('rootElements')[ 0 ]
        .get('flowElements')[ 0 ];

      // when
      // then
      expect(getPath(moddleElement)).to.eql([
        'rootElements',
        0,
        'flowElements',
        0
      ]);
    });


    it('should return path (extension element)', function() {

      // given
      const moddleElement = definitions
        .get('rootElements')[ 0 ]
        .get('flowElements')[ 0 ]
        .get('extensionElements')
        .get('values')[ 0 ];

      // when
      // then
      expect(getPath(moddleElement)).to.eql([
        'rootElements',
        0,
        'flowElements',
        0,
        'extensionElements',
        'values',
        0
      ]);
    });


    it('should return relative path (extension element)', function() {

      // given
      const parentModdleElement = definitions
        .get('rootElements')[ 0 ]
        .get('flowElements')[ 0 ];

      const moddleElement = definitions
        .get('rootElements')[ 0 ]
        .get('flowElements')[ 0 ]
        .get('extensionElements')
        .get('values')[ 0 ];

      // when
      // then
      expect(getPath(moddleElement, parentModdleElement)).to.eql([
        'extensionElements',
        'values',
        0
      ]);
    });


    it('should return null instead of path ($parent=undefined)', function() {

      // given
      const moddleElement = definitions
        .get('rootElements')[ 0 ]
        .get('flowElements')[ 0 ]
        .get('extensionElements')
        .get('values')[ 0 ];

      definitions
        .get('rootElements')[ 0 ]
        .get('flowElements')[ 0 ].$parent = undefined;

      // when
      // then
      expect(getPath(moddleElement)).to.be.null;
    });


    it('should return null instead of relative path ($parent=undefined)', function() {

      // given
      const parentModdleElement = definitions
        .get('rootElements')[ 0 ]
        .get('flowElements')[ 0 ];

      const moddleElement = definitions
        .get('rootElements')[ 0 ]
        .get('flowElements')[ 0 ]
        .get('extensionElements')
        .get('values')[ 0 ];

      moddleElement.$parent = undefined;

      // when
      // then
      expect(getPath(moddleElement, parentModdleElement)).to.be.null;
    });


    it('should return null (moddleElement=undefined)', function() {

      // given
      // when
      // then
      expect(getPath()).to.be.null;
    });


    it('should return [] (moddleElement=parentModdleElement)', function() {

      // given
      const moddleElement = definitions
        .get('rootElements')[ 0 ]
        .get('flowElements')[ 0 ]
        .get('extensionElements')
        .get('values')[ 0 ];

      moddleElement.$parent = undefined;

      // when
      // then
      expect(getPath(moddleElement, moddleElement)).to.be.empty;
    });

  });


  describe('#pathConcat', function() {

    it('should concat (string[], string[])', function() {

      // given
      const a = [ 'foo' ],
            b = [ 'bar', 'baz' ];

      // when
      const concatenated = pathConcat(a, b);

      // then
      expect(concatenated).to.eql([ 'foo', 'bar', 'baz' ]);
    });


    it('should concat (string[], (number|string)[], (number|string)[])', function() {

      // given
      const a = [ 'foo' ],
            b = [ 0, 'bar' ],
            c = [ 1, 'baz' ];

      // when
      const concatenated = pathConcat(a, b, c);

      // then
      expect(concatenated).to.eql([ 'foo', 0, 'bar', 1, 'baz' ]);
    });


    it('should concat (string[], number, string)', function() {

      // given
      const a = [ 'foo' ],
            b = 0,
            c = 'bar';

      // when
      const concatenated = pathConcat(a, b, c);

      // then
      expect(concatenated).to.eql([ 'foo', 0, 'bar' ]);
    });


    it('should return null (null)', function() {

      // given
      const a = null,
            b = [ 'bar', 'baz' ];

      // when
      const concatenated = pathConcat(a, b);

      // then
      expect(concatenated).to.be.null;
    });


    it('should return null (undefined)', function() {

      // given
      const a = undefined,
            b = [ 'bar', 'baz' ];

      // when
      const concatenated = pathConcat(a, b);

      // then
      expect(concatenated).to.be.null;
    });

  });


  describe('#pathEquals', function() {

    it('should be equal (string, string)', function() {

      // given
      const a = 'foo.bar.0.baz',
            b = 'foo.bar.0.baz';

      // when
      const equal = pathEquals(a, b);

      // then
      expect(equal).to.be.true;
    });


    it('should not be equal (string, string)', function() {

      // given
      const a = 'foo.bar.0.baz',
            b = 'foo.bar.baz';

      // when
      const equal = pathEquals(a, b);

      // then
      expect(equal).to.be.false;
    });


    it('should be equal (string, string[])', function() {

      // given
      const a = 'foo.bar.0.baz',
            b = [ 'foo', 'bar', 0, 'baz' ];

      // when
      const equal = pathEquals(a, b);

      // then
      expect(equal).to.be.true;
    });


    it('should not be equal (string, string[])', function() {

      // given
      const a = 'foo.bar.0.baz',
            b = [ 'foo', 'bar', 'baz' ];

      // when
      const equal = pathEquals(a, b);

      // then
      expect(equal).to.be.false;
    });


    it('should be equal (string[], string[])', function() {

      // given
      const a = [ 'foo', 'bar', 0, 'baz' ],
            b = [ 'foo', 'bar', 0, 'baz' ];

      // when
      const equal = pathEquals(a, b);

      // then
      expect(equal).to.be.true;
    });


    it('should not be equal (string[], string[])', function() {

      // given
      const a = [ 'foo', 'bar', 0, 'baz' ],
            b = [ 'foo', 'bar', 'baz' ];

      // when
      const equal = pathEquals(a, b);

      // then
      expect(equal).to.be.false;
    });


    it('should be equal (custom separator)', function() {

      // given
      const a = 'foo-bar-0-baz',
            b = 'foo-bar-0-baz';

      // when
      const equal = pathEquals(a, b, '-');

      // then
      expect(equal).to.be.true;
    });


    it('should not be equal (null)', function() {

      // given
      const a = null,
            b = [ 'foo' ];

      // when
      const equal = pathEquals(a, b);

      // then
      expect(equal).to.be.false;
    });


    it('should not be equal (undefined)', function() {

      // given
      const a = undefined,
            b = [ 'foo' ];

      // when
      const equal = pathEquals(a, b);

      // then
      expect(equal).to.be.false;
    });

  });


  describe('#pathParse', function() {

    it('should parse path', function() {

      // given
      const pathStringified = 'rootElements.0.flowElements.0.extensionElements.values.0.type';

      // when
      const pathParsed = pathParse(pathStringified);

      // then
      expect(pathParsed).to.eql([
        'rootElements',
        0,
        'flowElements',
        0,
        'extensionElements',
        'values',
        0,
        'type'
      ]);
    });


    it('should parse path (custom separator)', function() {

      // given
      const pathStringified = 'rootElements-0-flowElements-0-extensionElements-values-0-type';

      // when
      const pathParsed = pathParse(pathStringified, '-');

      // then
      expect(pathParsed).to.eql([
        'rootElements',
        0,
        'flowElements',
        0,
        'extensionElements',
        'values',
        0,
        'type'
      ]);
    });


    it('should not parse path (null)', function() {

      // given
      const pathStringified = null;

      // when
      const pathParsed = pathParse(pathStringified);

      // then
      expect(pathParsed).to.be.null;
    });

  });


  describe('#pathStringify', function() {

    it('should stringify path', function() {

      // given
      const pathParsed = [
        'rootElements',
        0,
        'flowElements',
        0,
        'extensionElements',
        'values',
        0,
        'type'
      ];

      // when
      const pathStringified = pathStringify(pathParsed);

      // then
      expect(pathStringified).to.equal('rootElements.0.flowElements.0.extensionElements.values.0.type');
    });


    it('should stringify path (custom separator)', function() {

      // given
      const pathParsed = [
        'rootElements',
        0,
        'flowElements',
        0,
        'extensionElements',
        'values',
        0,
        'type'
      ];

      // when
      const pathStringified = pathStringify(pathParsed, '-');

      // then
      expect(pathStringified).to.equal('rootElements-0-flowElements-0-extensionElements-values-0-type');
    });


    it('should not stringify path (null)', function() {

      // given
      const pathParsed = null;

      // when
      const pathStringified = pathStringify(pathParsed);

      // then
      expect(pathStringified).to.be.null;
    });

  });

});