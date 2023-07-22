import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { User } from "../models/user";
import { useSelector } from "react-redux";
import { usersState } from "../state";
import Profile from "../components/Profile";
import Post from "../components/Post";
import { useParams } from "react-router-dom";
import { getPost } from "../network/users_api";
import { PostModel } from "../models/post";

const PostPage = () => {
  const { postId } = useParams();
  const token: string | null = useSelector((state: usersState) => state.token);
  const user: User | null = useSelector((state: usersState) => state.user);
  const [post, setPost] = useState<PostModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  let userId = "";


  if (user) {
    userId = user._id;
  }

  async function fetchPost() {
    const response = await getPost(postId || "", token);
    setPost(response);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <Navbar />
      <div className="flex flex-row mt-4 gap-16 justify-center">
        <div className="basis-1/4 h-fit">
          <Profile userId={userId} />
        </div>
        <div className="basis-2/5">
          <div className="mt-2 overflow-y-auto  max-h-96">
            {isLoading? <span>Loading...</span> : <Post
              postUserId={post?.userId}
              userId={userId}
              postId={postId || ""}
              name={post?.name || ""}
              user={post?.user || ""}
              userProfilePicture={post?.userPicturePath || ""}
              content={post?.content || ""}
              isLiked={post?.likes[userId] || false}
              likes={Object.keys(post?.likes || "").length}
              isPagePost={true}
              rate={post?.rating[userId] || 0}
            />}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
