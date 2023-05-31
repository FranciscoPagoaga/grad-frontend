import { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  let userId = "";


  if (user) {
    userId = user._id;
  }

  const posts: PostModel[] | null = useSelector(
    (state: usersState) => state.posts
  );

  async function loadFeed() {
    const response = await fetchFeed(user?._id || "", token);
    dispatch(setPosts({ posts: response }));
    setIsLoading(false);
  }

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <Navbar />
      <div className="flex flex-row mt-4 gap-16 justify-center">
        <div className="basis-1/4 h-fit">
          <Profile userId={user?._id} />
        </div>
        <div className="basis-2/5">
          <CreatePost />
          <div className="mt-2 overflow-y-auto  max-h-96">
            {isLoading? <span>Loading...</span> : posts !== null ? (posts.map((post, i) => (
              <div key={i} className="pb-5">
                <Post
                  postUserId={post.userId}
                  userId={user?._id}
                  postId={post._id}
                  name={post.name}
                  user={post.user}
                  userProfilePicture={post.userPicturePath}
                  content={post.content}
                  isLiked={post.likes[userId] || false}
                  likes={Object.keys(post.likes).length}
                  isPagePost={false}
                  rate={post.rating[user?._id || ""] || 0}
                />
              </div>
            ))):null}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
