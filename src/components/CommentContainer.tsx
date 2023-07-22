import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CreateCommentBody,
  createComment,
  getComments,
} from "../network/users_api";
import { useSelector } from "react-redux";
import { usersState } from "../state";
import CommentCard from "./CommentCard";
import { CommentModel } from "../models/comment";
import { useNavigate } from "react-router-dom";

type CommentData = {
  content: string;
};

interface propsCommentInfo {
  userId: string;
  postId: string;
  isPagePost: boolean;
}

const CommentContainer = ({ userId, postId, isPagePost }: propsCommentInfo) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CommentData>();
  const token: string | null = useSelector((state: usersState) => state.token);
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CommentData> = async (data) => {
    try {
      const body: CreateCommentBody = {
        content: data.content,
        userId: userId || "",
        postId: postId || "",
      };
      await createComment(body, token || "");
      fetchComments();
      setValue("content", "");
    } catch (error) {
      console.error(error);
    }
  };

  async function fetchComments() {
    getComments(postId, token).then((comments) => {
      setIsLoading(false);
      setComments(comments);
    });
  }

  useEffect(() => {
    if (postId !== "") {
      fetchComments();
    }
  }, [postId]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row pb-1">
          <input
            {...register("content", { required: true })}
            placeholder="Add a comment..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
          ></input>
          <button
            type="submit"
            className="ml-auto px-4 rounded-full text-sm font-medium text-white bg-blue-500 border border-transparent shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 active:bg-blue-700"
          >
            Comment
          </button>{" "}
        </div>
      </form>
      {isLoading ? (
        <span>Loading...</span>
      ) : isPagePost ? (
        comments.map((comment) => (
          <CommentCard
            key={comment.content}
            content={comment.content}
            name={comment.name}
            user={comment.user}
            userProfilePicture={comment.userPicturePath}
          />
        ))
      ) : (
        comments
          .slice(0, 2)
          .map((comment) => (
            <CommentCard
              key={comment.content}
              content={comment.content}
              name={comment.name}
              user={comment.user}
              userProfilePicture={comment.userPicturePath}
            />
          ))
      )}

      {isPagePost ? null : comments.length > 2 ? (
        <div className="flex text-center">
          <span
            className="text-blue-600 center w-full hover:text-blue-800 hover:cursor-pointer"
            onClick={() => {
              navigate(`/post/${postId}`);
              navigate(0);
            }}
          >
            View more comments
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default CommentContainer;
