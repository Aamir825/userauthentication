import type { AuthField } from "../../Types"
import AuthForm from "../../components/AuthForm/AuthForm"
import GoogleSigninButtons from "../../components/GoogleSigninButton/GoogleSigninButton"
import { useForm } from "react-hook-form"
import { SignupSchema, type SignupSchemaType } from "../../schemas/SignupSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSignUp } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"

const Signup = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<SignupSchemaType>({ resolver: zodResolver(SignupSchema) })
  const { isLoaded, signUp } = useSignUp();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignup = async (data: SignupSchemaType) => {

    if (!isLoaded) return;
    try {
      setLoading(true);
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });
      // Optional: send verification email if needed
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      localStorage.setItem("authEmail", data.email);
      toast.success("User created successfully!");
      console.log("Signup success:", result);
      navigate("/OTPForm");
      // Redirect or show "Check your email" message
    } catch (err: any) {
      console.error("Signup error:", err.errors?.[0]?.message || err.message);
      toast.error(err.errors?.[0]?.message || err.message);
    }finally{
      setLoading(false);
    }

  };

  const fields: AuthField[] = [
    { label: "username", name: "username", type: "text" },
    { label: "email", name: "email", type: "email" },
    { label: "password", name: "password", type: "password" },
    { label: "confirmPassword", name: "confirmPassword", type: "password" }
  ]

  return (
    <div className=" flex justify-center items-center h-screen">
      <AuthForm title="Signup Form" fields={fields} onSubmit={handleSubmit(handleSignup)} register={register} errors={errors} buttonText="Signup" loading={loading} googlebtn={<GoogleSigninButtons />} />
    </div>
  )
}

export default Signup