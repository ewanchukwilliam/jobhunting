import {
    ButtonTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

import { Input } from "../components/ui/input";
import { Label } from "recharts";
import { Button } from "../components/ui/button";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { FaSignInAlt } from "react-icons/fa";

const LoginUser = ({buttonProps,IconComponent}) => {
  const { auth, setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user passwords =>",user, pwd);
    const userData = {
      username: user,
      password: pwd,
    };
    axios
      .post("auth/login_user", userData)
      .then((res) => {
        console.log(res?.data?.message);
        const token = res?.data?.accessToken;
        console.log(JSON.stringify({ user, pwd, token }));
        setAuth({ user, pwd, token });
        setUser("");
        setPassword("");
      })
      .catch((err) => {
        // console.log(err);
        console.log(err.response?.data.message);
        if (err.response?.status === 400) {
          setErrMsg("User does not exist");
        } else if (err.response?.status === 401) {
          setErrMsg("Incorrect password");
        } else {
          setErrMsg("Unknown error has occurred");
        }
        if (errRef?.current) {
          errRef.current.focus();
        }
      });
  };
  return (
    <>
      {auth?.user ? (
				<></>
      ) : (
        <Dialog>
          <ButtonTrigger
            buttonProps={buttonProps}
            IconComponent={IconComponent}
          >
					Login
          </ButtonTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <p
              ref={errRef}
              className={
                errMsg
                  ? "text-white/70 bg-gray-800 rounded-3xl p-5 m-3"
                  : "offscreen" 
              }
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Returning Users</DialogTitle>
                <DialogDescription>
                  Enter your Username and Password
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <h3 className="text-muted-foreground text-sm">Username</h3>
                  <Label htmlFor="username" className="text-right">
                    username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    ref={userRef}
                    autoComplete="on"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    placeholder="willybingbong"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h3 className="text-muted-foreground text-sm">Password</h3>
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="on"
                    onChange={(e) => setPassword(e.target.value)}
                    value={pwd}
                    required
                    placeholder="pass123!"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" variant="outline" className="flex flex-row justify-center items-center gap-2">
										<FaSignInAlt />
                  Login
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default LoginUser;
