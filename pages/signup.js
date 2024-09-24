import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Import useRouter
import { signIn } from "next-auth/react";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Basic validation
    if (!email || !password || !name || !lastName || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!isChecked) {
      setError('You must agree to the Terms of Service and Privacy Policies');
      return;
    }

    try {
      const { data } = await axios.post('/api/signup', { email, password, name, lastName });
      setMessage(data.message);
      // Clear input fields
      setEmail('');
      setPassword('');
      setName('');
      setLastName('');
      setConfirmPassword('');
      setIsChecked(false); // Reset checkbox after submission
      // Redirect to login page after successful signup
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <>
      <div className='flex items-center'>
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

            <form onSubmit={handleSubmit}>
              {error && <p className='text-red-500 mt-4'>{error}</p>}
              {message && <p className='text-green-500 mt-4'>{message}</p>}

              <div className='flex flex-col lg:flex-row justify-between mt-6'>
                <div className='flex flex-col gap-1 lg:w-6/12'>
                  <label className='font-semibold'>First Name</label>
                  <input
                    type='text'
                    className='border-[#DEDFE0] border-2 rounded p-3'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter Name'
                  />
                </div>
                <div className='flex flex-col gap-1 lg:w-5/12'>
                  <label className='font-semibold'>Last Name</label>
                  <input
                    type='text'
                    className='border-[#DEDFE0] border-2 rounded p-3'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder='Enter Last Name'
                  />
                </div>
              </div>

              <div className='flex flex-col gap-1 w-full mt-6'>
                <label className='font-semibold'>Email</label>
                <input
                  type='email'
                  className='border-[#DEDFE0] border-2 rounded p-3'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your Email'
                />
              </div>

              <div className='flex flex-col gap-1 w-full mt-6'>
                <label className='font-semibold'>Password</label>
                <input
                  type='password'
                  className='border-[#DEDFE0] border-2 rounded p-3'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter your password'
                />
              </div>

              <div className='flex flex-col gap-1 w-full mt-6'>
                <label className='font-semibold'>Confirm password</label>
                <input
                  type='password'
                  className='border-[#DEDFE0] border-2 rounded p-3'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='Confirm your password'
                />
              </div>

              <div className='flex items-center gap-2 mt-4'>
                <input
                  type='checkbox'
                  className='bg-green-500'
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)} // Toggle checkbox state
                />
                <p className='font-semibold'>
                  I agree to <span className='text-[#3D9970]'>Terms of Service</span> and{' '}
                  <span className='text-[#3D9970]'>Privacy Policies</span>
                </p>
              </div>

              <div className='flex flex-col gap-3 mt-8'>
                <button className='bg-[#3D9970] text-white w-full py-3 rounded-lg'>
                  Sign up
                </button>

                <div className='flex gap-5'>
                  <div className="bg-gradient-to-r from-[white] to-[black] h-[0.5px] w-6/12 mt-3"></div>
                  <p>or</p>
                  <div className="bg-gradient-to-r from-[black] to-[white] h-[0.5px] w-6/12 mt-3"></div>
                </div>
              </div>

            </form>

            <button onClick={() => {
              signIn("google", { redirect: true }).then(() => {
                // After the sign-in is complete, redirect to home
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
}
