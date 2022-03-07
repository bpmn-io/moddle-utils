const path = require('path');

const { expect } = require('chai');

const { getPath, pathParse, pathStringify } = require('../index');

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


    it('should return null (moddleElement=parentModdleElement)', function() {

      // given
      const moddleElement = definitions
        .get('rootElements')[ 0 ]
        .get('flowElements')[ 0 ]
        .get('extensionElements')
        .get('values')[ 0 ];

      moddleElement.$parent = undefined;

      // when
      // then
      expect(getPath(moddleElement, moddleElement)).to.be.null;
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

  });

});