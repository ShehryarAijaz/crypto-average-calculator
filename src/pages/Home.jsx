import React, { useState, useEffect } from 'react';

const Home = () => {
  const [entries, setEntries] = useState(() => {
    // Load entries from localStorage on initial render
    const savedEntries = localStorage.getItem('cryptoEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [token, setToken] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cryptoEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token.trim() || !amount || !price) {
      setError('All fields are required.');
      return;
    }
    if (parseFloat(amount) <= 0 || parseFloat(price) <= 0) {
      setError('Amount and Price must be positive numbers.');
      return;
    }
    setError('');

    const newEntry = {
      id: Date.now(),
      token: token.trim().toUpperCase(),
      amount: parseFloat(amount),
      price: parseFloat(price),
    };

    setEntries([...entries, newEntry]);
    setToken('');
    setAmount('');
    setPrice('');
  };

  const calculateAverage = () => {
    if (entries.length === 0) return 0;

    const totalInvestment = entries.reduce((sum, entry) => sum + (entry.amount * entry.price), 0);
    const totalAmount = entries.reduce((sum, entry) => sum + entry.amount, 0);

    return totalAmount > 0 ? totalInvestment / totalAmount : 0;
  };

  const removeEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const formatCurrency = (value) => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const clearAllEntries = () => {
    if (window.confirm('Are you sure you want to clear all entries? This cannot be undone.')) {
      setEntries([]);
    }
  };

  return (
    <div className="space-y-12">
      <section className="bg-white shadow-xl rounded-xl p-6 md:p-8">
        <h2 className="text-3xl font-semibold text-slate-800 mb-6 border-b pb-4">
          Add New Transaction
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="token" className="block text-sm font-medium text-slate-700 mb-1">
                Token Symbol
              </label>
              <input
                type="text"
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-4"
                placeholder="e.g., BTC, ETH"
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">
                Amount Bought
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-4"
                placeholder="e.g., 0.5"
                step="any"
                min="0"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-1">
                Price per Token (USD)
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-4"
                placeholder="e.g., 50000"
                step="any"
                min="0"
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-150 ease-in-out"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </section>

      {entries.length > 0 && (
        <section className="bg-white shadow-xl rounded-xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-3xl font-semibold text-slate-800">My Portfolio</h2>
            <button
              onClick={clearAllEntries}
              className="text-red-600 hover:text-red-800 font-medium transition-colors duration-150 ease-in-out"
            >
              Clear All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Token</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Purchase Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total Value</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Remove</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-50 transition-colors duration-150 ease-in-out">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{entry.token}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{entry.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">${formatCurrency(entry.price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">${formatCurrency(entry.amount * entry.price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => removeEntry(entry.id)}
                        className="text-red-500 hover:text-red-700 font-semibold transition-colors duration-150 ease-in-out"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200">
            <dl className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-6">
                <div className="flex flex-col items-center justify-center bg-slate-100 p-6 rounded-lg">
                    <dt className="text-sm font-medium text-slate-500">Total Invested</dt>
                    <dd className="mt-1 text-3xl font-semibold text-indigo-600">
                        ${formatCurrency(entries.reduce((sum, entry) => sum + (entry.amount * entry.price), 0))}
                    </dd>
                </div>
                <div className="flex flex-col items-center justify-center bg-slate-100 p-6 rounded-lg">
                    <dt className="text-sm font-medium text-slate-500">Average Purchase Price</dt>
                    <dd className="mt-1 text-3xl font-semibold text-indigo-600">
                        ${formatCurrency(calculateAverage())}
                    </dd>
                </div>
            </dl>
          </div>
        </section>
      )}

      {entries.length === 0 && (
         <section className="bg-white shadow-xl rounded-xl p-6 md:p-8 text-center">
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">Your Portfolio is Empty</h2>
            <p className="text-slate-500">Add your first transaction above to get started.</p>
        </section>
      )}
    </div>
  );
};

export default Home;
