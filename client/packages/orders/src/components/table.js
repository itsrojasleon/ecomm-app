import React from 'react';

const Table = ({ headers, children }) => {
  return (
    <table className="table-auto w-full mt-6 shadow">
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="px-6 py-3 border-b border-gray-200 bg-black text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
