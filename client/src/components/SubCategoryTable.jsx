import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { useLazyGetAllExpensesSubCategoriesQuery } from '../states/api/apiSlice';
import Button from '../components/Button';

const SubCategoryTable = () => {
  const [
    subCategoryMutation,
    {

      isLoading: subCategoryListIsLoading,
      isSuccess: subCategoryListIsSuccess,
      isError: subCategoryListIsError,
    },
  ] = useLazyGetAllExpensesSubCategoriesQuery();

  const [data, setData] = useState([]);

  useEffect(() => {
    subCategoryMutation()
      .unwrap()
      .then((data) => {
        setData(
          data?.data?.map((row, index) => ({
            id: index + 1,
            subCategoryName: row?.subCategoryName,
            description: row?.description,
            categoryName: row?.ExpensesCategories?.categoryName,
          })) || []
        );
      });
  }, []);

  if (subCategoryListIsLoading) {
    return (
      <main className="w-full min-h-[80vh] flex items-center justify-center">
        <Loading />
      </main>
    );
  }

  if (subCategoryListIsError) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center flex-col gap-6">
        <h1 className="text-[25px] font-medium text-center">
          Could not load subcategory records
        </h1>
        <Button value="Go to LandingPage" route="/landingPage" />
      </main>
    );
  }

  if (subCategoryListIsSuccess) {
    return (
      <main className="my-12 w-full">
        <div className="flex flex-col items-center gap-6">
          <div className="mt-2 flex flex-col w-[85%] mx-auto">
            <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className=" mt-16 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Sub Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.map((row, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {row.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {row.subCategoryName}
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

  return (
    <main className="w-full min-h-[80vh] flex items-center justify-center">
      <Loading />
    </main>
  );
};

export default SubCategoryTable;
