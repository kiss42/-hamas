export default function MetricInput({ label, name, value, onChange, type = 'number' }) {
    const handleInputChange = (e) => {
      const val = e.target.value;
      
      // For numeric input, allow only values >= 0 or an empty input
      if (type === 'number') {
        if (val >= 0 || val === '') {
          onChange(e);
        }
      } else {
        // For text inputs (like name), just pass the value
        onChange(e);
      }
    };
  
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
          type={type}  // Use the type provided (either 'text' for name or 'number' for numeric inputs)
          name={name}
          value={value}
          onChange={handleInputChange}
          className="border p-2 rounded w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={label}
          min={type === 'number' ? "0" : undefined}  // Only set min for number input types
        />
      </div>
    );
  }
  