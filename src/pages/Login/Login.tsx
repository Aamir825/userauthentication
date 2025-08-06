import GoogleSigninButtons from "../../components/GoogleSigninButton/GoogleSigninButton"
import type { AuthField } from "../../Types"
import AuthForm from "../../components/AuthForm/AuthForm";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../../schemas/LoginSchema";
import type { LoginSchemaType } from "../../schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {

  
  const { handleSubmit, register, formState: {errors}} = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema)})

  const fields: AuthField[] = [
    { label: "username", name: "username", type: "text", },
    { label: "password", name: "password", type: "password", }
  ]

  const handleLogin = (data: LoginSchemaType) => {
    console.log("User Credentials ", data);
  }
  
  return (
    <div>
      <AuthForm title="Login Form" fields={fields} onSubmit={handleSubmit(handleLogin)} register={register} errors={errors} buttonText="Login" googlebtn={<GoogleSigninButtons/>}/>
    </div>
  )
}

export default Login
