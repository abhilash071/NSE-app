import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchStock = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/stock/${symbol}`);
      setData(res.data);
      setError('');
    } catch (err) {
      setError('Stock not found or failed to fetch');
      setData(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">📈 NSE Stock Viewer</h1>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter NSE symbol (e.g., RELIANCE)"
        className="p-2 border rounded w-72 mb-4"
      />
      <button onClick={fetchStock} className="bg-blue-500 text-white px-4 py-2 rounded">
        Get Stock Info
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {data && (
        <div className="mt-6 bg-white p-4 rounded shadow w-96 text-left">
          <h2 className="text-xl font-semibold">{data.info.companyName}</h2>
          <p>Symbol: {data.info.symbol}</p>
          <p>Last Price: ₹{data.priceInfo.lastPrice}</p>
          <p>Change: {data.priceInfo.change} ({data.priceInfo.pChange}%)</p>
        </div>
      )}
    </div>
  );
}

export default App;


