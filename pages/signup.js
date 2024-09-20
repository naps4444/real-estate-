import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/signup', { email, password, name });
      setMessage(data.message);
      setEmail('');
      setPassword('');
      setName('');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <>
    <div className='flex items-center'>

      <div className='lg:w-6/12 container'>

      <div className="lg:hidden  flex justify-center mt-14 items-center gap-2">
              <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#4BA586]">
                <Image src="/bh.svg" width={25} height={25} alt="logo" />
              </div>
              <h1 className="text-[22px] font-bold">BetaHouse</h1>
            </div>


      <div className='w-10/12 px-[12px] mx-auto py-12'>
        <div>
          <h1 className='font-bold text-[26px] text-center lg:text-left'>Join our community of home seekers and explore the possibilities that await. </h1>
          <p className='mt-5 lg:mt-0'>Lets get started by filling out the information below</p>
        </div>

        <form>
          <div className='flex flex-col lg:flex-row justify-between mt-6'>
            <div className='flex flex-col gap-1 lg:w-6/12'>
              <label className='font-semibold'>First Name</label>
              <input type='text' className='border-[#DEDFE0] border-2 rounded p-3' placeholder='Enter Name'/>
            </div>
            <div className='flex flex-col gap-1 lg:w-5/12'>
              <label className='font-semibold'>Last name</label>
              <input type='text' className='border-[#DEDFE0] border-2 rounded p-3' placeholder='Enter Name'/>
            </div>
          </div>

          <div className='flex flex-col gap-1 w-full mt-6'>
            <label className='font-semibold'>Email</label>
            <input type='email' className='border-[#DEDFE0] border-2 rounded p-3' placeholder='Enter your Email'/>
          </div>

          <div className='flex flex-col gap-1 w-full mt-6'>
            <label className='font-semibold'>Password</label>
            <input type='password' className='border-[#DEDFE0] border-2 rounded p-3' placeholder='Enter your password'/>
          </div>

          <div className='flex flex-col gap-1 w-full mt-6'>
            <label className='font-semibold'>Confirm password</label>
            <input type='password' className='border-[#DEDFE0] border-2 rounded p-3' placeholder='Confirm your password'/>
          </div>

          <div className='flex items-center gap-2 mt-4'>
            <input type='checkbox' className='bg-green-500'/>
            <p className='font-semibold'>I agree to <span className='text-[#3D9970]'>Terms of Service</span> and <span className='text-[#3D9970]'>Privacy Policies</span></p>
          </div>

          <div className='flex flex-col gap-3 mt-8'>
            <button className='bg-[#3D9970] text-white w-full py-3 rounded-lg'>
            Sign up
            </button>

            <div className='flex gap-5'>
            <div class="bg-gradient-to-r from-[white] to-[black] h-[0.5px] w-6/12 mt-3"></div>

            <p>or</p>

            <div class="bg-gradient-to-r from-[black] to-[white] h-[0.5px] w-6/12 mt-3"></div>
            
            </div>

            <button className='w-full flex items-center justify-center gap-2 py-3 rounded-lg border-[1px] border-black'>
              <Image src="/g.svg" width={20} height={20} alt='gmail icon' />
              <p>Continue with Google</p>
            </button>

            <div className='flex gap-2 justify-center items-center'>
              <p>Already have an account?</p> <a href='/login' className='text-[#3D9970]'>Sign in</a>
            </div>
          </div>
        </form>
      </div>
      </div>


      <div className="hidden lg:block w-6/12 bg-[url('/sign.svg')] bg-cover bg-center h-[920px]">
      
      <div className="flex items-center gap-2 mt-14 ml-10">
              <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#4BA586]">
                <Image src="/bh.svg" width={25} height={25} alt="logo" />
              </div>
              <h1 className="text-[22px] text-white font-bold">BetaHouse</h1>
            </div>
      </div>


    </div>
    
    </>
  );
}
