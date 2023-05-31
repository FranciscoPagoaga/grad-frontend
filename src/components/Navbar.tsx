import React from "react";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../state";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function signout(){
    dispatch(setLogout());
    navigate("/");
    navigate(0);
  }
  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="font-bold text-lg hover:cursor-pointer"
            onClick={() => {navigate("/home"); navigate(0)}}
            >Logo</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <a
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:cursor-pointer"
                onClick={signout}
              >
                Signout
              </a>
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
