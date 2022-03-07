const { readFileSync } = require('fs');

const BpmnModdle = require('bpmn-moddle');

const zeebeModdleSchema = require('zeebe-bpmn-moddle/resources/zeebe.json');

async function createModdle(xml) {
  const moddle = new BpmnModdle({
    zeebe: zeebeModdleSchema
  });

  let rootElement,
      warnings;

  try {
    ({
      rootElement,
      warnings = []
    } = await moddle.fromXML(xml, 'bpmn:Definitions', { lax: true }));
  } catch (err) {
    console.error(err);

    return { err };
  }

  return {
    moddle,
    rootElement,
    warnings
  };
}

module.exports.readModdle = (filePath) => {
  const contents = readFileSync(filePath, 'utf8');

  return createModdle(contents);
};