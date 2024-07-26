"use client";

import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
import Postings from "./Postings";

const Header = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0, duration: 0.4, ease: "easeIn" },
      }}
    >
      <Postings />
      <div class="gap-2 text-lg flex flex-col items-center lg:flex-row justify-center  lg:justify-between lg:items-end py-6">
        <h3 class="text-5xl font-semibold">Applications</h3>
        <div class="h-5 p-20 flex flex-col justify-center items-center  bg-gray-700 rounded-full">
          <p>Total applied</p>
          <CountUp
            end={data.length}
            duration={5}
            delay={1}
            className="text-7xl font-bold"
          />
        </div>
        <div className="flex items-center gap-2">
          <Link
            class="h-max rounded-full font-extrabold shadow-black bg-green-600 shadow-lg hover:-translate-y-2 transition px-8 py-5 mx-3"
            to="/create"
          >
            New Application
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Create</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Account</DialogTitle>
                <DialogDescription>
                  Enter your information below
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <h3 className="text-muted-foreground text-sm">Username</h3>
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h3 className="text-muted-foreground text-sm">Email</h3>
                  <Label htmlFor="email" className="text-right">
                    email
                  </Label>
                  <Input
                    id="email"
                    placeholder="me@example.com"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h3 className="text-muted-foreground text-sm">Password</h3>
                  <Label htmlFor="password" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" variant="outline">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
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
                    id="name"
                    placeholder="@peduarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <h3 className="text-muted-foreground text-sm">Password</h3>
                  <Label htmlFor="password" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" variant="outline">
                  Login
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
