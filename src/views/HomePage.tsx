import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import CreatePost from "../components/CreatePost";
import Button from "../components/Button";
import Post from "../components/Post";
import { usersState, setPosts } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../models/user";
import { fetchFeed } from "../network/users_api";
import { PostModel } from "../models/post";
import UpdateUser from "../components/UpdateUser";

const HomePage = () => {
  const dispatch = useDispatch();
  const token: string | null = useSelector((state: usersState) => state.token);
  const user: User | null = useSelector((state: usersState) => state.user);
  let userId =  "";
  const [showModal, setShowModal] = useState<boolean>(false);

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
    <div className="bg-gray-100">
      {showModal ? <UpdateUser onDismiss={() => setShowModal(false)} /> : null}
      <Navbar />
      <div className="flex flex-row h-screen p-8 gap-16 justify-center">
        <div className="basis-1/4 h-fit">
          <Profile userId={user?._id} />
        </div>
        <div className="basis-2/5">
          <CreatePost />
          <div className="pt-10">
            {posts.map((post) => (
              <div className="pb-5">
                <Post
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
