import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useAuth } from "@/context/AuthContext"; // Import the AuthContext

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false); // "Remember Me" checkbox state
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();
  const { login } = useAuth(); // Get login function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true); // Start loading

    // Basic validation
    if (!email || !password) {
      setError('All fields are required');
      setLoading(false); // Stop loading if validation fails
      return;
    }

    try {
      // Fetching from '/api/auth/manual-login' endpoint
      const res = await fetch('/api/auth/manual-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // Handle the response
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token based on "Remember Me" checkbox state
      if (isChecked) {
        localStorage.setItem('token', data.token); // Persist the token in localStorage
      } else {
        sessionStorage.setItem('token', data.token); // Store the token in sessionStorage
      }

      // Use the login function from AuthContext
      login({ email, token: data.token });

      setMessage('Login successful');
      setLoading(false); // Stop loading after successful login

      // Redirect to homepage
      router.push('/');
    } catch (err) {
      setError(err.message || 'Login failed');
      setLoading(false); // Stop loading on error
      console.error('Login error:', err);
    }
  };

  return (
    <div className='flex items-center'>
      <div className='lg:w-6/12 container'>
        {/* Mobile View Logo */}
        <div className="lg:hidden flex justify-center mt-14 items-center gap-2">
          <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#4BA586]">
            <Image src="/bhp.png" width={25} height={25} alt="logo" />
          </div>
          <h1 className="text-[22px] font-bold">BetaHouse</h1>
        </div>

        <div className='w-10/12 px-[12px] mx-auto py-12'>
          <div>
            <h1 className='font-bold text-[26px] text-center lg:text-left'>
              Welcome Back to BetaHouse!
            </h1>
            <p className='mt-5 lg:mt-0'>
              Let's get started by filling out the information below
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && <p className='text-red-500 mt-4'>{error}</p>}
            {message && <p className='text-green-500 mt-4'>{message}</p>}

            <div className='flex flex-col gap-1 w-full mt-6'>
              <label className='font-semibold'>Email</label>
              <input
                type='email'
                className='border-[#DEDFE0] border-2 rounded p-3'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your Email'
                required
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
                required
              />
            </div>

            <div className='flex items-center justify-between mt-4'>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)} // Toggle checkbox state
                />
                <p className='font-semibold'>Remember Me</p>
              </div>
              <a href='#' className='text-red-500'>Forgot Password</a>
            </div>

            <div className='flex flex-col gap-3 mt-8'>
              <button
                type='submit'
                className={`bg-[#3D9970] text-white w-full py-3 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading} // Disable the button during loading
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>

              <div className='flex gap-5'>
                <div className="bg-gradient-to-r from-[white] to-[black] h-[0.5px] w-6/12 mt-3"></div>
                <p>or</p>
                <div className="bg-gradient-to-r from-[black] to-[white] h-[0.5px] w-6/12 mt-3"></div>
              </div>
            </div>
          </form>

          <button
            onClick={() => {
              signIn("google").then(() => {
                router.push('/'); 
              });
            }}
            className='w-full flex items-center justify-center gap-2 py-3 rounded-lg mt-4 border-[1px] border-black'
            disabled={loading}
          >
            <Image src="/g.svg" width={20} height={20} alt='gmail icon' />
            <p>Continue with Google</p>
          </button>

          <div className='flex gap-2 justify-center mt-8 items-center'>
            <p>New User?</p>
            <a href='/signup' className='text-[#3D9970]'>Sign Up</a>
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
    </div>
  );
}
