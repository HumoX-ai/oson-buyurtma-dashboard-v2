import { getUserInfo } from "@/lib/data";
import { cookies } from "next/headers";
import React from "react";

export default async function Profile() {
  const token = cookies().get("access_token")?.value as string;
  const getUser = await getUserInfo(token);

  return (
    <div>
      <h1>Profile</h1>
      <p>{getUser?.name}</p>
      <p>{getUser?.phone}</p>
      <p>{getUser?.role}</p>
    </div>
  );
}
