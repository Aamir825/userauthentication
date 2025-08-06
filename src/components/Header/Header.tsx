import { SiBlockchaindotcom } from "react-icons/si";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" py-4 bg-white shadow-sm flex justify-around">
      <div>
        <SiBlockchaindotcom size={34} className=" text-blue-500"/>
      </div>
      <div>
        <Link to={"/login"}><button className=" border border-gray-300 px-8 py-1 rounded-md shadow-md">Logout</button></Link>
      </div>
    </div>
  )
}

export default Header