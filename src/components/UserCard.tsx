import React from "react";
import profile from "../assets/profile.webp";

interface cardElementsProps {
  userId: string;
  userProfilePicture: string;
  name: string;
  user: string;
  biography: string;
}

const UserCard = ({
  userId,
  userProfilePicture,
  name,
  user,
  biography,
}: cardElementsProps) => {
  return (
    <div className="flex flex-row w-full hover:bg-gray-100 hover:rounded-md py-3">
      <div className="basis-1/12">
        <img
          className="rounded-full h-14 pl-1"
          src={
            userProfilePicture !== ""
              ? `/assets/${userProfilePicture}`
              : profile
          }
        />
      </div>
      <div className="flex flex-col">
        <div className="pl-5">
          <span className="font-bold hover:underline hover:cursor-pointer">
            {/* asd */}
            {name}
          </span>
          <span className="text-gray-400 pl-3">@asdasd {`@${user}`}</span>
        </div>
        <div className="pl-5 max-h-14">{biography}</div>
      </div>
      <div>
        <button
          type="submit"
          className="ml-auto px-4 py-1 rounded-full text-sm font-medium text-white bg-blue-500 border border-transparent shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 active:bg-blue-700"
        >
          Follow
        </button>
      </div>
    </div>
  );
};

export default UserCard;
