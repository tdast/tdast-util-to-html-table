# tdast-util-to-html-table

[**tdast**][tdast] utility to serialize tdast to html table.

---

## Install

```sh
npm install tdast-util-to-html-table
```


## Use

Use with a tdast table node,

```js
import toHtmlTable from 'tdast-util-to-html-table';

const tdast = {
  type: 'table',
  children: [
    {
      type: 'row',
      index: 0,
      children: [
        {
          type: 'column',
          index: 0,
          value: 'col0',
        },
        {
          type: 'column',
          index: 1,
          value: 'col1',
        },
        {
          type: 'column',
          index: 2,
          value: 'col2',
        },
      ],
    },
    {
      type: 'row',
      index: 1,
      children: [
        {
          type: 'cell',
          columnIndex: 0,
          rowIndex: 1,
          value: 'row1col0',
        },
        {
          type: 'cell',
          columnIndex: 1,
          rowIndex: 1,
          value: 'row1col1',
        },
        {
          type: 'cell',
          columnIndex: 2,
          rowIndex: 1,
          value: 'row1col2',
        },
      ],
    },
    {
      type: 'row',
      index: 2,
      children: [
        {
          type: 'cell',
          columnIndex: 0,
          rowIndex: 2,
          value: 'row2col0',
        },
        {
          type: 'cell',
          columnIndex: 1,
          rowIndex: 2,
          value: 'row2col1',
        },
        {
          type: 'cell',
          columnIndex: 2,
          rowIndex: 2,
          value: 'row2col2',
        },
      ],
    },
  ],
};

console.log(toHtmlTable(tdast));
```

yields a serialized HTML table.

```html
<table><thead><tr><th>col0</th><th>col1</th><th>col2</th></tr></thead><tbody><tr><td>row1col0</td><td>row1col1</td><td>row1col2</td></tr><tr><td>row2col0</td><td>row2col1</td><td>row2col2</td></tr></tbody></table>
```

Easily use this HTML table with any HTML content!

## API

### `toHtmlTable(tdast[, options])`

#### Interface
```ts
function toHtmlTable(
  /** A valid tdast Table node */
  tdast: Table,
  /** Configurable options (compatible with tdast-util-to-hast-table's options) */
  options?: Options,
): string;
```

Serializes a tdast `Table` node into a HTML table.

Uses [`tdast-util-to-hast-table`][tdast-util-to-hast-table] under the hood to transform the tdast `Table` node into a [hast][] table node, then applies [`hast-util-to-html`][hast-util-to-html] to serialize the hast node into a HTML string.

The HTML table is created with semantic `table`, `thead`, `tbody`, `tr`, `th`, `td` elements  For more details, please refer to [`tdast-util-to-hast-table`][tdast-util-to-hast-table] for behaviors of transformed nodes.

It is convenient to use [`tdastscript`][tdastscript] to create tdast trees, and the serialized HTML of `tdast-util-to-html-table` is compatible with similar hast trees created via [`hastscript`][hastscript], as shown in the example below:

#### Example

```js
import h from 'hastscript';
import toHtml from 'hst-util-to-html';
import td from 'tdastscript';
import toHtmlTable from 'tdast-util-to-html-table';

const tdast = td('table', [
  td('row', ['row0col0', 'row0col1', 'row0col2']),
  td('row', ['row1col0', 'row1col1', 'row1col2']),
  td('row', ['row2col0', 'row2col1', 'row2col2']),
]);

const hast = h('table', [
  h('tbody', [
    h('tr', [
      h('td', 'row0col0'),
      h('td', 'row0col1'),
      h('td', 'row0col2'),
    ]),
    h('tr', [
      h('td', 'row1col0'),
      h('td', 'row1col1'),
      h('td', 'row1col2'),
    ]),
    h('tr', [
      h('td', 'row2col0'),
      h('td', 'row2col1'),
      h('td', 'row2col2'),
    ]),
  ]),
]);

const tdastHtml = toHtmlTable(tdast);
const hastHtml = toHtml(hast);

expect(tdastHtml).toEqual(hastHtml);
```

#### Related interfaces
```ts
interface Options {
  /** use the `label` property of a tdast `Column` node for the text value of a hast thead node. */
  useColumnLabel?: boolean;
}
```

<!-- Definitions -->
[hast]: https://github.com/syntax-tree/hast
[hast-util-to-html]: https://github.com/syntax-tree/hast-util-to-html
[hastscript]: https://github.com/syntax-tree/hastscript
[tdast]: https://github.com/tdast/tdast
[tdast-util-to-hast-table]: https://github.com/tdast/tdast-util-to-hast-table
[tdastscript]: https://github.com/tdast/tdastscript
