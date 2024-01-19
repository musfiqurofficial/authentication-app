/* eslint-disable react/prop-types */

import {
  Button,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useState } from "react";
import googleLogo from "../assets/google.png"
import { useGoogleAuth } from "../context/Context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        // Login successful, you can handle success as needed
        const data = await response.json();
        console.log("Login successful. Token:", data.token);

        // Reset the form
        setEmail("");
        setPassword("");

        // Save the token to local storage
        localStorage.setItem("token", data.token);

        // Navigate to '/'
        // (You can replace this with your own navigation logic)
        window.location.href = "/";
      } else {
        // Login failed, handle errors
        const data = await response.json();
        console.error("Login failed:", data.message);
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Error during login. Please try again.");
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
          Sign In
        </Typography>
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
        <div className="-ml-2.5 -mt-3">
          <Checkbox label="Remember Me" />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" onClick={handleLogin} fullWidth>
          Sign In
        </Button>
        <Typography className="my-1 text-[16px] font-semibold text-center" variant="h5">
          or
        </Typography>
        <Button variant="gradient" onClick={handleGoogleLogin} className="flex justify-center items-center gap-6" fullWidth>
          <img src={googleLogo} className="w-6 h-auto" alt="" />
          Continue with Google
        </Button>
      </CardFooter>
    </>
  );
};

export default Login;
