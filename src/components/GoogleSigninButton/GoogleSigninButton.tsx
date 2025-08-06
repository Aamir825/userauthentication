import { useSignIn } from "@clerk/clerk-react"

const GoogleSigninButtons = () => {
  const { signIn } = useSignIn();

  const handleGoogleSignIn = async () => {
    try {
      await signIn?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/", // your redirect after success
        redirectUrlComplete: "/", // optional fallback
      });
    } catch (err) {
      console.error("Google sign-in error:", err);
    }
  };

  return (
    <button type="button" onClick={handleGoogleSignIn} className=" w-full flex items-center gap-4 my-3 justify-center py-2 px-12 border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer">
      Sign in with Google
      <img src="/images/google.png" className="w-6 h-6"/>
    </button>
  );
}

export default GoogleSigninButtons