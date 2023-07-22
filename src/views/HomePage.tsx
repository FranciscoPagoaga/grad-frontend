import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { usersState, setPosts } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../models/user";
import { fetchFeed, getRecommendedPosts, getPost } from "../network/users_api";
import { PostModel } from "../models/post";

const HomePage = () => {
  const dispatch = useDispatch();
  const token: string | null = useSelector((state: usersState) => state.token);
  const user: User | null = useSelector((state: usersState) => state.user);
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(true);
  const [isLoadingRecPosts, setIsLoadingRecPosts] = useState<boolean>(true);
  const [isLoadingCombinedPosts, setIsLoadingCombinedPosts] = useState<boolean>(true);
  let userId = "";
  const [recPosts, setRecPosts] = useState<PostModel[]>([]);
  const [combinedPosts, setCombinedPosts] = useState<PostModel[]>([]);

  const posts: PostModel[] | null = useSelector(
    (state: usersState) => state.posts
  );

  if (user) {
    userId = user._id;
  }

  async function loadRecommendedPosts() {
    const response = await getRecommendedPosts(userId);
    const tmpPosts: PostModel[] = [];
    response.map(async (postId) => {
      const response = await getPost(postId, token);
      tmpPosts.push(response);
    });
    setRecPosts(tmpPosts);
    setIsLoadingRecPosts(false);
  }

  async function loadFeed() {
    const response = await fetchFeed(user?._id || "", token);
    dispatch(setPosts({ posts: response }));
    setIsLoadingPosts(false);
  }

  async function combinePosts() {
    if (!isLoadingPosts && !isLoadingRecPosts) {
      const tmpArray: PostModel[] = [];
      if (posts !== null) {
        let i = 1;
        await Promise.all([posts, recPosts]).then(([postsData, recPostsData]) => {
          postsData.map((post) => {
            const pos = (i) / 3;
            console.log(i)
            if ((i) % 3 === 0 && pos < recPostsData.length) {
              i+=1;
              tmpArray.push(recPostsData[pos]);
            }
            tmpArray.push(post);
            i+=1;
          });
        });
        setCombinedPosts(tmpArray);
        setIsLoadingCombinedPosts(false);
      }
    }
  }

  useEffect(() => {
    loadFeed();
    loadRecommendedPosts();
    combinePosts();
  }, [isLoadingPosts, isLoadingRecPosts]);

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
            {isLoadingCombinedPosts ? (
              <span>Loading...</span>
            ) : posts !== null && posts.length > 0 ? (
              combinedPosts.map((post, i) => (
                <div key={post.content} className="pb-5">
                  <Post
                    postUserId={post.userId}
                    userId={userId}
                    postId={post._id}
                    name={post.name}
                    user={post.user}
                    userProfilePicture={post.userPicturePath}
                    content={post.content}
                    isLiked={post.likes[userId] || false}
                    likes={Object.keys(post.likes).length}
                    isPagePost={false}
                    rate={post.rating[userId] || 0}
                    isRecommended={(i + 1) % 3 === 0}
                  />
                </div>
              ))
            ) : (
              recPosts.map((post, i) => (
                <div key={post.content} className="pb-5">
                  <Post
                    postUserId={post.userId}
                    userId={userId}
                    postId={post._id}
                    name={post.name}
                    user={post.user}
                    userProfilePicture={post.userPicturePath}
                    content={post.content}
                    isLiked={post.likes[userId] || false}
                    likes={Object.keys(post.likes).length}
                    isPagePost={false}
                    rate={post.rating[userId] || 0}
                    isRecommended={true}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;