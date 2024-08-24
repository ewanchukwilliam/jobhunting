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
import {FaHome}from "react-icons/fa"
const Menu = () => {
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
        setUser("");
        setEmail("");
        setSuccess(false);
      });
  }, [auth]);
  return (
    <Sheet className="text-white">
      <div className="fixed flex flex-col justify-end h-screen items-center w-full pointer-events-none z-50">
        <SheetTrigger asChild>
          <Button variant="outline" className="group flex flex-row justify-between items-between  p-3 px-4 hover:bg-accent-hover hover:w-[275px] transition-all duration-200 mb-20 text-3xl h-auto w-[250px] bg-accent z-50 pointer-events-auto border-none">
						<FaHome className="text-accent bg-white rounded-full p-2 min-w-14 min-h-14 text-6xl group-hover:scale-110 transition-transform transform duration-300"/>
						<div className="w-full flex flex-col items-center justify-center tracking-tight">Menu</div>
          </Button>
        </SheetTrigger>
      </div>
      <>
        {success && !auth?.logout ? (
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
                <Button type="submit" variant="outline">
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        ) : (
          <SheetContent>
            <SheetHeader>
              <SheetTitle>User is not logged in</SheetTitle>
              <SheetDescription></SheetDescription>
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

export default Menu;
