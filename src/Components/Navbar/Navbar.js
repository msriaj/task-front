import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { logout, user } = useAuth();
  return (
    <div>
      <div className="md:w-9/12 items-center  font-medium text-gray-700 mx-auto py-2 flex justify-between">
        <div>
          <Link to="/">
            {" "}
            <h1 className="font-bold text-2xl">Power-Hack</h1>
          </Link>
        </div>
        <div className="flex items-center gap-5">
          {user && (
            <>
              <div className="flex items-center gap-2">
                <span className="none md:block">Paid Amount: </span>
                <span>38</span>
              </div>
              <div>
                <FaSignOutAlt onClick={() => logout()} className="text-2xl hover:text-red-400 cursor-pointer" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
