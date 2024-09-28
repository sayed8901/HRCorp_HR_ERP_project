import { useState } from "react";
import LoadingSpinner from "../../../utilities/LoadingSpinner";
import PayrollTable from "./PayrollTable";
import useTitle from "../../../utilities/useTitle";

const Payroll = () => {
  useTitle("Process Payroll");

  const [payrollData, setPayrollData] = useState([]);

  // Month options
  const monthOptions = [
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];
  const today = new Date();

  const [month, setMonth] = useState(monthOptions[today.getMonth()].label); // Default month as a string
  const [year, setYear] = useState(new Date().getFullYear()); // Current year as default value

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch payroll data
  const fetchPayrollData = async (payrollDuration) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/payroll/process_payroll/?month=${payrollDuration}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setPayrollData(data);
    } catch (error) {
      console.log(error);
      setError("Error fetching payroll data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (monthNumber, year) => {
    const payrollDuration = `${year}-${monthNumber}`; // Combine year and month number
    fetchPayrollData(payrollDuration); // Pass payrollDuration to the fetch function
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className="overflow-x-auto w-11/12 mx-auto mt-10 mb-16">
      {/* Input fields for month and year */}
      <div className="month-selector my-4 text-center flex flex-col items-center">
        <div className="flex justify-center space-x-4">
          <div className="flex flex-row items-center">
            <label htmlFor="month" className="mr-2 font-semibold mb-1">
              Select Month:
            </label>
            <select
              id="month"
              value={month}
              onChange={handleMonthChange}
              className="border border-blue-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {monthOptions.map((option) => {
                const currentMonthNumber = today.getMonth() + 1; // Get current month (January is 0, so we add 1)
                const isDisabled =
                  year === today.getFullYear() &&
                  parseInt(option.value) > currentMonthNumber;
                return (
                  <option
                    key={option.value}
                    value={option.label}
                    disabled={isDisabled}
                  >
                    {option.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-row items-center">
            <label htmlFor="year" className="mr-2 font-semibold mb-1">
              Select Year:
            </label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={handleYearChange}
              min="2022" // Setting up the minimum year
              max={new Date().getFullYear()} // Limit to the current year to block future year selection
              className="border border-blue-400 p-2 rounded-lg w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Search button below the input fields */}
        <button
          onClick={() => {
            const monthNumber = monthOptions.find(
              (m) => m.label === month
            )?.value; // Get the numerical month value
            handleSearch(monthNumber, year); // Call handleSearch with month number and year
          }}
          className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Get Payroll Info
        </button>
      </div>

      {loading && (
        <div className="text-center text-blue-600 my-4">
          <LoadingSpinner />
        </div>
      )}

      {error && <div className="text-center text-red-600 my-4">{error}</div>}

      {/* Conditional rendering based on payroll data availability */}
      {!loading && !error && payrollData.length > 0 ? (
        <>
          {/* Headline with month and year */}
          <h1 className="text-2xl text-center mt-6 text-gradient">
            <span className="font-bold">Payroll</span> data for the month of:{" "}
            <span className="font-bold">
              {month}-{year}
            </span>
          </h1>

          {/* Payroll table */}
          <PayrollTable payrollData={payrollData}></PayrollTable>
        </>
      ) : (
        // Display message when no payroll data is found
        !loading &&
        !error && (
          <div className="text-center text-red-600 my-12">
            Payroll data not available. <br /> <br />
            <span className="text-success">
              Please click onto the{" "}
              <span className="font-bold text-primary">
                &quot;Get Payroll Info&quot;
              </span>{" "}
              button to process payroll again
            </span>
            <br /> or try again later.
          </div>
        )
      )}
    </div>
  );
};

export default Payroll;
