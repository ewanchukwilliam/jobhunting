import axios from "axios";
import { Button } from "./ui/button";

const GimmeCookie = () => {
  const gimmecookie = async (e) => {
    e.preventDefault();
    const payload = {
      username: "ewanchukwilliam",
      password: "Penisbutt123!"
    };
    axios
      .post("/auth", payload)
      .then((res) => {
        console.log("cookie recieved!" + res.data.cookie);
      })
      .catch((err) => {
        console.log("unknown cookie error" + err.response?.message);
      });
  };
  return <Button onClick={gimmecookie}>Gimme Cookie</Button>;
};

export default GimmeCookie;
