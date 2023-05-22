import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { User } from "../models/user";
import { getFollowing, getFollowers } from "../network/users_api";
import { useSelector } from "react-redux";
import { usersState } from "../state";
interface modalProps {
  onDismiss: () => void;
  listType: boolean;
  userId: string;
}

const UserList = ({ onDismiss, listType, userId }: modalProps) => {
  const token: string | null = useSelector((state: usersState) => state.token);
  const [following, setFollowing] = useState<User[]>([]);
  const [followers, setFollowers] = useState<User[]>([]);

  async function loadLists() {
    const followerResponse = await getFollowers(userId, token);
    setFollowers(followerResponse);

    const followingResponse = await getFollowing(userId, token);
    setFollowing(followingResponse);

  }

  useEffect(() => {
    loadLists();
  }, []);

  return (
    <>
      <div className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                {listType ? "Following" : "Followers"}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onDismiss}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto overflow-auto max-h-96">
              {listType
                ? following.map((user) => (
                    <UserCard
                      userId={user._id}
                      userProfilePicture={user.picturePath}
                      biography={user.biography}
                      name={user.name}
                      user={user.user}
                    />
                  ))
                : followers.map((user) => (
                    <UserCard
                      userId={user._id}
                      userProfilePicture={user.picturePath}
                      biography={user.biography}
                      name={user.name}
                      user={user.user}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default UserList;
