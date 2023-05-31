import React, { ChangeEvent, useState } from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import * as UsersApi from "../network/users_api";
import { User } from "../models/user";
import * as Options from "../utils/options";
import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import Dropzone from "react-dropzone";

interface modalProps {
  onDismiss: () => void;
  // onSignUpSuccesful: (user: User) => void;
}

const CreateUser = ({ onDismiss }: modalProps) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErroMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // interface UserInput{
  //   [key: string]: any;
  // }

  async function onSubmit(input: Record<string, any>) {
    try {
      const data = new FormData();
      let pictureName = "";
      for (const [key, value] of Object.entries(input)) {
        if (key === "picture") {
          if (value[0] !== undefined) {
            const pictureFile = value[0] as File;
            pictureName = pictureFile.name;
            data.append(key, pictureFile);
          }
        } else {
          data.append(key, value);
        }
      }
      data.append("picturePath", pictureName);

      // for (const value in input){
      //   data.append(value, input[value]);
      // }

      await UsersApi.signUp(data);
      
      onDismiss();
    } catch (error) {
      if (error instanceof ConflictError) {
        setHasError(true);
        setErroMessage(error.message);
      }
    }
  }

  return (
    <>
      <div className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <form id="addUserForm" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">Create Account</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onDismiss}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <Input
                  label="Name"
                  type="text"
                  placeholder="John Doe"
                  name="name"
                  register={register}
                  options={Options.optionName}
                />
                {errors.name && (
                  <p className="text-xs italic text-red-500 pb-5">
                    {errors.name.message}
                  </p>
                )}

                <Input
                  label="Email"
                  type="email"
                  placeholder="name@email.com"
                  name="email"
                  register={register}
                  options={Options.optionEmail}
                />
                {errors.email && (
                  <p className="text-xs italic text-red-500 pb-5">
                    {errors.email.message}
                  </p>
                )}

                <Input
                  label="User"
                  type="text"
                  placeholder="Username"
                  name="user"
                  register={register}
                  options={Options.optionUserName}
                />
                {errors.user && (
                  <p className="text-xs italic text-red-500 pb-5">
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
                  <p className="text-xs italic text-red-500 pb-5">
                    {errors.password.message}
                  </p>
                )}
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Upload file
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  {...register("picture")}
                  type="file"
                />
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  SVG, PNG, JPG or GIF
                </p>
                {hasError && (
                  <p className="text-xs italic text-red-500 pb-5">
                    {errorMessage}
                  </p>
                )}
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={onDismiss}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default CreateUser;
