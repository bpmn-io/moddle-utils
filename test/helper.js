import { readFileSync } from 'node:fs';

import { BpmnModdle } from 'bpmn-moddle';

import zeebeModdleSchema from 'zeebe-bpmn-moddle/resources/zeebe.json' with { type: 'json' };


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

export function readModdle(filePath) {
  const contents = readFileSync(filePath, 'utf8');

  return createModdle(contents);
}