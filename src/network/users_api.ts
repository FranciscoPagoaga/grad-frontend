import { User } from "../models/user";
import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { PostModel } from "../models/post";

//User related Functions
export async function fetchUser(
  userId: string,
  token: string | null
): Promise<User> {
  const response = await axios.get(`/api/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export interface LoginCredentials {
  user: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export async function login(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  return await axios
    .post("/api/auth/login", credentials)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        const errorMessage = error.response.data.error;
        throw new UnauthorizedError(errorMessage);
      } else {
        throw Error(error);
      }
    });
}

export async function signUp(user: FormData): Promise<User> {
  return await axios
    .post("/api/auth/signup", user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      const errorMessage = error.response.data.error;
      if (error.response.status === 409) {
        throw new ConflictError(errorMessage);
      } else {
        throw Error(error);
      }
    });
}

//Post related Functions
export async function createPost(
  post: FormData,
  token: string | null
): Promise<User> {
  return await axios
    .post("/api/posts/", post, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw Error(error);
    });
}

export async function fetchFeed(
  userId: string,
  token: string | null
): Promise<PostModel[]> {
  const response = await axios.get(`/api/posts/${userId}/feed`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function likePost(
  userId: string,
  postId: string,
  token: string | null
): Promise<PostModel> {
  const response = await axios.patch(
    `/api/posts/${postId}/like`,
    { userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

export async function updateUser(user: FormData): Promise<User> {
  return await axios
    .post("/api/auth/signup", user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      const errorMessage = error.response.data.error;
      if (error.response.status === 409) {
        throw new ConflictError(errorMessage);
      } else {
        throw Error(error);
      }
    });
}