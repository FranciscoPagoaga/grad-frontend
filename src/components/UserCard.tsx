import React, { useState } from "react";
import profile from "../assets/profile.webp";
import { updateUser, usersState } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../models/user";
import { fetchUser, handleFollow } from "../network/users_api";
import { useNavigate } from "react-router-dom";

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
  const sessionUser: User | null = useSelector(
    (state: usersState) => state.user
  );
  const token: string | null = useSelector((state: usersState) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isFollowed, setIsFollowed] = useState<boolean>(
    sessionUser?.following.includes(userId) || false
  );

  async function handleUserFollow() {
    await handleFollow(sessionUser?._id || "", userId, token);
    const response: User = await fetchUser(sessionUser?._id || "", token);

    dispatch(
      updateUser({
        user: response,
      })
    );
    setIsFollowed(!isFollowed);
  }

  return (
    <div
      className="flex flex-row w-full hover:bg-gray-100 hover:rounded-md py-3 hover:cursor-pointer"
      onClick={() => {
        navigate(`/profile/${user}`);
        navigate(0);
      }}
    >
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
          <span className="text-gray-400 pl-3">{`@${user}`}</span>
        </div>
        <div className="pl-5 max-h-14">{biography}</div>
      </div>
      <div>
        {sessionUser?._id === userId ? null : isFollowed ? (
          <button
            className="ml-auto px-4 py-1 rounded-full text-sm font-medium text-white bg-blue-500 border border-transparent shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 active:bg-blue-700"
            onClick={handleUserFollow}
          >
            Following
          </button>
        ) : (
          <button
            className="ml-auto px-4 py-1 rounded-full text-sm font-medium text-white bg-blue-500 border border-transparent shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 active:bg-blue-700"
            onClick={handleUserFollow}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
