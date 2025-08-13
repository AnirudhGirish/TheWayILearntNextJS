'use client'
import { useState, useEffect } from 'react';
import { newFormSchema } from '@/schemas/newForm.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Razorpay from 'razorpay';

export default function MembershipForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState('');
  const [message, setMessage] = useState("");
  const [numberExists, setNumberExists] = useState(true);
  const [pass, setPass] = useState("");
  const [year, setYear] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ resolver: zodResolver(newFormSchema) });

  useEffect(() => {
    setMessage("");
    setNumberExists(true);
    const checkUserUnique = async ()=> {
      if(phoneNumber.length === 10){
        try {
          const checkUser = async () => {
            const res = await fetch(`/api/check-user?number=${phoneNumber}`);
            const data = await res.json();
            if(data.success === true){
              setNumberExists(false)
            }
            setMessage(data.message);
          };
          checkUser();
        } catch (error) {
          setError("User uniqueness check failed")
        } finally{
          setNumberExists(true);
          setMessage("");
        }
      }
    }

    checkUserUnique();
  }, [phoneNumber]);

  // useEffect(() => {
  //   setTransactionId("test_transaction_12345");  // ✅ Hardcoded transaction ID
  // }, []);

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   script.async = true;
  //   script.onload = () => console.log("Razorpay SDK Loaded Successfully");
  //   script.onerror = () => setError("Failed to load Razorpay. Please check your internet connection.");
  //   document.body.appendChild(script);
  // }, []);
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = resolve;
      script.onerror = () => setError("Failed to load Razorpay. Please check your internet connection.");
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (!data.success || !data.order_id) {
        setError("Order creation failed. Please try again.");
        return;
      }
      setOrderId(data.order_id);

      // if (!window.Razorpay) {
      //   setError("Razorpay SDK failed to load. Please refresh and try again. before");
      //   return;
      // }
      await loadRazorpay();
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'NVPSA Membership',
        order_id: data.order_id,
        handler: async function (response) {
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            setTransactionId(verifyData.transaction_id);
            setPaymentCompleted(true);
            setError("");
          } else {
            setError('Payment verification failed. Please try again.');
          }
        },
      };
      if (!window.Razorpay) {
        setError("Razorpay SDK failed to load. Please refresh and try again. after");
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError('Error initiating payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!transactionId) {
      setError('Please complete the payment before submitting.');
      return;
    }
  
    const finalData = { ...data, transaction: transactionId };
    if (!finalData.transaction || finalData.transaction.trim() === '') {
      setError('Please complete the payment before submitting.');
      return;
    }
    
    try {
      setLoading(true);
      const res = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });
      const result = await res.json();
      if (result.success) {
        window.location.href = '/success';
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-300 p-6 shadow-md rounded-lg">
    <div className="bg-blue-200 shadow-lg rounded-lg p-8 w-full max-w-lg">
      <h2 className="text-2xl font-medium text-black text-center">Past Students Association</h2>
      <h2 className="text-xl font-medium text-black text-center mb-6">NV Society, GLB 2025</h2>
      <h2 className="text-xl font-medium text-black text-center mb-6">New Membership Form</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700" htmlFor="name">Name <span className='text-md text-red-600'>*</span></label>
              <input id='name' type="text" {...register("name")} placeholder='Enter your full name' className="w-full p-2 border rounded-lg mt-1 text-zinc-700" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
              <label htmlFor='address' className="block text-lg font-medium text-gray-700">Address <span className='text-md text-red-600'>*</span></label>
              <input id='address' type="text" {...register("address")} placeholder='Enter your residential address' className="w-full p-2 border rounded-lg mt-1 text-zinc-700" />
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>
          <div className="mb-4">
              <label htmlFor='number' className="block text-lg font-medium text-gray-700">Phone Number <span className='text-md text-red-600'>*</span></label>
              <input
                id='number'
                type="text"
                {...register("number", { valueAsNumber: true })}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                placeholder='Enter your contact number'
                className="w-full p-2 border rounded-lg mt-1 text-zinc-700"
              />
              {errors.number && <p className="text-red-500 text-sm">{errors.number.message}</p>}
             {message && numberExists && <p className="text-red-500">{message}</p>} 
             {message && !numberExists && <p className="text-green-500">{message}</p>} 
          </ div>
          <div className="mb-4">
              <label htmlFor='email' className="block text-lg font-medium text-gray-700">Email</label>
              <input id='email' type="email" {...register("email")} placeholder='Enter your email address' className="w-full p-2 border rounded-lg mt-1 text-zinc-700" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
              <label htmlFor='aadhar' className="block text-lg font-medium text-gray-700">Aadhar Number</label>
              <input
                id='aadhar'
                type="text"
                {...register("aadhar")}
                onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
                placeholder='Enter your 12 digit Aadhar Number'
                className="w-full p-2 border rounded-lg mt-1 text-zinc-700"
              />
              {errors.aadhar && <p className="text-red-500 text-sm">{errors.aadhar.message}</p>}
          </div>
          <div className="mb-4">
              <label htmlFor='pass' className="block text-lg font-medium text-gray-700">Last Attended Program At NV</label>
              <select
                id='pass'
                className="w-full p-2 border rounded-lg mt-1 text-zinc-700"
                {...register("pass")}
                onChange={(e) => setPass(e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="SSLC">SSLC</option>
                <option value="PUC">PUC</option>
                <option value="Degree">Degree</option>
                <option value="Others">Others</option>
              </select>
              {errors.pass && <p className="text-red-500 text-sm">{errors.pass.message}</p>}
          </div>
          <div className="mb-4">
              <label htmlFor='year' className="block text-lg font-medium text-gray-700">Year</label>
              <select
                id='year'
                className="w-full p-2 border rounded-lg mt-1 text-zinc-700"
                {...register("year")}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">-- Select Year --</option>
                {[...Array(86)].map((_, i) => {
                  const year = 1940 + i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
          </div>

          <div className="mb-4">
              <label htmlFor='transaction' className="block text-lg font-medium text-gray-700">Transaction ID</label>
              <input id='transaction' type="text" {...register("transaction")} disabled={true} value={transactionId} placeholder='Transaction ID will appear here' className="w-full p-2 border rounded-lg mt-1 text-zinc-700" />
              {errors.transaction && <p className="text-red-500 text-sm">{errors.transaction.message}</p>}
          </div>

          <button
            type="button"
            onClick={handlePayment}
            className="w-full bg-blue-600 text-white py-3 my-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer disabled:opacity-50"
            disabled={loading || numberExists}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>    
              
          <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 my-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer disabled:opacity-50"
          disabled={loading || !transactionId}
          >
          {loading ? 'Submitting...' : 'Submit'}
          </button>

        </form>
    </div>
    </div>
  );
}