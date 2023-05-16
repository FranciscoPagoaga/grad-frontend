import { createSlice } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { PostModel } from "../models/post";

export interface usersState {
  user: User | null;
  token: string | null;
  posts: PostModel[];
}

const initialState = {
  user: null,
  token: null,
  posts: [],
} as usersState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setUser:(state, action) => {
      state.user = action.payload.user;
    },
    setFollowing: (state, action) => {
      if (state.user) {
        state.user.following = action.payload.following;
      } else {
        console.error("User following non-existent");
      }
    },
    setFollowers: (state, action) => {
      if (state.user) {
        state.user.followers = action.payload.followers;
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const {setLogin, setLogout, setUser, setFollowers, setFollowing, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;