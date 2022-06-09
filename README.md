# moddle-helpers

Helpers for [moddle](https://github.com/bpmn-io/moddle).

# API

## `getPath`

```javascript
import { getPath } from '@bpmn-io/moddle-helpers';

// global
getPath(moddleElement); // [ 'rootElements', 0, 'flowElements', 0, 'extensionElements', 'values', 0 ]

// local
getPath(moddleElement, parentModdleElement); // [ 'extensionElements', 'values', 0 ]

// $parent === undefined
const task = moddle.create('bpmn:Task');

getPath(task); // null

// null
getPath(null); // null
```

## `pathConcat`

```javascript
import { pathConcat } from '@bpmn-io/moddle-helpers';

pathConcat([ 'foo', 'bar' ], 'baz'); // [ 'foo', 'bar', 'baz' ]

// null
pathConcat([ 'foo', 'bar' ], null); // null
```

## `pathEquals`

```javascript
import { pathEquals } from '@bpmn-io/moddle-helpers';

// default separator
pathEquals('extensionElements.values.0.type', 'extensionElements.values.0.type'); // true

pathEquals([ 'extensionElements', 'values', 0 ], [ 'extensionElements', 'values', 0 ]); // true

// custom separator
pathEquals('extensionElements-values-0-type', 'extensionElements-values-0-type', '-'); // true

// null
pathEquals(null, [ 'foo' ]); // false
```

## `parsePath`

```javascript
import { parsePath } from '@bpmn-io/moddle-helpers';

// default separator
parsePath('rootElements.0.flowElements.0.extensionElements.values.0.type'); // [ 'rootElements', 0, 'flowElements', 0, 'extensionElements', 'values', 0 ]

// custom separator
parsePath('rootElements-0-flowElements-0-extensionElements-values-0-type', '-'); // [ 'rootElements', 0, 'flowElements', 0, 'extensionElements', 'values', 0 ]

// null
parsePath(null); // null
```

## `stringifyPath`

```javascript
import { stringifyPath } from '@bpmn-io/moddle-helpers';

// default separator
stringifyPath([ 'rootElements', 0, 'flowElements', 0, 'extensionElements', 'values', 0 ]); // 'rootElements.0.flowElements.0.extensionElements.values.0.type'

// custom separator
stringifyPath([ 'rootElements', 0, 'flowElements', 0, 'extensionElements', 'values', 0 ], '-'); // 'rootElements-0-flowElements-0-extensionElements-values-0-type'

// null
stringifyPath(null); // null
```

# Licence

MIT