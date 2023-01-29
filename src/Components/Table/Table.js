import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
import { useLocation, useNavigate } from "react-router-dom";
import { Axios } from "../../services/axiosInstance";
import FormModal from "../Modal/Modal";
import { notify } from "../notify/notify";
import TempRow from "./TempRow";

const Table = () => {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [searchBy, setSearchBy] = React.useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [newTempData, setNewTempData] = useState(null);
  const [billingList, setBillingList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const { data, isLoading, refetch } = useQuery([`users`, page], () => Axios.get(`/billing-list?page=${page}&limit=${limit}&searchBy=${searchBy}`));

  const pageCount = Math.ceil(data?.data?.total / limit);

  const handleSearch = (data) => {
    setSearchBy(data.target.value);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleEdit = (id) => {
    const findData = data?.data?.billList?.find((item) => item.billingId === id);
    setEditData(findData);
    setModalOpen(true);
  };

  useEffect(() => {
    if (data) {
      setBillingList(data?.data?.billList);
    }
  }, [data]);

  useEffect(() => {
    const pageStr = query.get("page");
    const limitStr = query.get("limit");

    if (searchBy && page && limit) {
      navigate(`/billing?page=${page}&limit=${limit}&searchBy=${searchBy}`);
      refetch();
    }

    if (pageStr && limitStr) {
      setPage(pageStr);
      setLimit(limitStr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBy]);

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
    navigate(`/billing?page=${data.selected + 1}&limit=${limit}`);
  };

  if (newTempData) {
    Axios.post("/add-billing", newTempData)
      .then((result) => {
        console.log(result);
        setNewTempData(null);
        notify("Bill Created Successfully !!");
        refetch();
      })
      .catch((err) => {
        console.log(err);
        setNewTempData(null);
        notify("error", err.response.data.message);
      });
  }

  if (editData) {
    console.log(editData);
    Axios.post(`/update-billing/${editData.billingId}`, editData)
      .then((result) => {
        console.log(result);
        setEditData(null);
        notify("Bill Updated Successfully !!");
        refetch();
      })
      .catch((err) => {
        console.log(err);
        setEditData(null);
        notify("error", err.response.data.message);
      });
  }

  return (
    <div className="bg-blue-50 pt-10  h-screen">
      <FormModal open={modalOpen} onClose={setModalOpen} defaultValues={editData} resetDefaultValues={setEditData} setData={setNewTempData} />
      <div className="w-9/12  shadow bg-white p-5 md:p-10 mx-auto">
        <div className="container-fluid">
          <h1 className="text-gray-900 font-medium text-2xl">Billings</h1>
          <div className="flex my-5 justify-between">
            <div className="flex items-center gap-5">
              <input
                type="text"
                className="rounded-md outline-0 text-gray-900 bg-blue-50 border border-gray-300  py-2 px-3 md:w-72"
                placeholder="Search"
                onChange={handleSearch}
              />
            </div>
            <div>
              <button className="bg-blue-500 rounded-md text-white py-2 px-3 " onClick={handleModalOpen}>
                Add New Bill
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            {isLoading && <Skeleton height={50} count={10} />}
            <table className="table-auto w-full sm:min-w-md ">
              {billingList.length && !isLoading && (
                <>
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
                    {newTempData && <TempRow data={newTempData} />}
                    {billingList.map((item) => (
                      <tr className="hover:bg-blue-100 even:bg-gray-100 odd:bg-white">
                        <td className="p-3 ">{item.billingId}</td>
                        <td className="p-3 ">{item.name}</td>
                        <td className="p-3 ">{item.email}</td>
                        <td className="p-3 ">{item.phone}</td>
                        <td className="p-3 ">{item.payableAmount}</td>
                        <td className="p-3 flex gap-3 justify-center text-xl">
                          <button className="text-green-600 px-2 " onClick={() => handleEdit(item.billingId)}>
                            <FaEdit />
                          </button>
                          <button className="text-red-600 px-2">
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
          </div>

          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="<"
            forcePage={page - 1}
            renderOnZeroPageCount={null}
            nextClassName="bg-gray-300  text-gray-900 [&>*]:px-3 [&>*]:flex [&>*]:py-2 rounded-md"
            previousClassName="bg-gray-300 text-gray-900 [&>*]:px-3 [&>*]:flex [&>*]:py-2 rounded-md"
            activeLinkClassName="bg-gray-300 text-gray-900 [&>*]:px-3 [&>*]:flex [&>*]:py-2 rounded-md"
            activeClassName="bg-gray-300 text-gray-900 [&>*]:px-5 [&>*]:flex [&>*]:py-2 rounded-md"
            className="flex gap-2 justify-center mt-5"
            pageClassName="border border-blue-100 text-gray-700 [&>*]:px-3 [&>*]:flex [&>*]:py-2 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
