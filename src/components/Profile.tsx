import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchUser } from "../network/users_api";
import { usersState } from "../state";
import { User } from "../models/user";
import profile from "../assets/profile.webp";
import UpdateUser from "./UpdateUser";
import UserList from "./UserList";

const Profile = (props: { userId: string | undefined }) => {
  const token: string | null = useSelector((state: usersState) => state.token);
  const sessionUser: User | null = useSelector(
    (state: usersState) => state.user
  );
  const [user, setUser] = useState<User | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [listType, setListType] = useState<boolean>(false);

  function mountFollowing() {
    setListType(true);
    setShowUserModal(true);
  }

  function mountFollowers() {
    setListType(false);
    setShowUserModal(true);
  }

  async function loadUser() {
    const response = await fetchUser(props.userId || "", token);
    setUser(response);
  }

  useEffect(() => {
    console.log(props.userId);
    loadUser();
  }, []);
  
  return (
    <div className="flex flex-col h-full shadow-xl pt-5  bg-white rounded-lg items-start">
      {showUpdateModal ? <UpdateUser onDismiss={() => setShowUpdateModal(false)} /> : null}
      {showUserModal ? <UserList onDismiss={() => setShowUserModal(false)} listType={listType} userId={props.userId || ""}/> : null}
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
        ) : null}
      </div>
      <p className="p-5 w-full text-justify border-b-2">{user?.biography}</p>
      <div className="pl-5 w-full">
        <div className="hover:underline hover:cursor-pointer" onClick={() => mountFollowing()}>
          <span className=" text-gray-500">Following: </span>
          <span className=" font-bold">{user?.following.length}</span>
        </div>
        <div className="hover:underline hover:cursor-pointer" onClick={() => mountFollowers()}>
          <span className=" text-gray-500">Followers: </span>
          <span className="font-bold hover:{">{user?.followers.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
