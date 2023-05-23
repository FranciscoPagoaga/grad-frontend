import React from "react";
import Button from "./Button";
import { BsFillImageFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, usersState } from "../state";
import { User } from "../models/user";
import * as UsersApi from "../network/users_api";

const CreatePost = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const user: User | null = useSelector((state: usersState) => state.user);
  const token: string | null = useSelector((state: usersState) => state.token);

  async function onSubmit(input: Record<string, any>) {
    try {
      const data = new FormData();
      let pictureName = "";
      for (const [key, value] of Object.entries(input)) {
        if (key === "picture") {
          if (value[0] !== undefined) {
            const pictureFile = value[0] as File;
            pictureName = pictureFile.name;
            data.append(key, pictureFile);
          }
        } else {
          data.append(key, value);
        }
      }

      if (!user) {
        throw Error;
      }

      data.append("userId", user._id);
      data.append("picturePath", pictureName);

      const userResponse = await UsersApi.createPost(data, token);

      dispatch(setPosts({ posts: userResponse }));
      setValue("content", "");
      setValue("picture", []);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col bg-white px-5 py-2 rounded-lg shadow-xl">
      <form id="createPostForm" onSubmit={handleSubmit(onSubmit)}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Create a Post
        </label>
        <textarea
          {...register("content", {
            required: "Please add text to your post",
            maxLength: {
              value: 200,
              message: "Maximum 200 characters for a post",
            },
          })}
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
          placeholder="Write your thoughts here..."
        ></textarea>
        {errors.content && (
          <p className="text-xs italic text-red-500 pb-1">
            {errors.content.message}
          </p>
        )}
        <div className="flex flex-row pt-5 w-full">
          <label htmlFor="file-upload">
            <div className="flex flex-row cursor-pointer ">
              <IconContext.Provider
                value={{
                  color: "#2563EB",
                  size: "1.75rem",
                }}
              >
                <BsFillImageFill />
              </IconContext.Provider>
              <span className="self-center text-sm pl-1 text-gray-500">
                Image
              </span>
              <input
                {...register("picture")}
                type="file"
                id="file-upload"
                className="hidden"
              />
              <span>{}</span>
            </div>
          </label>
          <button
            type="submit"
            className="ml-auto px-4 py-1 rounded-full text-sm font-medium text-white bg-blue-500 border border-transparent shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 active:bg-blue-700"
          >
            Post
          </button>
        </div>
        <div className="pt-5 justify-self-end"></div>
      </form>
    </div>
  );
};

export default CreatePost;
