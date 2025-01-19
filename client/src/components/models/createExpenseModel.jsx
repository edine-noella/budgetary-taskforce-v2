import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { useForm, Controller } from "react-hook-form";
import Button from "../Button";
import Loading from "../Loading";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import {
  // useCreateExpensesCategoriesMutation,
  useCreateExpensesMutation,
  useLazyGetAllExpensesCategoriesQuery,
  useLazyGetAllExpensesSubCategoriesQuery,
} from "../../states/api/apiSlice";

function CreateExpenseModal() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // const [createExpenseCategory] = useCreateExpensesCategoriesMutation();
  const [createExpenseMutation] = useCreateExpensesMutation();
  const [fetchCategories] = useLazyGetAllExpensesCategoriesQuery();
  const [fetchSubCategories] = useLazyGetAllExpensesSubCategoriesQuery();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch categories and subcategories when modal opens
  useEffect(() => {
    if (showModal) {
      fetchCategories()
        .unwrap()
        .then((data) => {
          setCategories(data?.data || []);
        })
        .catch(() => {
          toast.error("Failed to fetch categories");
        });

      fetchSubCategories()
        .unwrap()
        .then((data) => {
          setSubCategories(data?.data || []);
        })
        .catch(() => {
          toast.error("Failed to fetch subcategories");
        });
    }
  }, [showModal, fetchCategories, fetchSubCategories]);

  const handleModalToggle = () => {
    setShowModal((prev) => !prev);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      await createExpenseMutation({
        ExpensesSubCategoriesId: data.ExpensesSubCategoriesId,
        amount: data.amount,
        ExpensesCategoriesId: data.ExpensesCategoriesId,
      }).unwrap();
      toast.success("Expense recorded successfully");
      handleModalToggle();
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Error while recording Expense");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleModalToggle}
        className="flex items-center absolute right-12 top-44 px-4 py-2.5 text-sm font-medium text-white bg-primary rounded-lg shadow-md hover:scale-105"
        type="button"
      >
        <BsPlus className="mr-2 text-lg" />
        Create Expense
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-60"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative bg-white rounded-lg shadow p-8 w-full max-w-md">
            <button
              onClick={handleModalToggle}
              className="absolute top-3 right-2.5 w-8 h-8 text-primary hover:bg-primary hover:text-white rounded-lg"
            >
              <span className="sr-only">Close modal</span>×
            </button>

            <h3 className="mb-4 text-xl text-center font-medium text-black">
              Record Expense
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block mb-2 text-sm font-medium text-black">
                  Category
                </label>
                <Controller
                  name="ExpensesCategoriesId"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full text-sm border-[1.3px] border-primary rounded-lg p-2.5"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.categoryName}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.ExpensesCategoriesId && (
                  <span className="text-red-500">
                    {errors.ExpensesCategoriesId.message}
                  </span>
                )}
              </div>

              {/* Sub Category Selection */}
              <div>
                <label className="block mb-2 text-sm font-medium text-black">
                  Sub Category
                </label>
                <Controller
                  name="ExpensesSubCategoriesId"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Sub Category is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full text-sm border-[1.3px] border-primary rounded-lg p-2.5"
                    >
                      <option value="">Select Sub Category</option>
                      {subCategories.map((subCat) => (
                        <option key={subCat.id} value={subCat.id}>
                          {subCat.subCategoryName}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.ExpensesSubCategoriesId && (
                  <span className="text-red-500">
                    {errors.ExpensesSubCategoriesId.message}
                  </span>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className="block mb-2 text-sm font-medium text-black">
                  Amount
                </label>
                <Controller
                  name="amount"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Amount is required",
                    validate: (value) =>
                      Number.isInteger(Number(value)) ||
                      "Amount must be an integer",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      placeholder="Enter Amount"
                      className="w-full text-sm border-[1.3px] border-primary rounded-lg p-2.5"
                    />
                  )}
                />
                {errors.amount && (
                  <span className="text-red-500">{errors.amount.message}</span>
                )}
              </div>

              <Button
                submit
                value={isLoading ? <Loading /> : "Create Category"}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

CreateExpenseModal.propTypes = {
  ExpensesCategoriesId: PropTypes.number,
  ExpensesSubCategoriesId: PropTypes.number,
};

export default CreateExpenseModal;
