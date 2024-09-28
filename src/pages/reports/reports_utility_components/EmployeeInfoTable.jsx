import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// For PDF download
import jsPDF from "jspdf";
import "jspdf-autotable";

// For Excel download
import * as XLSX from "xlsx";

const EmployeeInfoTable = ({ allEmployeesFullInfo, reportType }) => {
  // Helper object to format employee data for reuse in PDF or Excel files
  const formatEmployeeData = (employee) => ({
    "Employee ID": employee.employee_id,
    Status: employee.employment_info?.status,
    Name: employee.personal_info?.name,
    Designation: employee.employment_info?.designation,
    Department: employee.employment_info?.department,
    "Job Location": employee.employment_info?.job_location,

    "Joining Date": employee.employment_info?.joining_date,
    "Probation (months)": employee.employment_info?.probation_period_months,
    "Tentative Confirm Date":
      employee.employment_info?.tentative_confirmation_date,
    "Is Confirmed": employee.salary_info?.is_confirmed ? "Yes" : "No",
    "Confirm Effective Date":
      employee.employment_info?.confirmation_effective_date,
    "Last Promotion Date": employee.last_promotion?.promotion_effective_date,

    "Sick Leave Balance": employee.salary_info?.sick_leave_balance,
    "Casual Leave Balance": employee.salary_info?.casual_leave_balance,

    "Separation Type": employee.separation_info?.separation_type || "N/A",
    "Cause of Separation":
      employee.separation_info?.cause_of_separation || "N/A",
    "Application Submission Date":
      employee.separation_info?.application_submission_date || "N/A",
    "Separation Effective Date":
      employee.separation_info?.separation_effect_date || "N/A",

    "Salary Grade": employee.salary_info?.salary_grade || "N/A",
    "Salary Step": employee.salary_info?.salary_step || "N/A",
    "Gross Salary": employee.salary_info?.gross_salary || "N/A",
    "Net Salary": employee.salary_info?.net_salary || "N/A",
  });

  // PDF download
  const downloadPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });

    const headers = [
      [
        "Employee ID",
        "Status",
        "Name",
        "Designation",
        "Department",
        "Job Location",

        "Joining Date",
        "Probation (months)",
        "Tentative Confirm Date",
        "Is Confirmed",
        "Confirm Effective Date",
        "Last Promotion Date",

        "Sick Leave Balance",
        "Casual Leave Balance",

        "Separation Type",
        "Cause of Separation",
        "Application Submission Date",
        "Separation Effective Date",
        "Salary Grade",
        "Salary Step",
        "Gross Salary",
        "Net Salary",
      ],
    ];

    // Rows of PDF file
    const rows = allEmployeesFullInfo.map((employee) =>
      Object.values(formatEmployeeData(employee))
    );

    // Use the monthYear variable to dynamically set the title
    doc.text(`Employee ${reportType} report`, 14, 20); // 14, 20 is to set the page margins or positioning (X, Y coordinates)

    doc.autoTable({
      head: headers,
      body: rows,
      theme: "grid",
      styles: { fontSize: 8 },
      startY: 30,
    });

    // Use monthYear in the filename for the PDF
    doc.save(`employee-${reportType}_report.pdf`);
  };

  // Excel download
  const downloadExcel = () => {
    // Create a new workbook and a worksheet
    const ws = XLSX.utils.json_to_sheet(
      allEmployeesFullInfo.map(formatEmployeeData)
    ); // Create a new worksheet

    const wb = XLSX.utils.book_new(); // Create a new workbook for Excel download

    XLSX.utils.book_append_sheet(wb, ws, `Employee ${reportType} report`); // Append the worksheet to the workbook

    // Use monthYear in the filename for the Excel file
    XLSX.writeFile(wb, `employee-${reportType}_report.xlsx`);
  };

  const navigate = useNavigate();

  const handleViewDetails = (employee_id) => {
    navigate(`/employee_details/${employee_id}`);
  };

  return (
    <div>
      <h2 className="text-center text-2xl font-semibold leading-8 my-10">
        <span className="text-gradient">
          All ({allEmployeesFullInfo?.length}) Employee
        </span>{" "}
        Info
      </h2>

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

      <div className="overflow-x-auto w-11/12 mx-auto mt-10 mb-16">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th>ID</th>
              <td>Status</td>
              <td>Name</td>
              <td>Designation</td>
              <td>Department</td>
              <td>Location</td>
              <td>Joining Date</td>
              <td>Probation (months)</td>
              <td>tentative_confirm_date</td>
              <td>Is_confirmed</td>
              <td>confirm_effective_date</td>

              <td>Last Promotion Date</td>

              <td>sick_leave_balance</td>
              <td>casual_leave_balance</td>

              <td>Separation Type</td>
              <td>Cause of Separation</td>
              <td>Separation Application Date</td>
              <td>Separation Effective Date</td>

              <td>Salary Grade</td>
              <td>Starting Basic</td>
              <td>Salary Step</td>
              <td>Effective Basic</td>
              <td>House Rent</td>
              <td>Medical</td>
              <td>Conveyance</td>
              <td>Hardship</td>
              <td>PF Contrib.</td>
              <td>Gross Salary</td>
              <td>PF Deduct.</td>
              <td>SWF Deduct.</td>
              <td>Tax Deduct.</td>
              <td>Salary Deduct.</td>
              <td>Net Salary</td>

              <td>Father</td>
              <td>Mother</td>
              <td>Gender</td>
              <td>Marital Status</td>
              <td>Blood Group</td>
              <td>Education</td>
              <td>Email</td>
              <td>Contact_no</td>
              <td>Date of Birth</td>
              <td>Smart NID</td>
              <td>Permanent Address</td>
              <td>Present Address</td>

              <td>
                Job Profile Details of The Employee Describing The Full History
                of The Employee During His Employment
              </td>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {allEmployeesFullInfo?.map((employee, index) => (
              <tr
                key={employee?.employee_id}
                // here, length - 1 is used not to apply bottom border for the very last line of the table
                className={`hover ${
                  index < allEmployeesFullInfo.length - 1
                    ? "border-b-2 border-indigo-300"
                    : ""
                }`}
              >
                <th>{employee?.employee_id}</th>
                <td>{employee?.employment_info?.status}</td>
                <td>{employee?.personal_info?.name}</td>
                <td>{employee?.employment_info?.designation}</td>
                <td>{employee?.employment_info?.department}</td>
                <td>{employee?.employment_info?.job_location}</td>
                <td>{employee?.employment_info?.joining_date}</td>
                <td>{employee?.employment_info?.probation_period_months}</td>
                <td>
                  {employee?.employment_info?.tentative_confirmation_date}
                </td>
                <td>{employee?.salary_info?.is_confirmed ? "Yes" : "No"}</td>
                <td>
                  {employee?.employment_info?.confirmation_effective_date}
                </td>

                <td>{employee?.last_promotion?.promotion_effective_date}</td>

                <td>{employee?.salary_info?.sick_leave_balance}</td>
                <td>{employee?.salary_info?.casual_leave_balance}</td>

                <td>{employee?.separation_info?.separation_type}</td>
                <td>{employee?.separation_info?.cause_of_separation}</td>
                <td>
                  {employee?.separation_info?.application_submission_date}
                </td>
                <td>{employee?.separation_info?.separation_effect_date}</td>

                <td>{employee?.salary_info?.salary_grade}</td>
                <td>{employee?.salary_info?.starting_basic}</td>
                <td>{employee?.salary_info?.salary_step}</td>
                <td>{employee?.salary_info?.effective_basic}</td>
                <td>{employee?.salary_info?.house_rent}</td>
                <td>{employee?.salary_info?.medical_allowance}</td>
                <td>{employee?.salary_info?.conveyance}</td>
                <td>{employee?.salary_info?.hardship}</td>
                <td>{employee?.salary_info?.pf_contribution}</td>
                <td>{employee?.salary_info?.gross_salary}</td>
                <td>{employee?.salary_info?.pf_deduction}</td>
                <td>{employee?.salary_info?.swf_deduction}</td>
                <td>{employee?.salary_info?.tax_deduction}</td>
                <td>{employee?.salary_info?.npl_salary_deduction}</td>
                <td>{employee?.salary_info?.net_salary}</td>

                <td>{employee?.personal_info?.father_name}</td>
                <td>{employee?.personal_info?.mother_name}</td>
                <td>{employee?.personal_info?.gender}</td>
                <td>{employee?.personal_info?.marital_status}</td>
                <td>{employee?.personal_info?.blood_group}</td>
                <td>{employee?.personal_info?.educational_degree}</td>
                <td>{employee?.personal_info?.email}</td>
                <td>{employee?.personal_info?.contact_number}</td>
                <td>{employee?.personal_info?.date_of_birth}</td>
                <td>{employee?.personal_info?.smart_id}</td>
                <td>{employee?.personal_info?.permanent_address}</td>
                <td>{employee?.personal_info?.present_address}</td>

                <td>{employee?.job_profile_details}</td>
                <th>
                  <button
                    className="btn btn-xs btn-outline btn-accent h-10"
                    onClick={() => handleViewDetails(employee?.employee_id)}
                  >
                    View
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

EmployeeInfoTable.propTypes = {
  allEmployeesFullInfo: PropTypes.array.isRequired,
  reportType: PropTypes.string.isRequired,
};

export default EmployeeInfoTable;
