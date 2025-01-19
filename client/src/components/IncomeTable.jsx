import { useState, useEffect, useMemo } from 'react'
import Loading from '../components/Loading'
import moment from 'moment'
import { useLazyGetAllIncomeQuery } from '../states/api/apiSlice'

function IncomeTable() {
  const [IncomeMutation, { data: incomeData, isLoading, isError }] = useLazyGetAllIncomeQuery()
  const [data, setData] = useState([])

  // Fetch income data on component mount or when data changes
  useEffect(() => {
    if (incomeData) {
      setData(
        incomeData.data.map((row, index) => ({
          id: index + 1,
          amount: row.amount,
          incomeName: row.incomeName,
          CreatedAt: moment(row.CreatedAt).format('YYYY-MM-DD'),
        }))
      )
    }
  }, [incomeData])

  useEffect(() => {
    IncomeMutation()
  }, [IncomeMutation])

  // Table columns definition
  const columns = useMemo(() => [
    {
      Header: 'Income',
      accessor: 'incomeName',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
    },
    {
      Header: 'Date',
      accessor: 'CreatedAt',
    },
  ], [])

  // Calculate total amount
  const totalAmount = useMemo(() => {
    return data.reduce((acc, row) => acc + row.amount, 0)
  }, [data])

  if (isLoading) {
    return (
      <main className="w-full min-h-[80vh] flex items-center justify-center">
        <Loading />
      </main>
    )
  }

  if (isError) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center flex-col gap-6">
        <h1 className="text-[25px] font-medium text-center">Could not load Income records</h1>
      </main>
    )
  }

  return (
    <main className="my-12 w-full">
      <div className="flex flex-col items-center gap-6">
        <div className="mt-2 flex flex-col w-[85%] mx-auto">
          <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="mt-20 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className=" min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {columns.map((column) => (
                        <th
                          key={column.accessor}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {column.Header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row) => (
                      <tr key={row.id}>
                        {columns.map((column) => (
                          <td key={column.accessor} className="px-6 py-4 whitespace-nowrap">
                            {row[column.accessor]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  {/* Table footer with total sum */}
                  <tfoot>
                    <tr>
                      <td colSpan="2" className="px-6 py-4 text-right font-medium">Total Amount:</td>
                      <td className="px-6 py-4 text-right font-medium">{totalAmount}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default IncomeTable
