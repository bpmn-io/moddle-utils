# moddle-helpers

Helpers for [moddle](https://github.com/bpmn-io/moddle).

# API

## `getPath`

```javascript
import { getPath } from 'moddle-helpers';

// global
getPath(moddleElement); // [ 'rootElements', 0, 'flowElements', 0, 'extensionElements', 'values', 0 ]

// local
getPath(moddleElement, parentModdleElement); // [ 'extensionElements', 'values', 0 ]
```

## `parsePath`

```javascript
import { parsePath } from 'moddle-helpers';

// default separator
parsePath('rootElements.0.flowElements.0.extensionElements.values.0.type'); // [ 'rootElements', 0, 'flowElements', 0, 'extensionElements', 'values', 0 ]

// custom separator
parsePath('rootElements-0-flowElements-0-extensionElements-values-0-type', '-'); // [ 'rootElements', 0, 'flowElements', 0, 'extensionElements', 'values', 0 ]
```

## `stringifyPath`

```javascript
import { stringifyPath } from 'moddle-helpers';

// default separator
stringifyPath([ 'rootElements', 0, 'flowElements', 0, 'extensionElements', 'values', 0 ]); // 'rootElements.0.flowElements.0.extensionElements.values.0.type'

// custom separator
stringifyPath([ 'rootElements', 0, 'flowElements', 0, 'extensionElements', 'values', 0 ], '-'); // 'rootElements-0-flowElements-0-extensionElements-values-0-type'
```

# Licence

MIT