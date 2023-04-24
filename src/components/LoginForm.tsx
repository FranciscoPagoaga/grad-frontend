import React, { useState, FormEvent, ChangeEvent } from "react";
import Input from "./Input";
import Button from "./Button";
import CreateUser from "./CreateUser";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // TODO: Implement authentication logic
  };

  return (
    <div className="max-w-md mx-auto mt-8 flex-start bg-gray-100 p-5 rounded-md">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-medium text-gray-700">
          Log in to your account
        </h2>
        <Input
          label="Email address"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <h3 className="text-xs font-medium text-blue-600 hover:underline cursor-pointer " onClick={() => setShowModal(true)}>Create an account</h3>
        {showModal ? <CreateUser setShowModal={setShowModal} /> : null}
        <Button>Log in</Button>
      </form>
    </div>
  );
};

export default LoginForm;
