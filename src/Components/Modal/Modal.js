import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function FormModal({ open, onClose, defaultValues, resetDefaultValues, setData }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setData(data);
    onClose(false);
    reset();
  };

  const handleOnclose = () => {
    onClose(false);
    resetDefaultValues(null);
    reset();
  };

  useEffect(() => {
    if (defaultValues) {
      setValue("name", defaultValues.name);
      setValue("email", defaultValues.email);
      setValue("phone", defaultValues.phone);
      setValue("payableAmount", defaultValues.payableAmount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  return (
    <div className={`${!open && "hidden"} fixed z-10 inset-0 overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 mx-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                    Add New Bill
                  </h3>
                  <div className="mt-3">
                    <p className="text-md text-gray-500">
                      <input
                        {...register("name", { required: "Name is Required !", minLength: 3 })}
                        type="text"
                        className="border border-gray-300 rounded-md outline-none w-full p-3"
                        placeholder="Full Name"
                      />
                    </p>
                    {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}
                  </div>
                  <div className="mt-3">
                    <p className="text-md text-gray-500">
                      <input
                        {...register("email", {
                          required: "Email is Required !",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid Email Address !",
                          },
                        })}
                        type="text"
                        className="border border-gray-300 rounded-md outline-none w-full p-3"
                        placeholder="Email Address"
                      />
                    </p>
                    {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
                  </div>
                  <div className="mt-3">
                    <p className="text-md text-gray-500">
                      <input
                        {...register("phone", {
                          required: "Phone is required !",
                          pattern: {
                            value: /(^(01){1}[3456789]{1}(\d){8})$/,
                            message: "Invalid Phone Number !",
                          },
                        })}
                        type="text"
                        className="border border-gray-300 rounded-md outline-none w-full p-3"
                        placeholder="Phone"
                      />
                    </p>
                    {errors.phone && <p className="text-sm text-red-400">{errors.phone.message}</p>}
                  </div>
                  <div className="mt-3">
                    <p className="text-md text-gray-500">
                      <input
                        {...register("payableAmount", { required: "Payable Amount is Required !" })}
                        type="number"
                        className="border border-gray-300 rounded-md outline-none w-full p-3"
                        placeholder="Payable Amount"
                      />
                    </p>
                    {errors.payableAmount && <p className="text-sm text-red-400">{errors.payableAmount.message}</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              {defaultValues ? (
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add
                </button>
              )}
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleOnclose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
