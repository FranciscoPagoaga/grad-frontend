import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, handleFollow } from "../network/users_api";
import { usersState, updateUser } from "../state";
import { User } from "../models/user";
import profile from "../assets/profile.webp";
import UpdateUser from "./UpdateUser";
import UserList from "./UserList";

const Profile = (props: { userId: string | undefined }) => {
  const token: string | null = useSelector((state: usersState) => state.token);
  const dispatch = useDispatch();
  const sessionUser: User | null = useSelector(
    (state: usersState) => state.user
  );
  const [user, setUser] = useState<User | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [listType, setListType] = useState<boolean>(false);
  const [isFollowed, setIsFollowed] = useState<boolean>(
    sessionUser?.following.includes(props.userId || "") || false
  );

  function mountFollowing() {
    setListType(true);
    setShowUserModal(true);
  }

  function mountFollowers() {
    setListType(false);
    setShowUserModal(true);
  }

  async function handleUserFollow() {
    await handleFollow(sessionUser?._id || "", user?._id || "", token);
    const response: User = await fetchUser(sessionUser?._id || "", token);
    dispatch(
      updateUser({
        user: response,
      })
    );
    setIsFollowed(!isFollowed);
  }

  async function loadUser() {
    const response = await fetchUser(props.userId || "", token);
    setUser(response);
  }

  useEffect(() => {
    loadUser();
    setIsFollowed(sessionUser?.following.includes(props.userId || "") || false);
  }, [showUpdateModal]);

  return (
    <div className="flex flex-col h-full shadow-xl pt-5  bg-white rounded-lg items-start">
      {showUpdateModal ? (
        <UpdateUser onDismiss={() => setShowUpdateModal(false)} />
      ) : null}
      {showUserModal ? (
        <UserList
          onDismiss={() => setShowUserModal(false)}
          listType={listType}
          userId={props.userId || ""}
        />
      ) : null}
      <div className="flex flex-row w-full gap-5 border-b-2 pb-5">
        <img
          src={
            user?.picturePath !== "" ? `/assets/${user?.picturePath}` : profile
          }
          className="w-12 h-12 rounded-full pl-1 basis-1/6"
        />
        <div className="flex flex-col">
          <span className="text-base justify-self-start font-bold">
            {user?.name}
          </span>
          <span className="text-sm text-gray-400 justify-self">{`@${user?.user}`}</span>
        </div>

        {/* conditional component to validate if user can edit his profile */}
        {sessionUser?._id === user?._id ? (
          <div onClick={() => setShowUpdateModal(true)}>
            <IconContext.Provider
              value={{
                color: "gray",
                style: { alignSelf: "center", cursor: "pointer" },
              }}
            >
              <FaUserEdit />
            </IconContext.Provider>
          </div>
        ) : isFollowed ? (
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
      <div className="p-5 w-full text-justify border-b-2">
        <p className="pb-5">{user?.biography}</p>
        {user?.phoneNumber ? (
          <div className="flex flex-row w-full">
            <AiOutlineWhatsApp className={"w-5 h-5 mr-2"} />
            <span className="text-sm">{user.phoneNumber}</span>
          </div>
        ) : null}
      </div>
      <div className="pl-5 w-full">
        <div
          className="hover:underline hover:cursor-pointer"
          onClick={() => mountFollowing()}
        >
          <span className=" text-gray-500">Following: </span>
          <span className=" font-bold">{user?.following.length}</span>
        </div>
        <div
          className="hover:underline hover:cursor-pointer"
          onClick={() => mountFollowers()}
        >
          <span className=" text-gray-500">Followers: </span>
          <span className="font-bold hover:{">{user?.followers.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
