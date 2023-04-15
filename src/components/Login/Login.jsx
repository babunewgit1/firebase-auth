import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Login = () => {
  const emailRef = useRef("");
  const [show, setShow] = useState(true);

  const { loginWithMail, resetPass } = useContext(UserContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginWithMail(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        form.reset();
        toast.success("Login Successfull");
      })
      .catch((error) => {
        console.error(error.message);
        toast.error(error.message);
      });
  };

  const handelReset = () => {
    const currentEmail = emailRef.current.value;
    if (!currentEmail) {
      toast.error("Please provide email");
    }
    resetPass(currentEmail)
      .then(() => {
        toast.success("Password reset link has send in your mail");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Please Login now!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={show ? "password" : "text"}
                placeholder="password"
                name="password"
                autoComplete="off"
                className="input input-bordered pr-10"
              />
              <span
                onClick={() => setShow(!show)}
                className="cursor-pointer absolute right-3 top-[52px]"
              >
                {show ? (
                  <EyeIcon className="h-4 w-4 text-blue-500" />
                ) : (
                  <EyeSlashIcon className="h-4 w-4 text-blue-500" />
                )}
              </span>
              <label className="label">
                <span
                  onClick={handelReset}
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </span>
              </label>
              <label className="label">
                <Link
                  to="/register"
                  className="label-text-alt text-primary link link-hover"
                >
                  New user ? please Register
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <Toaster />
      </div>
    </div>
  );
};

export default Login;
