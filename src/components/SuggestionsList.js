export default function SuggestionsList({ suggestions }) {
    return (
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-bold mb-2">Suggestions for Improvement:</h2>
        <ul className="list-disc list-inside">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
    );
  }
  