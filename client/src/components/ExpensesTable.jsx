import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { useState, useEffect, useMemo } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import moment from 'moment';
import { useLazyGetAllExpensesQuery, useLazyGetBalanceQuery} from '../states/api/apiSlice';
import Loading from '../components/Loading';
import Button from '../components/Button';
import Input from '../components/Input';
import { toast } from 'react-toastify'

const ExpensesTable = () => {
  const [fetchExpenses, { isLoading, isError }] =
    useLazyGetAllExpensesQuery();
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: '',
  });

  // Fetch expenses data on component mount

  const [fetchBalance] = useLazyGetBalanceQuery();
    const [balance, setBalance] = useState(null);
    const [spendingLimit] = useState(700000); 
  
    
    useEffect(() => {
      fetchBalance()
        .unwrap()
        .then((response) => {
          setBalance(response?.data);
        })
        .catch(console.error);
    }, [fetchBalance]);
  

  useEffect(() => {
    fetchExpenses()
      .unwrap()
      .then((response) =>{
        console.log(response?.data?.row)
        setData(
          response?.data?.map((row, index) => ({
            id: index + 1,
            amount: row?.amount,
            categoryName: row?.ExpensesCategories?.categoryName,
            subCategoryName: row?.ExpensesSubCategories?.subCategoryName,
            description: row?.ExpensesSubCategories?.description,
            CreatedAt: moment(row?.CreatedAt).format('YYYY-MM-DD'),
          })) || []
        )}
      )
      .catch(console.error);
  }, [fetchExpenses]);

  // Filter data by date range and category
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesStartDate = filters.startDate
        ? moment(row.CreatedAt).isSameOrAfter(filters.startDate)
        : true;
      const matchesEndDate = filters.endDate
        ? moment(row.CreatedAt).isSameOrBefore(filters.endDate)
        : true;
      const matchesCategory = filters.category
        ? row.categoryName
            .toLowerCase()
            .includes(filters.category.toLowerCase())
        : true;
      return matchesStartDate && matchesEndDate && matchesCategory;
    });
  }, [data, filters]);

  const columns = useMemo(
    () => [
      { Header: 'Category Name', accessor: 'categoryName' },
      { Header: 'Subcategory Name', accessor: 'subCategoryName' },
      { Header: 'Amount', accessor: 'amount' },
      { Header: 'Date', accessor: 'CreatedAt' },
      { Header: 'Description', accessor: 'description' },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageSize: 10 },
    },
    useGlobalFilter,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
  } = tableInstance;

  const totalAmount = useMemo(
    () => rows.reduce((sum, row) => sum + Number(row.values.amount || 0), 0),
    [rows]
  );

  
  useEffect(() => {
    if (totalAmount > spendingLimit) {
      toast.error('You have exceeded your spending limit');
    }
  }, [totalAmount, spendingLimit]);


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  if (isLoading) {
    return (
      <main className="w-full min-h-[80vh] flex items-center justify-center">
        <Loading />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center flex-col gap-6">
        <h1 className="text-[25px] font-medium text-center">
          Could not load expenses records
        </h1>
        <Button value="Go to LandingPage" route="/landingPage" />
      </main>
    );
  }

  return (
    <main className="my-12 w-full">
      
      <div className="flex flex-col items-center gap-6">

        {/* Cards Section */}
        <div className="flex gap-8 mb-6">
          {/* Balance Card */}
          <div className="bg-tertiary text-white p-6 rounded-lg shadow-lg w-[300px] flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">Balance</h2>
            <p className="text-3xl font-bold">{balance !== null ? `${balance}` : 'Loading...'} Rwf</p>
          </div>

          {/* Spending Limit Card */}
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg w-[300px] flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">Spending Limit</h2>
            <p className="text-3xl font-bold">{spendingLimit} Rwf</p>
          </div>
        </div>
       
        <div className="flex gap-4 self-start pl-28">   
        <Input
            type="text"
            name="category"
            className="p-2 border rounded-md border-gray-300 "
            value={filters.category}
            onChange={handleFilterChange}
            placeholder="Search by category name"
          />

          <Input
            type="date"
            name="startDate"
            label="Start Date"
            className="p-2 border rounded-md"
            value={filters.startDate}
            onChange={handleFilterChange}
            placeholder="Start Date"
          />
          <Input
            type="date"
            name="endDate"
            label="End Date"
            className="p-2 border rounded-md"
            value={filters.endDate}
            onChange={handleFilterChange}
            placeholder="End Date"
          />
          
        </div>

        <div className="overflow-x-auto w-[85%]">
          <table
            {...getTableProps()}
            className="min-w-full divide-y divide-gray-200 shadow border sm:rounded-lg"
          >
            <thead className="bg-gray-50">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      key={column.id}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="bg-white divide-y divide-gray-200"
            >
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={row.id}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap"
                        key={cell.column.id}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-right font-bold"
                >
                  Total Amount: {totalAmount.toFixed(2)}
                </td>
                
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </main>
  );
};

export default ExpensesTable;
