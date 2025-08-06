import { useClerk } from "@clerk/clerk-react";
import { SiBlockchaindotcom } from "react-icons/si";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Header = () => {
  const { signOut } = useClerk();
  return (
    <div className=" py-4 bg-white shadow-sm flex justify-around">
      <div>
        <SiBlockchaindotcom size={34} className=" text-blue-500" />
      </div>
      <div>
        <Link to={"/login"}><button onClick={() => signOut()} className=" border border-gray-300 px-8 py-1 rounded-md shadow-md flex items-center gap-2 cursor-pointer">Logout <RiLogoutCircleLine className=" text-blue-500" /></button></Link>
      </div>
    </div>
  )
}

export default Header