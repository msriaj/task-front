/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Axios } from "../../services/axiosInstance";
import DeleteModal from "../Modal/DeleteModel";
import FormModal from "../Modal/Modal";
import { notify } from "../notify/notify";
import Spinner from "../Spinner/Spinner";

const Table = () => {
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [searchBy, setSearchBy] = React.useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [newTempData, setNewTempData] = useState(null);
  const [billingList, setBillingList] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const { paidAmount, setPaidAmount } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const { data, isLoading, refetch, error, isFetching } = useQuery([`users`, page + limit + searchBy], () =>
    Axios.get(`/billing-list?page=${page}&limit=${limit}&searchBy=${searchBy}`)
  );

  const handleSearch = (data) => {
    const value = data.target.value;

    if (value.length > 2) {
      return setSearchBy(data.target.value);
    }
    setSearchBy("");
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleEdit = (id) => {
    const findData = data?.data?.billList?.find((item) => item.billingId === id);
    setEditData(findData);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const deleteHandler = () => {
    Axios.delete(`/delete-billing/${deleteId}`)
      .then((result) => {
        setDeleteModal(false);
        notify("Bill Deleted Successfully !!");
        refetch();
      })
      .catch((err) => {
        console.log(err);
        setDeleteModal(false);

        notify(err.response.data.message, "error");
      });
  };

  const setPageCountFunc = (val) => {
    const pageNo = data?.data?.total + val;
    setPageCount(Math.ceil(pageNo / limit));
  };

  useEffect(() => {
    if (data && !newTempData && !isFetching) {
      setPageCountFunc(0);
      setBillingList(data?.data?.billList);
    }

    if (newTempData) {
      console.log("called");
      const newObj = { ...newTempData, billingId: false };

      setBillingList((prev) => (prev.length < 9 ? [newObj, ...prev] : [newObj, ...prev.slice(0, 9)]));
    }

    if (error) {
      setBillingList([]);
    }
  }, [data, error, newTempData]);

  useEffect(() => {
    const pageStr = parseInt(query.get("page"));
    const limitStr = parseInt(query.get("limit"));

    if (pageStr && limitStr) {
      setPage(pageStr);
      setLimit(limitStr);
    }

    if (searchBy && page && limit) {
      navigate(`/billing?page=${1}&limit=${limitStr}&searchBy=${searchBy}`);
      refetch();
    }

    if (!pageStr && !limitStr) {
      navigate(`/billing?page=${page}&limit=${limit}`);
    }
  }, [searchBy]);

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
    navigate(`/billing?page=${data.selected + 1}&limit=${limit}`);
  };

  // handle add billing data
  const handleAddBilling = async (data, reset) => {
    let totalPaidAmount = paidAmount + parseInt(data.payableAmount);
    try {
      setPaidAmount(totalPaidAmount);
      setPageCountFunc(1);
      setNewTempData(data);
      setModalOpen(false);

      const res = await Axios.post("/add-billing", data);

      if (res.status === 200) {
        notify("Bill Created Successfully !!");
        reset();
        refetch();
        setNewTempData(null);
        setEditData(null);
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        notify("Network Error !!", "error");
        setPaidAmount(totalPaidAmount - parseInt(data.payableAmount));
        setNewTempData(null);
        reset();
      }
      console.log(error);
      if (error.response) {
        notify(error.response.data.message, "error");
        setPaidAmount(totalPaidAmount - parseInt(data.payableAmount));
        setNewTempData(null);
        refetch();
        reset();
      }
    }
  };

  const handleUpdateBilling = async (data, reset) => {
    const { billingId, ...rest } = data;
    try {
      const res = await Axios.put(`/update-billing/${billingId}`, rest);

      if (res.status === 200) {
        notify("Bill Updated Successfully !!");
        reset();
        refetch();
        setModalOpen(false);
        setEditData(null);
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        notify("Network Error !!", "error");
      }

      if (error.response) {
        notify(error.response.data.message, "error");
      }
    }
  };

  return (
    <div className="bg-blue-50 pt-10  h-screen">
      <FormModal
        open={modalOpen}
        onClose={setModalOpen}
        defaultValues={editData}
        resetDefaultValues={setEditData}
        handleAdd={handleAddBilling}
        handleUpdate={handleUpdateBilling}
      />
      <DeleteModal show={deleteModal} setShow={setDeleteModal} deleteHandler={deleteHandler} />
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
            {!isLoading && billingList.length === 0 && <div className="text-center font-medium text-red-400 p-10 bg-gray-200">No Bill Found!!!</div>}
            <table className="table-auto w-full sm:min-w-md ">
              {billingList.length && !isLoading ? (
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
                    {billingList.map((item, idx) => {
                      const classStr = `hover:bg-blue-100 ${!item.billingId && "border-l-2 border-sky-400"} even:bg-gray-100 odd:bg-white`;

                      return (
                        <tr className={classStr} key={item.billingId}>
                          <td className="p-3 ">{!item.billingId ? <Spinner /> : item.billingId}</td>
                          <td className="p-3 ">{item.name}</td>
                          <td className="p-3 ">{item.email}</td>
                          <td className="p-3 ">{item.phone}</td>
                          <td className="p-3 ">{item.payableAmount}</td>
                          <td className="p-3 flex gap-3 justify-center text-xl">
                            <button className="text-green-600 px-2 " onClick={() => handleEdit(item.billingId)}>
                              <FaEdit />
                            </button>
                            <button onClick={() => handleDelete(item.billingId)} className="text-red-600 px-2">
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </>
              ) : null}
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
