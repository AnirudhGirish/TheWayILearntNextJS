'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, {Toaster} from 'react-hot-toast';
import React, { useEffect, useState } from 'react';

export default function LoginPage() {

  const [user, setUser] = useState({
    email:"", password:""
  });

  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false);
    }
    else if(user.email.length <= 0 || user.password.length <= 0){
      setButtonDisabled(true);
    }
  },[user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login",user);
      console.log("Login success", response.data);
      router.push("/profile");
    } catch (error:any) {
      console.log("Signup failed");
      toast.error(error.message);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className=' flex flex-col border-solid border-white border-2 p-6 rounded-lg'>
      <h1 className='text-4xl  pb-2 tracking-wide text-stone-400'>{loading ? "Processing" : "Login"}</h1>
      <hr className=' pb-4 ' />

      <label htmlFor="email">Email ID</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='email' 
        value={user.email} 
        type='email' 
        onChange={(e)=>{return setUser({...user, email: e.target.value})}} 
        placeholder='email'/>

      <label htmlFor="password">Password</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='password' 
        value={user.password} 
        type='password' 
        onChange={(e)=>{return setUser({...user, password: e.target.value})}} 
        placeholder='password'/>

      <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-gray-700' onClick={onLogin} disabled={loading || buttonDisabled}>
        {buttonDisabled ? "Please fill the details" : "Click to Login"}
      </button>

      <Link href="/signup" className='text-center hover:text-gray-400'>Visit Sign Up Page</Link>
      </div>
      <Toaster/>
    </div>
  )
}