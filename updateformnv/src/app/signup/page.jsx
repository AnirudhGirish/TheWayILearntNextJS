'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminSchema } from '@/schemas/admin.schema';
import { useRouter } from 'next/navigation';

export default function AdminSignup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(adminSchema) });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    try {
      setErrorMessage(null);
      const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Signup failed');
      }

      alert('Admin Registered Successfully!');
      router.push('/signin'); 
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-300 p-6 shadow-md rounded-lg">
      <div className="bg-blue-200 shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Admin Sign Up</h2>

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium text-lg">Username</label>
            <input
              type="text"
              {...register('username')}
              className="w-full p-2 border rounded-lg mt-1 text-zinc-700"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-lg block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full p-2 border rounded-lg mt-1 text-zinc-700"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-lg block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full p-2 border rounded-lg mt-1 text-zinc-700"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 my-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 hover:cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
