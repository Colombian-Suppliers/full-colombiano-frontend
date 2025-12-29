'use client';

import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('auth_token');
    const userFromStorage = localStorage.getItem('user');
    
    setToken(tokenFromStorage);
    
    if (userFromStorage) {
      try {
        setUser(JSON.parse(userFromStorage));
      } catch (e) {
        console.error('Failed to parse user:', e);
      }
    }
  }, []);

  const handleRedirect = () => {
    if (user?.role) {
      const role = user.role.toLowerCase();
      if (role === 'admin' || role === 'vendor') {
        window.location.href = '/d';
      } else {
        window.location.href = '/marketplace';
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug Page</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Auth Token</h2>
          <div className="bg-gray-100 p-4 rounded overflow-auto">
            <pre className="text-xs">{token || 'No token found'}</pre>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">User Object</h2>
          <div className="bg-gray-100 p-4 rounded overflow-auto">
            <pre className="text-xs">{user ? JSON.stringify(user, null, 2) : 'No user found'}</pre>
          </div>
        </div>

        {user && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">User Info</h2>
            <div className="space-y-2">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Name:</strong> {user.name || user.display_name}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>ID:</strong> {user.id}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <div className="space-x-4">
            <button
              onClick={handleRedirect}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Redirect Based on Role
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear Storage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

