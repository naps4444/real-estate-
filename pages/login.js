"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react"; // Assuming you're using next-auth for Google login
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signinError, setSigninError] = useState("");

  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (res.ok) {
        setLoading(false);
        setSigninError("");

        // Set Cookies
        Cookies.set("userId", responseData.user.id);
        Cookies.set("userName", responseData.user.firstname);
        Cookies.set("lastName", responseData.user.lastname);
        Cookies.set("userEmail", responseData.user.email);
        Cookies.set("token", responseData.token, {
          expires: data.rememberMe ? 7 : 1,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        // Success toast notification
        toast.success("Login successful!");

        // Redirect to homepage using next/router
        router.push("/"); // This replaces window.location.href
        reset();
      } else {
        setLoading(false);
        setSigninError(responseData.message);
        toast.error(responseData.message || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("An error occurred during login:", error);
      setSigninError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex items-center">
      <div className="lg:w-6/12 container">
        {/* Mobile View Logo */}
        <div className="lg:hidden flex justify-center mt-14 items-center gap-2">
          <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#4BA586]">
            <Image src="/bhp.png" width={25} height={25} alt="logo" />
          </div>
          <h1 className="text-[22px] font-bold">BetaHouse</h1>
        </div>

        <div className="w-10/12 px-[12px] mx-auto py-12">
          <h1 className="font-bold text-[26px] text-center lg:text-left">
            Welcome Back to BetaHouse!
          </h1>
          <p className="mt-5 lg:mt-0">
            Let's get started by filling out the information below
          </p>

          {signinError && <p className="text-red-500 mt-4">{signinError}</p>}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="flex flex-col gap-1 w-full mt-6">
              <label className="font-semibold">Email</label>
              <input
                type="email"
                className="border-[#DEDFE0] border-2 rounded p-3"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your Email"
              />
              {errors.email && (
                <p className="text-red-500 mt-4">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1 w-full mt-6">
              <label className="font-semibold">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="border-[#DEDFE0] border-2 rounded p-3 w-full"
                  {...register("password", { required: "Password is required" })}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 mt-4">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" {...register("rememberMe")} />
                <p className="font-semibold">Remember Me</p>
              </div>
              <a href="#" className="text-red-500">
                Forgot Password
              </a>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col gap-3 mt-8">
              <button
                type="submit"
                className={`bg-[#3D9970] text-white w-full py-3 rounded-lg ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>

              {/* Divider */}
              <div className="flex gap-5">
                <div className="bg-gradient-to-r from-[white] to-[black] h-[0.5px] w-6/12 mt-3"></div>
                <p>or</p>
                <div className="bg-gradient-to-r from-[black] to-[white] h-[0.5px] w-6/12 mt-3"></div>
              </div>
            </div>
          </form>

          {/* Google Sign In */}
          <button
            onClick={() => {
              signIn("google", { callbackUrl: "/", redirect: true })
                .then(() => router.push("/"))
                .catch((error) => {
                  console.error("Google sign-in failed:", error);
                });
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg mt-4 border-[1px] border-black"
          >
            <Image src="/g.svg" width={20} height={20} alt="gmail icon" />
            <p>Continue with Google</p>
          </button>

          {/* Sign Up Redirect */}
          <div className="flex gap-2 justify-center mt-8 items-center">
            <p>New User?</p>
            <a href="/signup" className="text-[#3D9970]">
              Sign Up
            </a>
          </div>
        </div>
      </div>

      {/* Desktop View Background */}
      <div className="hidden lg:block w-6/12 bg-[url('/sign.svg')] bg-cover bg-center h-[920px]">
        <div className="flex items-center gap-2 mt-14 ml-10">
          <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#4BA586]">
            <Image src="/bhp.png" width={25} height={25} alt="logo" />
          </div>
          <h1 className="text-[22px] text-white font-bold">BetaHouse</h1>
        </div>
      </div>

      {/* ToastContainer */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Login;
