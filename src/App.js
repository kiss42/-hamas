import React, { useState } from 'react';
import MetricInput from './components/MetricInput'; // Assuming it's in components folder
import SuggestionsList from './components/SuggestionsList'; // Assuming it's in components folder
import { analyzeMetrics } from './utils/analyzeData'; // Assuming it's in utils folder
import { formatForDiscord } from './utils/formatForDiscord'; // Assuming it's in utils folder

const App = () => {
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

  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [formattedText, setFormattedText] = useState('');

  const handleChange = (e) => {
    setMetrics({ ...metrics, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    if (name === 'timeIn') {
      setTimeIn(value);
    } else if (name === 'timeOut') {
      setTimeOut(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSuggestions = analyzeMetrics(metrics, timeIn, timeOut);
    setSuggestions(newSuggestions);
    const discordFormatted = formatForDiscord(metrics, newSuggestions, timeIn, timeOut);
    setFormattedText(discordFormatted);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(formattedText);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">Sales Metrics Tracker</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <MetricInput
            label="Your Name"
            name="name"
            value={metrics.name}
            onChange={handleChange}
            type="text"
          />

          {/* Time In and Time Out Inputs */}
          <MetricInput
            label="Time In"
            name="timeIn"
            value={timeIn}
            onChange={handleTimeChange}
            type="time"
          />
          <MetricInput
            label="Time Out"
            name="timeOut"
            value={timeOut}
            onChange={handleTimeChange}
            type="time"
          />

          {/* Other Metric Inputs */}
          <MetricInput
            label="People Talked To"
            name="peopleTalkedTo"
            value={metrics.peopleTalkedTo}
            onChange={handleChange}
            type="number"
          />
          <MetricInput
            label="Zips Collected"
            name="zipsCollected"
            value={metrics.zipsCollected}
            onChange={handleChange}
            type="number"
          />
          <MetricInput
            label="Phones Taken Out"
            name="phonesTakenOut"
            value={metrics.phonesTakenOut}
            onChange={handleChange}
            type="number"
          />
          <MetricInput
            label="Customer Numbers"
            name="customerNumbers"
            value={metrics.customerNumbers}
            onChange={handleChange}
            type="number"
          />
          <MetricInput
            label="Texts Sent"
            name="textsSent"
            value={metrics.textsSent}
            onChange={handleChange}
            type="number"
          />
          <MetricInput
            label="Gas Sales"
            name="gasSales"
            value={metrics.gasSales}
            onChange={handleChange}
            type="number"
          />
          <MetricInput
            label="Electric Sales"
            name="electricSales"
            value={metrics.electricSales}
            onChange={handleChange}
            type="number"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Submit Data
          </button>
        </form>

        {/* Display Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Suggestions</h2>
            <div className="bg-gray-50 text-gray-900 p-4 rounded-lg shadow-md">
              <SuggestionsList suggestions={suggestions} />
            </div>
            <button
              onClick={handleCopyToClipboard}
              className="mt-4 w-full bg-green-500 text-white py-3 rounded-lg transition duration-300"
            >
              Copy to Clipboard
            </button>
          </div>
        )}

        {/* Display Discord Formatted Text */}
        {formattedText && (
          <pre className="bg-gray-900 text-white p-4 mt-6 rounded-lg text-sm whitespace-pre-wrap break-words">
            {formattedText}
          </pre>
        )}
      </div>
    </div>
  );
};

export default App;
