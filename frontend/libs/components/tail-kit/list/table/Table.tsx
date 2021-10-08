import { Column, useTable } from 'react-table'

interface ITableProps<T extends Record<never, unknown>> {
  data: T[]
  columns: Array<Column<T>>
  showPagination?: boolean
}

export const Table = <T extends Record<never, unknown>>(
  props: ITableProps<T>,
): React.ReactElement<ITableProps<T>> => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: props.columns,
      data: props.data,
    })
  return (
    <div className="font-sans bg-gray-100 my-5 flex justify-center items-center px-4">
      <div className="container h-full">
        <div className="w-full overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg">
            <table
              {...getTableProps()}
              className="min-w-full leading-normal rounded-lg border"
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        className="px-6 py-3 border-b-2 border-gray-200 bg-primary text-left text-xs font-semibold text-white uppercase tracking-wider"
                      >
                        {column.render(`Header`)}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                  prepareRow(row)
                  return (
                    <tr
                      key={i}
                      {...row.getRowProps()}
                      className="text-gray-700"
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="px-6 py-5 text-gray-700 text-left whitespace-no-wrap border-b border-gray-200 bg-white text-sm"
                          >
                            {cell.render(`Cell`)}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {props.showPagination && (
              <div className="px-5 py-5 bg-white border-t flex gap-3 flex-col sm:flex-row xs:flex-row items-center xs:justify-between">
                <div className="flex justify-center items-center">
                  <span className="text-xs xs:text-sm text-gray-900 mr-5">
                    Showing 1 to 2 of 50 Entries
                  </span>

                  <label className="text-gray-700">
                    <select
                      id="animals"
                      className="block w-18 h-8 py-2 px-3 border text-xs border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      name="animals"
                    >
                      <option className="text-sm" value="">
                        Display
                      </option>
                      <option value="">5</option>
                      <option value="">10</option>
                      <option value="">15</option>
                    </select>
                  </label>
                </div>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm bg-gray-100 hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  <button className="text-sm bg-gray-100 hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
