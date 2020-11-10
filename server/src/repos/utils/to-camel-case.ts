import { QueryResultRow } from 'pg';

const toCamelCase = (rows: QueryResultRow) => {
  return rows.map((row: any) => {
    const replaced: any = {};

    for (let key in row) {
      const camelCase = key.replace(/([-_][a-z])/gi, ($1) =>
        $1.toUpperCase().replace('_', '')
      );
      replaced[camelCase] = row[key];
    }

    return replaced;
  });
};

export { toCamelCase };
