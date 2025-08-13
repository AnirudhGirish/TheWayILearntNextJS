'use client'
import React, { useState } from 'react';
import axios from 'axios';  
import Link from 'next/link';
import {toast, Toaster} from  'react-hot-toast'
import { useRouter } from 'next/navigation';


export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/userinfo");
      console.log(response);
      setData(response.data.data._id);
    } catch (error:any) {
      console.log(`Error fetching user details: ${error.message}`);
      toast.error(error.message);
    }
  }

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response.data);
      console.log("Logout successfull");
      toast.success("Logout success");
      router.replace("/login");
    } catch (error:any) {
      console.log(`Error logging out: ${error.message}`);
      toast.error(error.message);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className=' flex flex-col border-solid border-white border-2 p-6 rounded-lg'>
        <h1 className='text-4xl  pb-2 tracking-wide text-stone-400'>Profile Page</h1>
        <hr className=' pb-4 ' />
        <h2 className='text-yellow-200'>{data === "nothing" ? "Nothing fetched" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <hr className=' mt-4'/>
        <button className='mt-4 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-gray-700' onClick={getUserDetails}>Get Profile</button>
        <button className='mt-4 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-gray-700' onClick={logout}>Logout</button>
        <Toaster/>
      </div>
    </div>
  )
}