import React, { useState, useEffect } from "react";

export default function PayrollGenerator() {
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const temp = [];

    for (let i = 1; i <= 6; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthYear = date.toLocaleString("default", { month: "long", year: "numeric" });
      temp.push(monthYear);
    }

    setMonths(temp);
    setSelectedMonth(temp[0]);
  }, []);

  const handleGenerate = () => {
    setLoading(true);
    setMessage("");
  
    setTimeout(() => {
      setLoading(false);
  
      const formattedMonth = selectedMonth
        .toLowerCase()
        .split(" ")
        .map((word, i) => (i === 0 ? word.slice(0, 3) : word)) // "March 2025" → ["mar", "2025"]
        .join("-"); // → "mar-2025"
  
      const fileName = `${formattedMonth}.pdf`;
      const filePath = `/payrolls/${fileName}`;
  
      const link = document.createElement("a");
      link.href = filePath;
      link.download = fileName;
      link.click();
  
      setMessage(`✅ Payslip for ${selectedMonth} downloaded successfully!`);
      setTimeout(() => setMessage(""), 4000);
    }, 3000); // shorter delay since it's no longer generating
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Payroll Desk</h1>
        <h2 className="text-gray-800 mb-12">Please select the month for which you need the Payslip Statement</h2>

        <label htmlFor="month-select" className="block text-sm font-medium text-gray-600 mb-2 text-left">
          Select Month:
        </label>

        <select
          id="month-select"
          className="w-full p-3 rounded border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 mb-6"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          disabled={loading}
        >
          {months.map((month, idx) => (
            <option key={idx} value={month}>
              {month}
            </option>
          ))}
        </select>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 shadow-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              Generating...
            </div>
          ) : (
            "Generate Payroll"
          )}
        </button>

        {message && (
          <div className="mt-6 bg-green-100 text-green-800 px-4 py-3 rounded-lg text-sm shadow-sm">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
