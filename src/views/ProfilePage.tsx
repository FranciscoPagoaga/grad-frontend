import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { User } from "../models/user";
import { usersState } from "../state";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import { fetchUserByName, getUserPosts } from "../network/users_api";
import { PostModel } from "../models/post";
import Post from "../components/Post";

const ProfilePage = () => {
  const sessionUser: User | null = useSelector(
    (state: usersState) => state.user
  );
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<PostModel[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { userId } = useParams();
  const token: string | null = useSelector((state: usersState) => state.token);

  async function fetchData() {
    const responseUser = await fetchUserByName(userId || "", token);
    setUser(responseUser);
    setIsLoading(false);
    const responsePost = await getUserPosts(responseUser._id || "", token);
    setPosts(responsePost);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <Navbar />
      <div className="flex flex-row py-8 pt-8 gap-16 justify-center">
        <div className="basis-1/4 h-fit">
          {isLoading ? <p>Loading...</p> : <Profile userId={user?._id} />}
        </div>
        <div className="basis-2/5 overflow-auto max-h-96">
          {posts
            ? posts.map((post, i) => (
                <div className="pb-5" key={i}>
                  <Post
                    postUserId={post.userId}
                    userId={user?._id}
                    postId={post._id}
                    name={post.name}
                    user={post.user}
                    userProfilePicture={post.userPicturePath}
                    content={post.content}
                    isLiked={post.likes[sessionUser?._id || ""] || false}
                    likes={Object.keys(post.likes).length}
                    isPagePost={false}
                    rate={post?.rating[user?._id || ""] || 0}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
