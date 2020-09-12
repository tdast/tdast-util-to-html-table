import h from 'hastscript';
import toHtml from 'hast-util-to-html';
import td from 'tdastscript';

import toHtmlTable from '../lib/to-html-table';

describe(toHtmlTable, () => {
  it('should return empty table for empty table or invalid nodes', () => {
    expect(toHtmlTable(td('table'))).toEqual(toHtml(h('table')));
  });

  it('should return table with rows of cells', () => {
    const tdast = td(
      'table',
      {
        data: { nodeType: 'table' },
        position: 'mockTablePosition',
      },
      [],
    );
    expect(toHtmlTable(tdast)).toEqual(toHtml(h('table')));
  });

  it('should return table with thead and tbody with rows table cells', () => {
    const tdast = td('table', [
      td('row', ['row0col0', 'row0col1', 'row0col2']),
      td('row', ['row1col0', 'row1col1', 'row1col2']),
      td('row', ['row2col0', 'row2col1', 'row2col2']),
    ]);
    expect(toHtmlTable(tdast)).toEqual(
      toHtml(
        h('table', [
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
        ]),
      ),
    );
  });

  it('should return table with thead and tbody even if there is only one header row', () => {
    const tdast = td('table', [
      td('row', [
        td('column', 'col0'),
        td('column', 'col1'),
        td('column', 'col2'),
      ]),
      td('row', ['row1col0', 'row1col1', 'row1col2']),
      td('row', ['row2col0', 'row2col1', 'row2col2']),
    ]);
    expect(toHtmlTable(tdast)).toEqual(
      toHtml(
        h('table', [
          h('thead', [
            h('tr', [h('th', 'col0'), h('th', 'col1'), h('th', 'col2')]),
          ]),
          h('tbody', [
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
        ]),
      ),
    );
  });

  it('should apply options.useColumnLabel to use column.label as table column values if possible', () => {
    const tdast = td('table', [
      td('row', [
        td('column', { label: 'Column 0 Label', value: 'col0' }),
        td('column', { label: 'Column 1 Label', value: 'col1' }),
        td('column', 'col2'),
      ]),
    ]);
    expect(toHtmlTable(tdast)).toEqual(
      toHtml(
        h('table', [
          h('thead', [
            h('tr', [h('th', 'col0'), h('th', 'col1'), h('th', 'col2')]),
          ]),
          h('tbody'),
        ]),
      ),
    );
    expect(toHtmlTable(tdast, { useColumnLabel: true })).toEqual(
      toHtml(
        h('table', [
          h('thead', [
            h('tr', [
              h('th', 'Column 0 Label'),
              h('th', 'Column 1 Label'),
              h('th', 'col2'),
            ]),
          ]),
          h('tbody'),
        ]),
      ),
    );
  });
});
