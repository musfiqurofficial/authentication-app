import { useState } from "react";
import {
  Button,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import googleLogo from "../assets/google.png";
import { useGoogleAuth } from "../context/Context";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log("Registration response:", data);

      if (response.ok) {
        console.log("Registration successful. Token:", data.token);

        // Reset the form
        setUsername("");
        setEmail("");
        setPassword("");

        // Save the token to local storage
        localStorage.setItem("token", data.token);

        // Navigate to '/'
        // (You can replace this with your own navigation logic)
        window.location.href = "/";
      } else {
        console.error("Registration failed:", data.error);
        setErrorMessage(data.error); // Set error message for display
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("Error during registration. Please try again.");
    }
  };

  const { handleGoogleLogin } = useGoogleAuth();


  return (
    <>
      <CardBody className="flex flex-col gap-3">
        {errorMessage && (
          <p className="text-center" style={{ color: "red" }}>
            {errorMessage}
          </p>
        )}
        <Typography variant="h4" color="blue-gray" className="text-center">
          Sign up
        </Typography>

        <Typography className="-mb-2" variant="h6">
          User Name
        </Typography>
        <Input
          label="User Name"
          size="lg"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Typography className="-mb-2" variant="h6">
          Email
        </Typography>
        <Input
          label="Email"
          size="lg"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Typography className="-mb-2" variant="h6">
          Password
        </Typography>
        <Input
          label="Password"
          size="lg"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" onClick={handleRegister} fullWidth>
          Sign up
        </Button>
        <Typography
          className="my-1 text-[16px] font-semibold text-center"
          variant="h5"
        >
          or
        </Typography>
        <Button
          variant="gradient"
          className="flex justify-center items-center gap-6"
          onClick={handleGoogleLogin}
          fullWidth
        >
          <img src={googleLogo} className="w-6 h-auto" alt="" />
          Continue with Google
        </Button>
      </CardFooter>
    </>
  );
};

export default Register;
