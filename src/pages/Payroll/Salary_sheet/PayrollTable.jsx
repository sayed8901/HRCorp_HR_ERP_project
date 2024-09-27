import PropTypes from "prop-types";

// For PDF download
import jsPDF from "jspdf";
import "jspdf-autotable";

// For Excel download
import * as XLSX from "xlsx";

const PayrollTable = ({ payrollData }) => {
  // Helper object to format employee data for reuse in PDF or Excel files
  const formatEmployeeData = (employee) => ({
    "Employee ID": employee.employee,
    "Name": employee.employee_name,
    "Designation": employee.designation,
    "Department": employee.department,
    "Job Location": employee.job_location,
    "Status": employee.status,
    "Joining Date": employee.joining_date,
    "Salary Grade": employee.salary_grade,
    "Salary Step": employee.salary_step,
    "Starting Basic": employee.starting_basic,
    "Effective Basic": employee.effective_basic,
    "House Rent": employee.house_rent,
    "Medical Allowance": employee.medical_allowance,
    "Conveyance": employee.conveyance,
    "Hardship": employee.hardship,
    "PF Contribution": employee.pf_contribution,
    "Festival Bonus": employee.festival_bonus,
    "Other Allowance": employee.other_allowance,
    "Gross Salary": employee.gross_salary,
    "PF Deduction": employee.pf_deduction,
    "SWF Deduction": employee.swf_deduction,
    "Tax Deduction": employee.tax_deduction,
    "Late Joining Deduction": employee.late_joining_deduction,
    "NPL Salary Deduction": employee.npl_salary_deduction,
    "Net Salary": employee.net_salary,
    "Is Confirmed": employee.is_confirmed ? "Yes" : "No",
  });

  // Helper function to get the current month and year
  const getCurrentMonthYear = () => {
    const date = new Date();
    const options = { month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options).replace(" ", "-");
  };

  const monthYear = getCurrentMonthYear(); // e.g., "September-2024"

  // PDF download
  const downloadPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });

    const headers = [
      [
        "Employee ID",
        "Name",
        "Designation",
        "Department",
        "Job Location",
        "Status",
        "Joining Date",
        "Salary Grade",
        "Salary Step",
        "Starting Basic",
        "Effective Basic",
        "House Rent",
        "Medical Allowance",
        "Conveyance",
        "Hardship",
        "PF Contribution",
        "Festival Bonus",
        "Other Allowance",
        "Gross Salary",
        "PF Deduction",
        "SWF Deduction",
        "Tax Deduction",
        "Late Joining Deduction",
        "NPL Salary Deduction",
        "Net Salary",
        "Is Confirmed",
      ],
    ];

    // Rows of PDF file
    const rows = payrollData.map((employee) =>
      Object.values(formatEmployeeData(employee))
    );

    // Use the monthYear variable to dynamically set the title
    doc.text(`Payroll Data - ${monthYear}`, 14, 20); // 14, 20 is to set the page margins or positioning (X, Y coordinates)

    doc.autoTable({
      head: headers,
      body: rows,
      theme: "grid",
      styles: { fontSize: 8 },
      startY: 30,
    });

    // Use monthYear in the filename for the PDF
    doc.save(`payroll-data-${monthYear}.pdf`);
  };

  // Excel download
  const downloadExcel = () => {
    // Create a new workbook and a worksheet
    const ws = XLSX.utils.json_to_sheet(payrollData.map(formatEmployeeData)); // Create a new worksheet

    const wb = XLSX.utils.book_new(); // Create a new workbook for Excel download

    XLSX.utils.book_append_sheet(wb, ws, `Payroll Data - ${monthYear}`); // Append the worksheet to the workbook

    // Use monthYear in the filename for the Excel file
    XLSX.writeFile(wb, `payroll-data-${monthYear}.xlsx`);
  };

  return (
    <div>
      <div className="my-4 mr-8 text-right">
        <button
          onClick={downloadPDF}
          className="btn-sm mr-2 px-4 py-2 bg-indigo-500 text-white rounded transition duration-300 hover:bg-indigo-600"
        >
          Download in PDF
        </button>
        <button
          onClick={downloadExcel}
          className="btn-sm px-4 py-2 bg-green-500 text-white rounded transition duration-300 hover:bg-green-600"
        >
          Download in Excel
        </button>
      </div>
      <div className="overflow-x-auto w-11/12 mx-auto mt-4 mb-16">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              {Object.keys(formatEmployeeData({})).map((header, index) => (
                <td key={index}>{header}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {payrollData.map((employee, index) => (
              <tr
                key={employee.employee}
                className={`hover ${
                  index < payrollData.length - 1
                    ? "border-b-2 border-indigo-300"
                    : ""
                }`}
              >
                {Object.values(formatEmployeeData(employee)).map(
                  (value, index) => (
                    <td key={index}>{value}</td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Define propTypes for the PayrollTable component
PayrollTable.propTypes = {
  payrollData: PropTypes.array.isRequired,
};

export default PayrollTable;
