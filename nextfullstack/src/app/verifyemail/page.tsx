'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function VerifyEmailPage() {
  // const router = useRouter(); // for using next ot extract url token
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(()=>{
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || ""); //using core JS

    //using NextJS
    // const {query} = router;
    // const urlToken = query.token;
  })

  // useEffect(()=>{
  //   setError(false);
  //   if(token.length > 0){
  //     verifyUserEmail();
  //   }
  // },[token]);

  const toVerify = async () =>{
    setError(false);
    if(token.length > 0){
      verifyUserEmail();
    }
  }

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", {token});
      setVerified(true);
      setError(false);
    } catch (error:any) {
      setError(true);
      console.log(`Error senfing verification: ${error.response.data}`);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl  pb-2 tracking-wide text-stone-400'>Verify Email</h1>
      <button onClick={toVerify}>Click to verify</button>
      <h2 className='p-2 bg-orange-200 text-black'>{token? `${token}` : "No Token"}</h2>
      {verified && (
        <div>
          <h2>Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>Error</h2>
        </div>
      )}
    </div>
  )
}