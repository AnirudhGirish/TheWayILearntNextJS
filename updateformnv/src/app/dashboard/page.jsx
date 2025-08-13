'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AdminPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exportFormat, setExportFormat] = useState('csv');
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const token = Cookies.get('token');
  //   console.log(token)
  //   if (!token) {
  //     router.push('/signin');
  //     return;
  //   }
  //   setAuthenticated(true);
  //   window.history.pushState(null, '', window.location.href);
  //   window.addEventListener('popstate', function () {
  //     router.push('/signin');
  //   });

  //   return () => {
  //     window.removeEventListener('popstate', () => {});
  //   };

  //   const fetchData = async () => {
  //       setLoading(true)
  //     try {
  //       const response = await fetch('/api/fetch');
  //       if (!response.ok) throw new Error('Failed to fetch data');
  //       const result = await response.json();
  //       if (!Array.isArray(result.responses)) {
  //           throw new Error("Invalid data format");
  //       }
  //       setData(result.responses);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const token = Cookies.get('token');
  
    // If no token, redirect and prevent further execution
    if (!token) {
      router.push('/signin');
      return;
    }
  
    // Set authentication status
    setAuthenticated(true);
  
    // Prevent user from accessing the page after logout
    window.history.pushState(null, '', window.location.href);
    window.history.replaceState(null, '', window.location.href);

    const handleBackButton = () => {
      window.history.pushState(null, '', window.location.href);
      router.replace('/signin');
    };

    window.addEventListener('popstate', handleBackButton);

    // Cleanup function
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [router]); // Dependency to avoid unnecessary re-renders
  
  // Fetch Data only when authenticated
  useEffect(() => {
    if (!authenticated) return; // Ensure data fetching happens only when authenticated
  
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/fetch');
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        if (!Array.isArray(result.responses)) {
          throw new Error('Invalid data format');
        }
        setData(result.responses);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [authenticated]); // Fetch only when authentication is set
  

  const handleExport = async () => {
    try {
      const response = await fetch(`/api/export?format=${exportFormat}`);
      if (!response.ok) throw new Error('Export failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `export.${exportFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      alert(error.message);
    }
  };

  if (!authenticated) return null;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen p-6 bg-bg-blue-300 text-black bg-blue-300">
      <div className="max-w-5xl mx-auto bg-blue-200 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-medium text-black text-center mb-6">Admin Dashboard</h2>
        <button
          onClick={async () => {
            try {
              const response = await fetch('/api/sign-out', { method: 'GET' });
              if (response.ok) {
                Cookies.remove('token');
                window.location.href = '/';
                window.history.replaceState(null, '', '/signin');
              } else {
                alert("Logout failed");
              }
            } catch (error) {
              console.error("Logout error:", error);
            }
          }}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          Sign Out
        </button>

        <div className="mt-4 flex items-center justify-between my-6">
          <select
            className="p-2 border rounded-lg"
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
          >
            <option value="csv">CSV</option>
            <option value="xlsx">Excel</option>
          </select>
          <button
            onClick={handleExport}
            className="bg-blue-600 text-white py-3 my-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer disabled:opacity-50 p-2"
          >
            Export Data
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Address</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Aadhar</th>
                  <th className="border p-2">Education</th>
                  <th className="border p-2">Year</th>
                </tr>
              </thead>
              <tbody>
              {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="text-center border-t">
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.address}</td>
                  <td className="border p-2">{item.number}</td>
                  <td className="border p-2">{item.email}</td>
                  <td className="border p-2">{item.aadhar}</td>
                  <td className="border p-2">{item.pass}</td>
                  <td className="border p-2">{item.year}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No data available
                </td>
              </tr>
            )}
              </tbody>
            </table>
          </div>
        )}
        
      </div>
    </div>
  );
}
