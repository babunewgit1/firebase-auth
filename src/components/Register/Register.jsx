import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Register = () => {
  const [show, setShow] = useState(true);
  const { signUpWithMail, updateUser, sendingMail } = useContext(UserContext);

  const handelRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;

    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      toast.error("Password must have 2 uppercase");
      return;
    }

    signUpWithMail(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateUser(name)
          .then((user) => {})
          .catch((error) => {
            console.error(error.message);
          });
        console.log(user);
        form.reset();
        sendingMail().then(() => {});
        toast.success("Registration Successfull!! please verify your email");
      })
      .catch((error) => {
        console.error(error.message);
        toast.error(error.message);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Please Register now!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handelRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
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
                name="password"
                autoComplete="off"
                placeholder="password"
                className="input input-bordered"
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
                <Link
                  to="/login"
                  className="label-text-alt text-primary link link-hover"
                >
                  Old user ? please Login
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
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

export default Register;
