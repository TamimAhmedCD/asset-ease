import { Button } from "@mui/material";
import useAuth from "../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { VscGithubInverted } from "react-icons/vsc";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const navigate = useNavigate()
  const { signInWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic()

  const handleGoogleLoginN = () => {
    signInWithGoogle().then((result) => {
      const user = result.user;
      navigate("/dashboard");
    });
  };

  return (
    <div>
      <div className="flex gap-5">
        <Button
          onClick={handleGoogleLoginN}
          variant="outlined"
          fullWidth
          className="focus:ring-0  font-normal border-gray-600 flex items-center justify-center gap-2 normal-case text-base"
        >
          <FcGoogle /> Google
        </Button>
        <Button
          variant="outlined"
          fullWidth
          className="focus:ring-0  font-normal border-gray-600 flex items-center justify-center gap-2 normal-case text-base"
        >
          <VscGithubInverted /> Github
        </Button>
      </div>
    </div>
  );
};

export default SocialLogin;
