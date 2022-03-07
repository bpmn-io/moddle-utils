const {
  isNil,
  isString,
  isUndefined
} = require('min-dash');

/**
 * Get path from model element and optional parent model element. Fall back to
 * returning null.
 *
 * @param {ModdleElement} moddleElement
 * @param {ModdleElement} [parentModdleElement]
 *
 * @returns {string[]|null}
 */
module.exports.getPath = function(moddleElement, parentModdleElement) {
  if (!moddleElement) {
    return null;
  }

  if (moddleElement === parentModdleElement) {
    return [];
  }

  let path = [],
      parent;

  do {
    parent = moddleElement.$parent;

    if (!parent) {
      if (moddleElement.$instanceOf('bpmn:Definitions')) {
        break;
      } else {
        return null;
      }
    }

    path = [ ...getPropertyName(moddleElement, parent), ...path ];

    moddleElement = parent;

    if (parentModdleElement && moddleElement === parentModdleElement) {
      break;
    }
  } while (parent);

  return path;
};

/**
 * Get property name from model element and parent model element.
 *
 * @param {ModdleElement} moddleElement
 * @param {ModdleElement} parentModdleElement
 *
 * @returns {string[]}
 */
function getPropertyName(moddleElement, parentModdleElement) {
  for (let property of Object.values(parentModdleElement.$descriptor.propertiesByName)) {
    if (property.isMany) {
      if (parentModdleElement.get(property.name).includes(moddleElement)) {
        return [
          property.name,
          parentModdleElement.get(property.name).indexOf(moddleElement)
        ];
      }
    } else {
      if (parentModdleElement.get(property.name) === moddleElement) {
        return [ property.name ];
      }
    }
  }

  return [];
}

/**
 * @param {(string|(number|string)[])[]} paths
 *
 * @returns {(number|string)[]}
 */
module.exports.pathConcat = function(...paths) {
  let concatenatedPaths = [];

  for (let path of paths) {
    if (isNil(path) || isUndefined(path)) {
      return null;
    }

    if (isString(path)) {
      path = [ path ];
    }

    concatenatedPaths = concatenatedPaths.concat(path);
  }

  return concatenatedPaths;
};

/**
 * @param {string|(number|string)[]} a
 * @param {string|(number|string)[]} b
 * @param {string} [separator]
 *
 * @returns {boolean}
 */
module.exports.pathEquals = function(a, b, separator = '.') {
  if (isNil(a) || isUndefined(a) || isNil(b) || isUndefined(b)) {
    return false;
  }

  if (!isString(a)) {
    a = pathStringify(a, separator);
  }

  if (!isString(b)) {
    b = pathStringify(b, separator);
  }

  return a === b;
};

/**
 * @param {string} path
 * @param {string} [separator]
 *
 * @returns {(number|string)[]}
 */
module.exports.pathParse = function(path, separator = '.') {
  if (isNil(path) || isUndefined(path)) {
    return null;
  }

  return path
    .split(separator)
    .map(string => isNaN(string) ? string : parseInt(string));
};

/**
 * @param {(number|string)[]} path
 * @param {string} [separator]
 *
 * @returns {string}
 */
function pathStringify(path, separator = '.') {
  if (isNil(path) || isUndefined(path)) {
    return null;
  }

  return path.join(separator);
}

module.exports.pathStringify = pathStringify;