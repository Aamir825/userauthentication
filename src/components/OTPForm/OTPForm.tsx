import { useSignUp } from "@clerk/clerk-react";
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const OTPForm = () => {

  const { signUp, setActive, isLoaded } = useSignUp();
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if current input has a value
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {

    e.preventDefault();
    const code = otp.join("");
    if (!isLoaded) return;
    try {
      setLoading(true);
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      // Set active session after verification
      await setActive({ session: completeSignUp.createdSessionId });
      navigate("/");
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid OTP. Try again.");
    } finally {
      setLoading(false)
    }

  };

  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" bg-white px-4 py-10 rounded-lg w-sm shadow-md border-t-6 border-gray-300 text-center">
        <h1 className=" text-xl font-bold">OTP Verification</h1>
        <p className=" text-sm tracking-wide">Enter the 4-Digit verification code that was <br /> sent to your email.</p>
        <form action="" onSubmit={handleVerify}>
          <div className=" grid grid-cols-6 gap-3 my-4">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                ref={(el) => { inputsRef.current[i] = el }}
                maxLength={1}
                inputMode="numeric"
                type="text"
                onKeyDown={(e) => handleKeyDown(e, i)}
                onChange={(e) => handleChange(e.target.value, i)}
                className=" border border-gray-400 text-center text-lg font-bold rounded-md p-1 outline-none" />
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button disabled={loading} className="w-full py-2 px-12 border-none bg-blue-600 text-white mt-2 cursor-pointer flex justify-center items-center gap-4">Verify OTP {loading && <Loader />}</button>
        </form>
      </div>
    </div>
  )
}

export default OTPForm