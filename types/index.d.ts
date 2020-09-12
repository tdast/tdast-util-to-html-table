import { Table } from 'tdast-types';
import { Options } from 'tdast-util-to-hast-table';

export { Options };

/**
 * Serializes tdast into a HTML table
 **/
export default function toHtmlTable(
  /** A valid tdast Table node */
  tdast: Table,
  /** Configurable options (compatible with tdast-util-to-hast-table's options) */
  options?: Options,
): string;
