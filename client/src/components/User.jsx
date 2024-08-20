import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { axiosInstance } from "../authentication/AuthProvider";
import useAuth from "../authentication/useAuth";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const User = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    axiosInstance
      .get("user/info")
      .then((res) => {
        setUser(res.data.username);
        setEmail(res.data.email);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [auth]);

  return (
    <Sheet className="text-white">
      <SheetTrigger asChild>
        <div className="fixed flex flex-col justify-center items-center w-full">
          <Button variant="outline" className="p-10 text-2xl">Menu</Button>
        </div>
      </SheetTrigger>
      <>
        {success ? (
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetTitle>{user}</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
              <div>{email}</div>
            </SheetHeader>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        ) : (
          <SheetContent>
            <SheetHeader>
              <SheetTitle>User is not logged in</SheetTitle>
              <SheetDescription>
                Make changes to your profile here.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Close Menu</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        )}
      </>
    </Sheet>
  );
};

export default User;
