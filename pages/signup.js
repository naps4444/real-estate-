"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from 'next-auth/react';
import { ThreeDots } from 'react-loader-spinner';

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password
      };

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const responseData = await res.json();
      setLoading(false);

      if (res.status === 409) {
        setFormError("User already exists");
        toast.error("Email already exists.");
      } else if (res.ok) {
        toast.success("Registration Successful");
        reset();
        setFormError("");
        Cookies.set("lastName", responseData.user.lastname);
        router.push('/login');
      } else {
        console.error("User registration failed", responseData);
        setFormError("Registration failed. Please try again.");
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.log(error, "Something went wrong");
      setFormError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const loader = (
    <div className='flex justify-center items-center'>
      <ThreeDots
  visible={true}
  height="25"
  width="50"
  color="white"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
  );

  const password = watch("password");

  return (
    <>
      <div className='flex items-center'>
        <ToastContainer />
        <div className='lg:w-6/12 container'>
          <div className="lg:hidden flex justify-center mt-14 items-center gap-2">
            <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#4BA586]">
              <Image src="/bhp.png" width={25} height={25} alt="logo" />
            </div>
            <h1 className="text-[22px] font-bold">BetaHouse</h1>
          </div>

          <div className='w-10/12 px-[12px] mx-auto py-12'>
            <h1 className='font-bold text-[26px] text-center lg:text-left'>
              Join our community of home seekers and explore the possibilities that await.
            </h1>
            <p className='mt-5 lg:mt-0'>Let's get started by filling out the information below</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {formError && <p className='text-red-500 mt-4'>{formError}</p>}

              <div className='flex flex-col lg:flex-row justify-between mt-6'>
                <div className='flex flex-col gap-1 lg:w-6/12'>
                  <label className='font-semibold'>First Name</label>
                  <input
                    type='text'
                    className='border-[#DEDFE0] border-2 rounded p-3'
                    {...register('firstname', { required: true })}
                    placeholder='Enter First Name'
                  />
                  {errors.firstname && <span className="text-red-500">First name is required</span>}
                </div>
                <div className='flex flex-col gap-1 mt-6 lg:mt-0 lg:w-5/12'>
                  <label className='font-semibold'>Last Name</label>
                  <input
                    type='text'
                    className='border-[#DEDFE0] border-2 rounded p-3'
                    {...register('lastname', { required: true })}
                    placeholder='Enter Last Name'
                  />
                  {errors.lastname && <span className="text-red-500">Last name is required</span>}
                </div>
              </div>

              <div className='flex flex-col gap-1 w-full mt-6'>
                <label className='font-semibold'>Email</label>
                <input
                  type='email'
                  className='border-[#DEDFE0] border-2 rounded p-3'
                  {...register('email', { required: true })}
                  placeholder='Enter your Email'
                />
                {errors.email && <span className="text-red-500">Email is required</span>}
              </div>

              <div className='flex flex-col gap-1 w-full mt-6'>
                <label className='font-semibold'>Password</label>
                <input
                  type='password'
                  className='border-[#DEDFE0] border-2 rounded p-3'
                  {...register('password', { required: true })}
                  placeholder='Enter your password'
                />
                {errors.password && <span className="text-red-500">Password is required</span>}
              </div>

              <div className='flex flex-col gap-1 w-full mt-6'>
                <label className='font-semibold'>Confirm password</label>
                <input
                  type='password'
                  className='border-[#DEDFE0] border-2 rounded p-3'
                  {...register('confirmPassword', { 
                    required: true, 
                    validate: value => value === password || "Passwords do not match"
                  })}
                  placeholder='Confirm your password'
                />
                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
              </div>

              <div className='flex items-center gap-2 mt-4'>
                <input
                  type='checkbox'
                  className='bg-green-500'
                  {...register('terms', { required: true })}
                />
                <p className='font-semibold'>
                  I agree to <span className='text-[#3D9970]'>Terms of Service</span> and{' '}
                  <span className='text-[#3D9970]'>Privacy Policies</span>
                </p>
                {errors.terms && <span className="text-red-500">You must accept the terms</span>}
              </div>

              <div className='flex flex-col gap-3 mt-8'>
                <button type="submit" className='bg-[#3D9970] text-white w-full py-3 rounded-lg' disabled={loading}>
                  {loading ? loader : 'Sign up'}
                </button>

                <div className='flex gap-5'>
                  <div className="bg-gradient-to-r from-[white] to-[black] h-[0.5px] w-6/12 mt-3"></div>
                  <p>or</p>
                  <div className="bg-gradient-to-r from-[black] to-[white] h-[0.5px] w-6/12 mt-3"></div>
                </div>
              </div>
            </form>

            <button onClick={() => {
              signIn("google", { callbackUrl: "/", redirect: true }).then(() => {
                router.push('/');
              });
            }} className='w-full flex items-center justify-center gap-2 py-3 rounded-lg mt-4 border-[1px] border-black'>
              <Image src="/g.svg" width={20} height={20} alt='gmail icon' />
              <p>Continue with Google</p>
            </button>

            <div className='flex gap-2 justify-center mt-8 items-center'>
              <p>Already have an account?</p> <a href='/login' className='text-[#3D9970]'>Sign in</a>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-6/12 bg-[url('/sign.svg')] bg-cover bg-center h-[920px]">
          <div className="flex items-center gap-2 mt-14 ml-10">
            <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#4BA586]">
              <Image src="/bhp.png" width={25} height={25} alt="logo" />
            </div>
            <h1 className="text-[22px] text-white font-bold">BetaHouse</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
