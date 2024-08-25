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
import {
  FaUserCog,
  FaEnvelope,
  FaHome,
  FaRegUserCircle,
  FaUsers,
  FaWpforms,
  FaSignOutAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import UserMenu from "../authentication/UserMenu";

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
          <Button
            variant="outline"
            className="group flex flex-row justify-between items-between  p-3 px-4 hover:bg-accent-hover hover:w-[275px] transition-all duration-200 mb-20 text-3xl h-auto w-[250px] bg-accent z-50 pointer-events-auto border-none"
          >
            <FaHome className="text-accent bg-white rounded-full p-2 min-w-14 min-h-14 text-6xl group-hover:scale-110 transition-transform transform duration-300" />
            <div className="w-full flex flex-col items-center justify-center tracking-tight">
              Menu
            </div>
          </Button>
        </SheetTrigger>
      </div>
      <>
        {success && !auth?.logout ? (
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <div className="flex flex-row font-normal gap-3 items-center text-center mx-4 mt-4 mb-2 text-2xl tracking-tight">
                  <FaRegUserCircle className="text-accent" />
                  {user}
                </div>
                <div className="flex font-thin flex-row gap-3 items-center text-center mx-5 text-lg text-white/70">
                  <FaEnvelope className="text-accent" />
                  {email}
                </div>
              </SheetTitle>
              <div className="border-b w-full border-accent text-2xl tracking-tight pb-1">
                Navigation
              </div>
              <Button
                variant="outline"
                className="hover:bg-accent bg-transparent group border-none w-full flex justify-start px-10 text-lg gap-2"
              >
                <FaHome className="text-accent group-hover:text-white" />
                <Link className="" to={`/`}>
                  Home
                </Link>
              </Button>
              <Button
                variant="outline"
                className="hover:bg-accent bg-transparent group border-none w-full flex justify-start px-10 text-lg gap-2"
              >
                <FaWpforms className="text-accent group-hover:text-white" />
                <Link className="group-focus" to={`/Create`}>
                  Create Application
                </Link>
              </Button>
              <div className="border-b w-full border-accent text-2xl tracking-tight pb-1">
                User
              </div>
              <Button
                variant="outline"
                className="hover:bg-accent group bg-transparent border-none w-full flex justify-start px-10 text-lg gap-2"
              >
                <FaUsers className="text-accent group-hover:text-white" />
                <UserMenu />
              </Button>
              <Button
                variant="outline"
                className="hover:bg-accent bg-transparent group border-none w-full flex justify-start px-10 text-lg gap-2"
              >
                <FaUserCog className="text-accent group-hover:text-white" />
                <Link className="" to={`/Home`}>
                  Account Settings
                </Link>
              </Button>
              <Button
                variant="outline"
                className="hover:bg-accent bg-transparent group border-none w-full flex justify-start px-10 text-lg gap-2"
              >
                <FaSignOutAlt className="text-accent group-hover:text-white" />
                <Link className="" to={`/Home`}>
                  Sign Out
                </Link>
              </Button>
            </SheetHeader>
            <SheetFooter>
              <SheetClose variant="outline" asChild>
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
                <Button type="submit" variant="outline">
                  Close Menu
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        )}
      </>
    </Sheet>
  );
};

export default Menu;
