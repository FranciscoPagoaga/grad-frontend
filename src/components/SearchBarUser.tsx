import React from "react";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.webp";


interface cardElementsProps {
  userProfilePicture: string;
  name: string;
  user: string;
}

const SearchBarUser = ({
  userProfilePicture,
  name,
  user
}: cardElementsProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-row w-full hover:bg-gray-100 hover:rounded-md py-3 hover:cursor-pointer"
      onClick={() => {
        navigate(`/profile/${user}`);
        navigate(0);
      }}
    >
      <div className="basis-1/5">
        <img
          className="rounded-full h-14 pl-1"
          src={
            userProfilePicture !== ""
              ? `/assets/${userProfilePicture}`
              : profile
          }
        />
      </div>
      <div className="flex flex-col pl-5">
          <span className="font-bold hover:underline hover:cursor-pointer ">
            {/* asd */}
            {name}
          </span>
          <span className="text-gray-400">{`@${user}`}</span>
      </div>
    </div>
  );
};

export default SearchBarUser;
