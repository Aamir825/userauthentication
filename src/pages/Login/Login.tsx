import GoogleSigninButtons from "../../components/GoogleSigninButton/GoogleSigninButton"
import type { AuthField } from "../../Types"
import AuthForm from "../../components/AuthForm/AuthForm";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../../schemas/LoginSchema";
import type { LoginSchemaType } from "../../schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { LuUserRound } from "react-icons/lu";
import { CiUnlock } from "react-icons/ci";

const Login = () => {

  
  const { handleSubmit, register, formState: {errors}} = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema)})
  const { isLoaded, signIn, setActive } = useSignIn();
  const [ loading, setLoading ] = useState<boolean>(false);
  const navigate = useNavigate();

  const fields: AuthField[] = [
    { label: "username", name: "email", placeholder: "username", icon: <LuUserRound/>, type: "text", },
    { label: "password", name: "password", placeholder: "password", icon: <CiUnlock/>, type: "password", }
  ]

  const handleLogin = async(data: LoginSchemaType) => {
    if (!isLoaded) return;
        
    try {
      setLoading(true)
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Login Successfull!");
        navigate("/");
      } else {
        console.log("Login incomplete:", result);
      }
    } catch (err: any) {
      console.error("Login failed:", err.errors?.[0]?.message || err.message);
      toast.error(err.errors?.[0]?.message || err.message);
    }finally{
      setLoading(false);
    }
  }
  
  return (
    <div className=" flex justify-center items-center h-screen bg-[#fcfcfc]">
      <AuthForm title="Login Form" fields={fields} onSubmit={handleSubmit(handleLogin)} register={register} errors={errors} buttonText="Login" loading={loading} googlebtn={<GoogleSigninButtons/>} accLink={<>Don't have an account? <Link to="/signup" className="text-blue-500 font-bold">Signup</Link></>}/>
    </div>
  )
}

export default Login
