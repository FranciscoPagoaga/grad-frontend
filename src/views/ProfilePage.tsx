import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../models/user";
import { usersState } from "../state";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const { userId } = useParams();
  const token: string | null = useSelector((state: usersState) => state.token);
  
  async function getUser(){
    console.log()
  }

  return <div>ProfilePage</div>;
};

export default ProfilePage;
