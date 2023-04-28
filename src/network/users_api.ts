import { User } from "../models/user";
import axios, { Axios, AxiosError } from "axios";
import { ConflictError, UnauthorizedError } from "../errors/http_errors";

export async function fetchUsers(): Promise<User> {
  try {
    const response = await axios.get("/api/users");
    return response.data;
  } catch (error) {
    const errorMessage =
      typeof error === "string" ? error : "An error occurred.";
    throw new Error(errorMessage);
  }
}

export interface LoginCredentials {
  user: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  return await axios.post("/api/users/login", credentials).then((response) => {
    return response.data;
  }).catch((error) => {
    if (error.response.status === 401) {
      const errorMessage = error.response.data.error;
      throw new UnauthorizedError(errorMessage);
    } else {
      throw Error(error);
    }
  });
}

export interface UserInput {
  name: string;
  email: string;
  user: string;
  password: string;
  biography?: string;
  profilephoto: string;
}

export async function signUp(user: UserInput): Promise<User> {
  return await axios
    .post("/api/users/signup", user)
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
