import toHtml from 'hast-util-to-html';
import toHastTable from 'tdast-util-to-hast-table';

export default function toHtmlTable(tdast, options = {}) {
  return toHtml(toHastTable(tdast, options));
}
