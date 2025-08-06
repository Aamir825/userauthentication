import { useUser } from "@clerk/clerk-react";
import { LuUserRound } from "react-icons/lu";
const Home = () => {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "No email found";
  return (
    <div>
      <h1 className="text-8xl leading-tight font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#AB8C95] via-[#000000] to-[#8E97C5]">Welcome</h1>
      <div className=" flex items-center gap-3 bg-blue-100 px-4 py-2 rounded-2xl">
        <div className=" bg-blue-200 p-2 rounded-full border border-white shadow-md">
          <LuUserRound className="" size={30} />
        </div>
        <h1 className=" text-2xl">{email}</h1>
      </div>
    </div>
  )
}

export default Home