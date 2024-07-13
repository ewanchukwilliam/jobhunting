"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0, duration: 0.4, ease: "easeIn" },
      }}
    >
      <div class="gap-2 text-lg min-w-screen py-10 px-5 flex flex-col lg:flex-row justify-between items-center my-3 ">
        <a href="https://www.ewanchukwilliam.com" className="transition-all hover:text-accent">Authors Portfolio!</a>
        <Drawer>
          <DrawerTrigger className="hover:text-accent transition-all">Contact Author</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Contact Information</DrawerTitle>
              <DrawerDescription>Personal Email: ewanchukwilliam@gmail.com</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </motion.div>
  );
};

export default Footer;
