'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/schemas/form.schema';
import { useRouter } from 'next/navigation';

export default function FormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(formSchema) });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [pass, setPass] = useState("");
  const [year, setYear] = useState("");

  const onSubmit = async (data) => {
    try {
      setErrorMessage(null);
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Submission failed');
      }
      
      router.push('/success');
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-300 p-6 shadow-md rounded-lg">
      <div className="bg-blue-200 shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-medium text-black text-center">Past Students Association</h2>
        <h2 className="text-xl font-medium text-black text-center mb-6">NV Society, GLB 2025</h2>
        <h2 className="text-xl font-medium text-black text-center mb-6">Life Member Data Update</h2>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Name <span className='text-md text-red-600'>*</span></label>
                <input type="text" {...register("name")} placeholder='Enter your full name' className="w-full p-2 border rounded-lg mt-1 text-zinc-700" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Address <span className='text-md text-red-600'>*</span></label>
                <input type="text" {...register("address")} placeholder='Enter your residential address' className="w-full p-2 border rounded-lg mt-1 text-zinc-700" />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Phone Number <span className='text-md text-red-600'>*</span></label>
                <input
                  type="text"
                  {...register("number", { valueAsNumber: true })}
                  onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
                  placeholder='Enter your contact number'
                  className="w-full p-2 border rounded-lg mt-1 text-zinc-700"
                />
                {errors.number && <p className="text-red-500 text-sm">{errors.number.message}</p>}
            </ div>
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Email</label>
                <input type="email" {...register("email")} placeholder='Enter your email address' className="w-full p-2 border rounded-lg mt-1 text-zinc-700" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Aadhar Number</label>
                <input
                  type="text"
                  {...register("aadhar")}
                  onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
                  placeholder='Enter your 12 digit Aadhar Number'
                  className="w-full p-2 border rounded-lg mt-1 text-zinc-700"
                />
                {errors.aadhar && <p className="text-red-500 text-sm">{errors.aadhar.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-lg font-medium text-gray-700">Last Attended Program At NV</label>
                <select
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
                <label className="block text-lg font-medium text-gray-700">Year</label>
                <select
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
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 my-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}