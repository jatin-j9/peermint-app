import { useEffect, useState } from 'react';
import api from './lib/axios';

function App() {
  const [backendStatus, setBackendStatus] = useState('CHECKING');
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await api.get('/health');

        setBackendStatus(response.data.data.status);
        setError(null);
      } catch (err) {
        setBackendStatus('UNAVAILABLE');
        setError(
          err.response?.data?.detail ||
            err.message ||
            'Unable to connect to backend',
        );
      }
    };

    checkBackend();
  }, []);

  const isConnected = backendStatus === 'UP';

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='text-center'>
        <h1 className='text-5xl font-bold text-indigo-600'>PeerMint</h1>

        <p className='mt-4 text-lg text-gray-600'>
          Learn Together. Grow Together.
        </p>

        <p className='mt-2 text-sm text-gray-500'>
          Student Peer Tutoring & Skill Exchange Platform
        </p>

        <div className='mt-8'>
          <span
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              backendStatus === 'CHECKING'
                ? 'bg-yellow-100 text-yellow-700'
                : isConnected
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
            }`}
          >
            {backendStatus === 'CHECKING'
              ? 'Checking Backend...'
              : isConnected
                ? 'Backend Connected'
                : 'Backend Unavailable'}
          </span>
        </div>

        {error && <p className='mt-4 text-sm text-red-600'>{error}</p>}
      </div>
    </div>
  );
}

export default App;
