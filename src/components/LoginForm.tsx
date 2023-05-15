import React, { useState, FormEvent, ChangeEvent } from "react";
import Input from "./Input";
import Button from "./Button";
import CreateUser from "./CreateUser";
import { useForm } from "react-hook-form";
import { LoginCredentials } from "../network/users_api";
import * as UsersApi from "../network/users_api";
import * as Options from "../utils/options";
import { UnauthorizedError } from "../errors/http_errors";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit(credentials: LoginCredentials) {
    setHasError(false);
    try {
      console.log(credentials);
      const loggedIn = await UsersApi.login(credentials);
      alert("logged in");
      if(loggedIn){
        dispatch(setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        }))
      }
      navigate("/home");
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setHasError(true);
        setErrorMessage(error.message);
      }
    }
  }

  return (
    <div className=" h-96 mx-auto  flex-start bg-gray-100 p-5 rounded-l-lg">
      {showModal ? <CreateUser onDismiss={() => setShowModal(false)} /> : null}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-3xl font-medium text-gray-700">
          Log in to your account
        </h2>
        <Input
          label="User"
          type="text"
          placeholder="Username"
          name="user"
          register={register}
          options={Options.optionUserName}
        />
        {errors.user && (
          <p className="text-xs italic text-red-500 pb-1">
            {errors.user.message}
          </p>
        )}
        <Input
          label="Password"
          type="password"
          placeholder="***************"
          name="password"
          register={register}
          options={Options.optionPassword}
        />
        {errors.password && (
          <p className="text-xs italic text-red-500 pb-1">
            {errors.password.message}
          </p>
        )}
          {hasError && (
            <p className="text-xs italic text-red-500">{errorMessage}</p>
          )}
        <h3
          className="text-xs font-medium text-blue-600 hover:underline cursor-pointer "
          onClick={() => setShowModal(true)}
        >
          Create an account
        </h3>
        <Button type="submit">Log in</Button>
      </form>
    </div>
  );
};

export default LoginForm;
