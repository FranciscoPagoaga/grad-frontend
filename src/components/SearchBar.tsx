import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { User } from "../models/user";
import { searchUser } from "../network/users_api";
import { useSelector } from "react-redux";
import { usersState } from "../state";
import SearchBarUser from "./SearchBarUser";

const SearchBar = () => {
  const [input, setInput] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  const token: string | null = useSelector((state: usersState) => state.token);

  function handleChange(value: string) {
    setInput(value);
    if (value.length > 2) fetchUsers(value);
    if (value.length === 0) setUsers([]);
  }

  async function fetchUsers(value: string) {
    const response = await searchUser(value, token);
    setUsers(response);
  }

  return (
    <div className="relative">
      <div className="relative flex">
        <input
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
          placeholder="Username"
        />
        <div className="absolute inset-y-0 right-0 flex flex-row items-center px-2">
          <AiOutlineSearch className="text-gray-400" />
        </div>
      </div>
      <div className="absolute z-20 top-full left-0 w-full bg-white border border-gray-300 shadow-m">
        {users.map((user) => ( 
          <SearchBarUser name={user.name} user={user.user} userProfilePicture={user.picturePath} key={1}/>
        ))}
        
      </div>
    </div>
  );
};

export default SearchBar;
