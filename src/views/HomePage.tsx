import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { usersState, setPosts } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../models/user";
import { fetchFeed } from "../network/users_api";
import { PostModel } from "../models/post";

const HomePage = () => {
  const dispatch = useDispatch();
  const token: string | null = useSelector((state: usersState) => state.token);
  const user: User | null = useSelector((state: usersState) => state.user);
  let userId =  "";

  if(user){
    userId = user._id
  }
  const posts: PostModel[] | null = useSelector((state: usersState) => state.posts);

  async function loadFeed() {
    const response = await fetchFeed(user?._id || "", token);
    dispatch(setPosts({posts: response}));
  }

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <Navbar />
      <div className="flex flex-row  py-8 pt-8 gap-16 justify-center">
        <div className="basis-1/4 h-fit">
          <Profile userId={user?._id} />
        </div>
        <div className="basis-2/5">
          <CreatePost />
          <div className="pt-10 overflow-auto max-h-96">
            {posts.map((post, i) => (
              <div className="pb-5">
                <Post
                  key={i}
                  postUserId={post.userId}
                  userId={user?._id}
                  postId={post._id}
                  name={post.name}
                  user={post.user}
                  userProfilePicture={post.userPicturePath}
                  content={post.content}
                  isLiked= {post.likes[userId] || false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
