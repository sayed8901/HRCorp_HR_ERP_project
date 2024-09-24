import { useState, useEffect } from "react";
import LoadingSpinner from "../../../utilities/LoadingSpinner";

const Payroll = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // Current month as default value
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get current month in 'YYYY-MM' format
  const currentMonth = new Date().toISOString().slice(0, 7);

  // Fetch payroll data
  const fetchPayrollData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://hrcorp-system.onrender.com/payroll/process_payroll/?month=${month}`
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

  useEffect(() => {
    fetchPayrollData();
  }, [month]);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="overflow-x-auto w-11/12 mx-auto mt-10 mb-16">
      <h1 className="text-2xl font-bold text-center my-6">Payroll Data</h1>

      <div className="month-selector my-4 text-center">
        <label htmlFor="month" className="mr-2">
          Select Month:
        </label>
        <input
          type="month"
          id="month"
          value={month}
          onChange={handleMonthChange}
          max={currentMonth} /* Disable future months */
          className="border border-gray-400 p-2 rounded"
        />
      </div>

      {loading && (
        <div className="text-center text-blue-600 my-4">
          <LoadingSpinner />
        </div>
      )}

      {error && <div className="text-center text-red-600 my-4">{error}</div>}

      {!loading && !error && (
        <div className="overflow-x-auto w-11/12 mx-auto mt-10 mb-16">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Job Location</th>
                <th>Status</th>
                <th>Joining Date</th>
                <th>Salary Grade</th>
                <th>Salary Step</th>
                <th>Starting Basic</th>
                <th>Effective Basic</th>
                <th>House Rent</th>
                <th>Medical Allowance</th>
                <th>Conveyance</th>
                <th>Hardship</th>
                <th>PF Contribution</th>
                <th>Festival Bonus</th>
                <th>Other Allowance</th>
                <th>Gross Salary</th>
                <th>PF Deduction</th>
                <th>SWF Deduction</th>
                <th>Tax Deduction</th>
                <th>Late Joining Deduction</th>
                <th>NPL Salary Deduction</th>
                <th>Net Salary</th>
                <th>Consolidated Salary</th>
                <th>Is Confirmed</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.length > 0 ? (
                payrollData.map((employee, index) => (
                  <tr
                    key={employee.employee}
                    className={`hover ${
                      index < payrollData.length - 1
                        ? "border-b-2 border-indigo-300"
                        : ""
                    }`}
                  >
                    <th>{employee.employee}</th>
                    <td>{employee.employee_name}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.department}</td>
                    <td>{employee.job_location}</td>
                    <td>{employee.status}</td>
                    <td>{employee.joining_date}</td>
                    <td>{employee.salary_grade}</td>
                    <td>{employee.salary_step}</td>
                    <td>{employee.starting_basic}</td>
                    <td>{employee.effective_basic}</td>
                    <td>{employee.house_rent}</td>
                    <td>{employee.medical_allowance}</td>
                    <td>{employee.conveyance}</td>
                    <td>{employee.hardship}</td>
                    <td>{employee.pf_contribution}</td>
                    <td>{employee.festival_bonus}</td>
                    <td>{employee.other_allowance}</td>
                    <td>{employee.gross_salary}</td>
                    <td>{employee.pf_deduction}</td>
                    <td>{employee.swf_deduction}</td>
                    <td>{employee.tax_deduction}</td>
                    <td>{employee.late_joining_deduction}</td>
                    <td>{employee.npl_salary_deduction}</td>
                    <td>{employee.net_salary}</td>
                    <td>{employee.consolidated_salary}</td>
                    <td>{employee.is_confirmed ? "Yes" : "No"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border px-4 py-2 text-center" colSpan="27">
                    No payroll data available for this month.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Payroll;
