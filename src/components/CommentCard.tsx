import React from "react";
import profile from "../assets/profile.webp";
import { useNavigate } from "react-router-dom";

interface propsComment{
    userProfilePicture: string;
    user: string; 
    name: string;
    content: string;
}


const CommentCard = ({userProfilePicture, user, name, content } : propsComment) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-row bg-white pt-4 pb-4 rounded-md hover:bg-gray-"
    >
      <div className="basis-1/6">
        <img
          className="rounded-full h-10 pl-1"
          src={
            userProfilePicture !== ""
              ? `/assets/${userProfilePicture}`
              : profile
          }
        />
      </div>
      <div className="flex flex-col basis-11/12 grow-0 w-full text-sm">
        <div
          className=""
          onClick={() => {
            navigate(`/profile/${user}`);
            navigate(0);
          }}
        >
          <span className="font-bold hover:underline hover:cursor-pointer">
            {name}
          </span>
          <span className="text-gray-400 pl-3">{`@${user}`}</span>
        </div>
        <div className="break-normal">
          <span className="text-justify">{content}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
