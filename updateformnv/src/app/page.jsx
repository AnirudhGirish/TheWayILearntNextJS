'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [profileUrl, setProfileUrl] = useState('');
  const [memberUrl, setMemberUrl] = useState('');

  useEffect(() => {
    setProfileUrl(`${window.location.protocol}//${window.location.host}/form`);
    setMemberUrl(`${window.location.protocol}//${window.location.host}/membership`)
  }, []);

  const copyToClipboard = () => {
    if (!profileUrl) {
      alert(" URL is not available yet!");
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(profileUrl)
        .then(() => alert("Link Copied Successfully!"))
        .catch(() => fallbackCopyText(profileUrl));
    } else {
      fallbackCopyText(profileUrl);
    }
  };

  const copyToClipboard2 = () => {
    if (!memberUrl) {
      alert(" URL is not available yet!");
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(memberUrl)
        .then(() => alert("Link Copied Successfully!"))
        .catch(() => fallbackCopyText(memberUrl));
    } else {
      fallbackCopyText(memberUrl);
    }
  };

  const fallbackCopyText = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Link Copied Successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-300 text-black px-6 py-10">
      <h1 className="text-6xl font-bold mb-4 text-center mt-20">Past Student's Association</h1>
      <h2 className="text-4xl font-semibold mb-2 text-center">N V Society</h2>
      <h3 className="text-xl mb-10 text-center mb-38">Kalaburgi</h3>

      <div className="w-full max-w-4xl text-center p-8 rounded-lg shadow-lg bg-blue-200">
        <h1 className="text-3xl font-bold mb-4">Welcome, update your data with NVPSA</h1>
        <p className="text-lg mb-6 text-gray-800">
          A secure and efficient way to collect and manage data.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/signin">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">
              Go to Dashboard
            </button>
          </Link>
          <Link href="/form">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">
              Go to Form
            </button>
          </Link>
          <Link href="/membership">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">
              Go to New Membership
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Copy Data Update Form link</h2>
        <div className="flex w-full gap-2">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="w-full p-2 border border-gray-400 rounded-lg bg-gray-100 text-gray-700"
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Copy New Life Membership link</h2>
        <div className="flex w-full gap-2">
          <input
            type="text"
            value={memberUrl}
            disabled
            className="w-full p-2 border border-gray-400 rounded-lg bg-gray-100 text-gray-700"
          />
          <button
            onClick={copyToClipboard2}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Copy
          </button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center w-full max-w-5xl">
        <div className="p-6 bg-blue-200 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Secure Authentication</h2>
          <p className="text-gray-800">Admin Sign in with secure credentials so as to protect your data.</p>
        </div>
        <div className="p-6 bg-blue-200 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Data Management</h2>
          <p className="text-gray-800">View, export, and manage submissions with ease.</p>
        </div>
        <div className="p-6 bg-blue-200 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">User-Friendly UI</h2>
          <p className="text-gray-800">Simple, intuitive design for smooth navigation in form for user.</p>
        </div>
      </div>

      <footer className="mt-10 text-lg text-gray-900 mt-auto">
        <p>&copy; {new Date().getFullYear()} Anirudh Girish. All rights reserved.</p>
      </footer>
    </div>
  );
}
