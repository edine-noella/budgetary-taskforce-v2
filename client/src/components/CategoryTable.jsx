import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { useState, useEffect, useMemo } from 'react';
import Loading from '../components/Loading';
import { useLazyGetAllExpensesCategoriesQuery } from '../states/api/apiSlice';
import Button from '../components/Button';

const CategoryTable = () => {
  const [data, setData] = useState([]);

  const [
    categoryMutation,
    {
      data: categoryData,
      isLoading: categoryListIsLoading,
      isSuccess: categoryListIsSuccess,
      isError: categoryListIsError,
    },
  ] = useLazyGetAllExpensesCategoriesQuery();

  useEffect(() => {
    categoryMutation();
  },);

  useEffect(() => {
    if (categoryListIsSuccess) {
      setData(categoryData?.data);
    }
  }, [categoryData, categoryListIsSuccess]);

  const columns = useMemo(
    () => [
      { Header: 'No', accessor: 'id' },
      { Header: 'Category', accessor: 'categoryName' },
      { Header: 'Description', accessor: 'description' },
    ],
    []
  );

  if (categoryListIsSuccess) {
    return (
      <main className="my-12 w-full">
        <div className="flex flex-col items-center gap-6">
          <div className="mt-2 flex flex-col w-[85%] mx-auto">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className=" mt-16 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table
                    border="1"
                    className="min-w-full divide-y divide-gray-200"
                  >
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
                      {data.map((row, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {row.categoryName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {row.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (categoryListIsError) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center flex-col gap-6">
        <h1 className="text-[25px] font-medium text-center">
          Could not load category records
        </h1>
        <Button value="Go to LandingPage" route="/landingPage" />
      </main>
    );
  }

  if (categoryListIsLoading) {
    return (
      <main className="w-full min-h-[80vh] flex items-center justify-center">
        <Loading />
      </main>
    );
  }

  return (
    <main className="w-full min-h-[80vh] flex items-center justify-center">
      <Loading />
    </main>
  );
};

export default CategoryTable;
