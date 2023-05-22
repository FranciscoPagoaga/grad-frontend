import React, { useState, useRef, useMemo, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IconContext } from "react-icons";
import { likePost, updateWatchtime, watchtimeBody } from "../network/users_api";
import { useSelector } from "react-redux";
import { usersState } from "../state";
import profile from "../assets/profile.webp";
import { useIntersection } from "../utils/useIntersection";
import { useNavigate } from "react-router-dom";

const Post = (props: {
  postUserId: string | undefined;
  userId?: string | undefined;
  postId: string | undefined;
  name: string;
  user: string;
  userProfilePicture: string;
  content: string;
  isLiked: boolean;
}) => {
  const ref = useRef();
  const inViewport = useIntersection(ref, "0px");

  const navigate = useNavigate();

  const token: string | null = useSelector((state: usersState) => state.token);
  const [isLiked, setIsLiked] = useState<boolean>(props.isLiked);
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);

  async function likePostButton() {
    const response = await likePost(
      props.userId || "",
      props.postId || "",
      token
    );
    setIsLiked(!isLiked);
  }

  async function manageWatchtime(body: watchtimeBody) {
    await updateWatchtime(props.postId || "", body, token);
  }

  function handleVisibilityChange() {
    setIsActive(!document.hidden);
  }

  useEffect(() => {
    if (!inViewport || !isActive) {
      if (seconds !== 0) {
        const body: watchtimeBody = {
          userId: props.userId || "",
          watchtime: seconds,
        };
        manageWatchtime(body);
        console.log(`${props.user}) seconds: ${seconds}`);
      }
      setSeconds(0);
    }

    const timer = setInterval(() => {
      if (inViewport && isActive) setSeconds(seconds + 1);
      // console.log(`${props.content}: ${seconds}`);
    }, 1000);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [inViewport, seconds, isActive]);

  return (
    <div
      className="flex flex-row bg-white pt-4 pb-4 rounded-md hover:bg-gray-"
      ref={ref}
    >
      <div className="basis-1/12">
        <img
          className="rounded-full h-14 pl-1"
          src={
            props.userProfilePicture !== ""
              ? `/assets/${props.userProfilePicture}`
              : profile
          }
        />
      </div>
      <div className="flex flex-col basis-11/12 max-w-fit grow-0">
        <div
          className="pl-5"
          onClick={() => {
            navigate(`/profile/${props.user}`);
            navigate(0);
          }}
        >
          <span className="font-bold hover:underline hover:cursor-pointer">
            {props.name}
          </span>
          <span className="text-gray-400 pl-3">{`@${props.user}`}</span>
        </div>
        <div className="px-5 break-normal">
          <span className="text-justify">{props.content}</span>
        </div>
        <div onClick={likePostButton} className="pl-5 h-7">
          {isLiked ? (
            <IconContext.Provider value={{ size: "1.1rem", color: "Red" }}>
              <AiFillHeart />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider
              value={{
                size: "1.1rem",
                color: "#0C1116",
                className: "icon-like",
              }}
            >
              <AiOutlineHeart />
            </IconContext.Provider>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
