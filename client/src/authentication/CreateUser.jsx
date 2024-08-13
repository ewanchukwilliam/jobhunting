"use client";

import {
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
import { faCheck, faInfoCircle, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const USER_REGEX = /^[a-zA-Z][a-z-A-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const CreateUser = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
   //console.log(result);
   //console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
   //console.log(result);
   //console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
   //console.log(result);
   //console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = USER_REGEX.test(user);
    const pass = PWD_REGEX.test(pwd);
    const emailcheck = EMAIL_REGEX.test(email);
    if (!name || !pass || !emailcheck) {
      setErrMsg("Invalid entry");
    }
    // setSuccess(true);
    const userData = { username: user, password: pwd, email: email };
   //console.log(`${user}, ${pwd}, ${email}`);
    axios
      .post("/create_user", userData)
      .then((res) => {
        console.log(res);
        console.log(JSON.stringify(res));
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        if (!err.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 409) {
          setErrMsg("Username Already Taken");
        } else if (err.response?.status === 408) {
          setErrMsg("Email Already Taken");
        } else {
          setErrMsg("Registration Failed");
        }
        console.log(err.response);
        if (errRef.current) {
          errRef.current.focus();
        }
      });
  };
  return (
    <>
      {success ? (
        <div>Success!</div>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <p
                ref={errRef}
                className={
                  errMsg
                    ? "text-white/70 bg-gray-800 rounded-3xl p-5 m-3"
                    : "offscreen text-white"
                }
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <DialogHeader>
                <DialogTitle>Create Account</DialogTitle>
                <DialogDescription>
                  Enter your information below
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <h3 className="text-muted-foreground text-sm flex gap-3 justify-between">
                    Username
                    <span className={validName ? "block" : "hidden"}>
                      <FontAwesomeIcon className="text-accent" icon={faCheck} />
                    </span>
                    <span className={validName || !user ? "hidden" : "block"}>
                      <FontAwesomeIcon className="text-red-500" icon={faX} />
                    </span>
                  </h3>
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? false : false}
                    aria-describedby="uidnote-username"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    placeholder="usename123!"
                    className="col-span-3"
                  />
                </div>
                <p
                  id="uidnote-username"
                  className={
                    userFocus && user && !validName ? "block" : "hidden"
                  }
                >
                  <div className="text-white/70 bg-gray-800 rounded-3xl p-2">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4-24 characters. <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens allowed. <br />
                  </div>
                </p>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h3 className="text-muted-foreground text-sm flex gap-3 justify-between">
                    Email
                    <span className={validEmail ? "block" : "hidden"}>
                      <FontAwesomeIcon className="text-accent" icon={faCheck} />
                    </span>
                    <span className={validEmail || !email ? "hidden" : "block"}>
                      <FontAwesomeIcon className="text-red-500" icon={faX} />
                    </span>
                  </h3>
                  <Label htmlFor="email" className="text-right">
                    email
                  </Label>
                  <Input
                    type="text"
                    id="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={validEmail ? false : true}
                    aria-describedby="uidnote-email"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    placeholder="example@gmail.com"
                    className="col-span-3"
                  />
                </div>
                <p
                  id="uidnote-email"
                  className={
                    emailFocus && email && !validEmail ? "block" : "hidden"
                  }
                >
                  <div className="text-white/70 bg-gray-800 rounded-3xl p-2">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must be a valid Email format
                  </div>
                </p>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h3 className="text-muted-foreground text-sm flex gap-3 justify-between">
                    Password
                    <span className={validPwd ? "block" : "hidden"}>
                      <FontAwesomeIcon className="text-accent" icon={faCheck} />
                    </span>
                    <span className={validPwd || !pwd ? "hidden" : "block"}>
                      <FontAwesomeIcon className="text-red-500" icon={faX} />
                    </span>
                  </h3>
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="off"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? false : true}
                    aria-describedby="uidnote-password"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    placeholder="password123!"
                    className="col-span-3"
                  />
                </div>
                <p
                  id="uidnote-password"
                  className={pwdFocus && pwd && !validPwd ? "block" : "hidden"}
                >
                  <div className="text-white/70 bg-gray-800 rounded-3xl p-2">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4-24 characters. <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens allowed. <br />
                  </div>
                </p>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h3 className="text-muted-foreground text-sm flex gap-3 justify-between">
                    Confirm Password
                    <span
                      className={validMatch && validPwd ? "block" : "hidden"}
                    >
                      <FontAwesomeIcon className="text-accent" icon={faCheck} />
                    </span>
                    <span
                      className={validMatch || !matchPwd ? "hidden" : "block"}
                    >
                      <FontAwesomeIcon className="text-red-500" icon={faX} />
                    </span>
                  </h3>
                  <Label htmlFor="confirm" className="text-right">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm"
                    type="password"
                    autoComplete="off"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? false : true}
                    aria-describedby="uidnote-match"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    placeholder="password123!"
                    className="col-span-3"
                  />
                </div>
                <p
                  id="uidnote-match"
                  className={matchFocus && !validMatch ? "block" : "hidden"}
                >
                  <div className="text-white/70 bg-gray-800 rounded-3xl p-2">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Passwords do not match
                    <br />
                  </div>
                </p>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={
                    !validName || !validEmail || !validPwd ? true : false
                  }
                  variant="outline"
                >
                  Create
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CreateUser;
