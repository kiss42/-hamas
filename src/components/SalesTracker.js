import React, { useState } from 'react';

const SalesTracker = () => {
  const [metrics, setMetrics] = useState({
    name: '',
    peopleTalkedTo: 0,
    zipsCollected: 0,
    phonesTakenOut: 0,
    customerNumbers: 0,
    textsSent: 0,
    gasSales: 0,
    electricSales: 0,
  });

  const handleChange = (e) => {
    setMetrics({ ...metrics, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add analysis and suggestions logic here based on the metrics
    console.log(metrics);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Sales Metrics Tracker</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              name="name"
              value={metrics.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Your Name"
            />
          </div>

          {/* Other metric inputs */}
          {[
            { label: 'People Talked To', name: 'peopleTalkedTo' },
            { label: 'Zips Collected', name: 'zipsCollected' },
            { label: 'Phones Taken Out', name: 'phonesTakenOut' },
            { label: 'Customer Numbers', name: 'customerNumbers' },
            { label: 'Texts Sent', name: 'textsSent' },
            { label: 'Gas Sales', name: 'gasSales' },
            { label: 'Electric Sales', name: 'electricSales' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">{field.label}</label>
              <input
                type="number"
                name={field.name}
                value={metrics[field.name]}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder={field.label}
                min="0"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Submit Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default SalesTracker;
