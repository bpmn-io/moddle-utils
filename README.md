# moddle-helpers

Helpers for [moddle](https://github.com/bpmn-io/moddle).

# API

## `getPath`

```javascript
import { getPath } from '@philippfromme/moddle-helpers';

// global
getPath(moddleElement); // [ 'rootElements', 0, 'flowElements', 0, 'extensionElements', 'values', 0 ]

// local
getPath(moddleElement, parentModdleElement); // [ 'extensionElements', 'values', 0 ]

// null
const task = moddle.create('bpmn:Task'); // task.$parent === undefined

getPath(task); // null
```

## `pathEquals`

```javascript
import { pathEquals } from '@philippfromme/moddle-helpers';

// default separator
pathEquals('extensionElements.values.0.type', 'extensionElements.values.0.type'); // true

pathEquals([ 'extensionElements', 'values', 0 ], [ 'extensionElements', 'values', 0 ]); // true

// custom separator
parsePath('extensionElements-values-0-type', 'extensionElements-values-0-type', '-'); // true
```

## `parsePath`

```javascript
import { parsePath } from '@philippfromme/moddle-helpers';

// default separator
parsePath('rootElements.0.flowElements.0.extensionElements.values.0.type'); // [ 'rootElements', 0, 'flowElements', 0, 'extensionElements', 'values', 0 ]

// custom separator
parsePath('rootElements-0-flowElements-0-extensionElements-values-0-type', '-'); // [ 'rootElements', 0, 'flowElements', 0, 'extensionElements', 'values', 0 ]
```

## `stringifyPath`

```javascript
import { stringifyPath } from '@philippfromme/moddle-helpers';

// default separator
stringifyPath([ 'rootElements', 0, 'flowElements', 0, 'extensionElements', 'values', 0 ]); // 'rootElements.0.flowElements.0.extensionElements.values.0.type'

// custom separator
stringifyPath([ 'rootElements', 0, 'flowElements', 0, 'extensionElements', 'values', 0 ], '-'); // 'rootElements-0-flowElements-0-extensionElements-values-0-type'
```

# Licence

MIT