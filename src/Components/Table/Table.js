import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Axios } from "../../services/axiosInstance";

const Table = () => {
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(10);
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const { data, isLoading } = useQuery([`users`, page], () => Axios.get(`/billing-list?page=${page}&limit=${limit}`));

  if (isLoading) {
    return "loading...";
  }
  const billList = data?.data?.billList;

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  const handlePageActive = (second) => {
    console.log(second);
  };
  return (
    <div className="bg-blue-50 pt-10  h-screen">
      <div className="w-9/12  shadow bg-white p-5 md:p-10 mx-auto">
        <div className="container-fluid">
          <h1 className="text-gray-900 font-medium text-2xl">Billings</h1>
          <div className="flex my-5 justify-between">
            <div className="flex items-center gap-5">
              <input
                type="text"
                className="rounded-md outline-0 text-gray-900 bg-blue-50 border border-gray-300  py-2 px-3 md:w-72"
                placeholder="Search"
              />
            </div>
            <div>
              <button className="bg-blue-500 rounded-md text-white py-2 px-3 ">Add New Bill</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full sm:min-w-md ">
              <thead className="bg-gray-200">
                <tr className="text-left text-gray-700">
                  <th className="p-3 ">Billing ID</th>
                  <th className="p-3 ">Full Name</th>
                  <th className="p-3 ">Email </th>
                  <th className="p-3 ">Phone</th>
                  <th className="p-3 ">Paid Amount</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {billList
                  ? billList.map((item) => (
                      <tr className="hover:bg-blue-100 even:bg-gray-100 odd:bg-white">
                        <td className="p-3 ">{item.billingId}</td>
                        <td className="p-3 ">{item.name}</td>
                        <td className="p-3 ">{item.email}</td>
                        <td className="p-3 ">{item.phone}</td>
                        <td className="p-3 ">{item.payableAmount}</td>
                        <td className="p-3 flex gap-3 justify-center text-xl">
                          <button className="text-green-600 px-2 ">
                            <FaEdit />
                          </button>
                          <button className="text-red-600 px-2">
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>

          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={data?.data?.pageNo}
            previousLabel="<"
            forcePage={3}
            onPageActive={handlePageActive}
            renderOnZeroPageCount={null}
            nextClassName="bg-gray-300  text-gray-900 px-3 py-2 rounded-md"
            previousClassName="bg-gray-300 text-gray-900 px-3 py-2 rounded-md"
            activeLinkClassName="bg-gray-300 text-gray-900 px-3 py-2 rounded-md"
            activeClassName="bg-gray-300 text-gray-900 px-3 py-2 rounded-md"
            className="flex gap-2 justify-center mt-5"
            pageClassName="border border-blue-100 text-gray-700 px-3 py-2 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
