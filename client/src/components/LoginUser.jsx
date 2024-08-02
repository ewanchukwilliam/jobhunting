"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Input } from "./ui/input";
import { Label } from "recharts";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const LoginUser = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

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
    console.log(user, pwd);
    const userData = {
      username: user,
      password: pwd,
    };
    setUser("");
    setPassword("");
		setSuccess(true)
    axios
      .post("/login_user", userData)
      .then((res) => {
        console.log(res);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {success ? (
        <h1>You are Logged in!</h1>
      ) : (
        <Dialog>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <DialogTrigger asChild>
            <Button variant="outline">Login</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
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
                <Button type="submit" variant="outline">
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
