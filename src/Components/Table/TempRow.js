import { FaEdit, FaTrash } from "react-icons/fa";

const TempRow = ({ data }) => {
  return (
    <tr className="hover:bg-blue-100 even:bg-gray-100 odd:bg-white">
      <td className="p-3 "> Generating Id</td>
      <td className="p-3 ">{data.name}</td>
      <td className="p-3 ">{data.email}</td>
      <td className="p-3 ">{data.phone}</td>
      <td className="p-3 ">{data.payableAmount}</td>

      <td className="p-3 flex gap-3 justify-center text-xl">
        <button className="text-green-600 px-2 ">
          <FaEdit />
        </button>
        <button className="text-red-600 px-2">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default TempRow;
