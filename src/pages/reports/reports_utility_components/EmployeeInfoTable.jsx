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
    "Employee ID": employee?.employee_id,
    Status: employee?.employment_info?.status,
    Name: employee?.personal_info?.name,
    Designation: employee?.employment_info?.designation,
    Department: employee?.employment_info?.department,
    "Job Location": employee?.employment_info?.job_location,

    "Joining Date": employee?.employment_info?.joining_date,
    "Probation (months)": employee?.employment_info?.probation_period_months,
    "Tentative Confirm Date":
      employee?.employment_info?.tentative_confirmation_date,
    "Is Confirmed": employee?.salary_info?.is_confirmed ? "Yes" : "No",
    "Confirm Effective Date":
      employee?.employment_info?.confirmation_effective_date,
    "Last Promotion Date": employee?.last_promotion?.promotion_effective_date,

    "Sick Leave Balance": employee?.salary_info?.sick_leave_balance,
    "Casual Leave Balance": employee?.salary_info?.casual_leave_balance,

    "Separation Type": employee?.separation_info?.separation_type || "N/A",
    "Cause of Separation":
      employee?.separation_info?.cause_of_separation || "N/A",
    "Application Submission Date":
      employee?.separation_info?.application_submission_date || "N/A",
    "Separation Effective Date":
      employee?.separation_info?.separation_effect_date || "N/A",

    "Salary Grade": employee?.salary_info?.salary_grade || "N/A",
    "Salary Step": employee?.salary_info?.salary_step || "N/A",
    "Gross Salary": employee?.salary_info?.gross_salary || "N/A",
    "Net Salary": employee?.salary_info?.net_salary || "N/A",
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
              <th className="border border-gray-300">ID</th>
              <td className="border border-gray-300">Status</td>
              <td className="border border-gray-300">Name</td>
              <td className="border border-gray-300">Designation</td>
              <td className="border border-gray-300">Department</td>
              <td className="border border-gray-300">Location</td>
              <td className="border border-gray-300">Joining Date</td>
              <td className="border border-gray-300">
                Probation <br /> (months)
              </td>
              <td className="border border-gray-300">
                tentative <br /> confirmation <br /> date
              </td>
              <td className="border border-gray-300">Is_confirmed</td>
              <td className="border border-gray-300">
                confirm <br /> effective <br /> date
              </td>

              <td className="border border-gray-300">
                Last <br /> Promotion <br /> Date
              </td>

              <td className="border border-gray-300">
                sick <br /> leave <br /> balance
              </td>
              <td className="border border-gray-300">
                casual <br /> leave <br /> balance
              </td>

              <td className="border border-gray-300">Separation Type</td>
              <td className="border border-gray-300">
                Cause of <br /> Separation
              </td>
              <td className="border border-gray-300">
                Separation <br /> Application <br /> Date
              </td>
              <td className="border border-gray-300">
                Separation <br /> Effective <br /> Date
              </td>

              <td className="border border-gray-300">
                Salary <br /> Grade
              </td>
              <td className="border border-gray-300">
                Starting <br /> Basic
              </td>
              <td className="border border-gray-300">
                Salary <br /> Step
              </td>
              <td className="border border-gray-300">
                Effective <br /> Basic
              </td>
              <td className="border border-gray-300">
                House <br /> Rent
              </td>
              <td className="border border-gray-300">
                Medical <br /> Allowance
              </td>
              <td className="border border-gray-300">
                Conveyance <br /> Allowance
              </td>
              <td className="border border-gray-300">
                Hardship <br /> Allowance
              </td>
              <td className="border border-gray-300">
                PF <br /> Contrib.
              </td>
              <td className="border border-gray-300">
                Gross <br /> Salary
              </td>
              <td className="border border-gray-300">
                PF <br /> Deduct.
              </td>
              <td className="border border-gray-300">
                SWF <br /> Deduct.
              </td>
              <td className="border border-gray-300">
                Tax <br /> Deduct.
              </td>
              <td className="border border-gray-300">
                Salary <br /> Deduct.
              </td>
              <td className="border border-gray-300">
                Net <br /> Salary
              </td>

              <td className="border border-gray-300">Father</td>
              <td className="border border-gray-300">Mother</td>
              <td className="border border-gray-300">Gender</td>
              <td className="border border-gray-300">
                Marital <br /> Status
              </td>
              <td className="border border-gray-300">
                Blood <br /> Group
              </td>
              <td className="border border-gray-300">Education</td>
              <td className="border border-gray-300">Email</td>
              <td className="border border-gray-300">Contact_no</td>
              <td className="border border-gray-300">Date of Birth</td>
              <td className="border border-gray-300">Smart NID</td>
              <td className="border border-gray-300">Permanent Address</td>
              <td className="border border-gray-300">Present Address</td>

              <td className="border border-gray-300">
                Job Profile Details of The Employee Describing The Full History
                of The Employee During His Employment
              </td>
              <th className="border border-gray-300">Details</th>
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
                <th className="border border-gray-300">
                  {employee?.employee_id}
                </th>
                <td className="border border-gray-300">
                  {employee?.employment_info?.status}
                </td>
                <td className="border border-gray-300">
                  {employee?.personal_info?.name}
                </td>
                <td className="border border-gray-300">
                  {employee?.employment_info?.designation}
                </td>
                <td className="border border-gray-300">
                  {employee?.employment_info?.department}
                </td>
                <td className="border border-gray-300">
                  {employee?.employment_info?.job_location}
                </td>
                <td className="border border-gray-300">
                  {employee?.employment_info?.joining_date}
                </td>
                <td className="border border-gray-300">
                  {employee?.employment_info?.probation_period_months}
                </td>
                <td className="border border-gray-300">
                  {employee?.employment_info?.tentative_confirmation_date}
                </td>
                <td className="border border-gray-300">
                  {employee?.salary_info?.is_confirmed ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300">
                  {employee?.employment_info?.confirmation_effective_date}
                </td>

                <td className="border border-gray-300">
                  {employee?.last_promotion?.promotion_effective_date}
                </td>

                <td className="border border-gray-300">
                  {employee?.salary_info?.sick_leave_balance}
                </td>
                <td className="border border-gray-300">
                  {employee?.salary_info?.casual_leave_balance}
                </td>

                <td className="border border-gray-300">
                  {employee?.separation_info?.separation_type}
                </td>
                <td className="border border-gray-300">
                  {employee?.separation_info?.cause_of_separation}
                </td>
                <td className="border border-gray-300">
                  {employee?.separation_info?.application_submission_date}
                </td>
                <td className="border border-gray-300">
                  {employee?.separation_info?.separation_effect_date}
                </td>

                <td className="border border-gray-300">
                  {employee?.salary_info?.salary_grade}
                </td>
                <td className="border border-gray-300">
                  {employee?.salary_info?.starting_basic}
                </td>
                <td className="border border-gray-300">
                  {employee?.salary_info?.salary_step}
                </td>
                <td className="border border-gray-300">
                  {employee?.salary_info?.effective_basic}
                </td>
                <td className="border border-gray-300">
                  {employee?.salary_info?.house_rent}
                </td>
                <td className="border border-gray-300">
                  {employee?.salary_info?.medical_allowance}
                </td>
                <td className="border border-gray-300">
                  {employee?.salary_info?.conveyance}
                </td>
                <td className="border border-gray-300">
                  {employee?.salary_info?.hardship}
                </td>
                <td className="border border-gray-300">
                  {employee?.salary_info?.pf_contribution}
                </td>
                <td className="border border-gray-300">
                  {employee?.salary_info?.gross_salary}
                </td>
                <td className="border border-gray-300">
                  {employee?.salary_info?.pf_deduction}
                </td>
                <td className="border border-gray-300">
                  {employee?.salary_info?.swf_deduction}
                </td>
                <td className="border border-gray-300">
                  {employee?.salary_info?.tax_deduction}
                </td>
                <td className="border border-gray-300">
                  {employee?.salary_info?.npl_salary_deduction}
                </td>
                <td className="border border-gray-300">
                  {employee?.salary_info?.net_salary}
                </td>

                <td className="border border-gray-300">
                  {employee?.personal_info?.father_name}
                </td>
                <td className="border border-gray-300">
                  {employee?.personal_info?.mother_name}
                </td>
                <td className="border border-gray-300">
                  {employee?.personal_info?.gender}
                </td>
                <td className="border border-gray-300">
                  {employee?.personal_info?.marital_status}
                </td>
                <td className="border border-gray-300">
                  {employee?.personal_info?.blood_group}
                </td>
                <td className="border border-gray-300">
                  {employee?.personal_info?.educational_degree}
                </td>
                <td className="border border-gray-300">
                  {employee?.personal_info?.email}
                </td>
                <td className="border border-gray-300">
                  {employee?.personal_info?.contact_number}
                </td>
                <td className="border border-gray-300">
                  {employee?.personal_info?.date_of_birth}
                </td>
                <td className="border border-gray-300">
                  {employee?.personal_info?.smart_id}
                </td>
                <td className="border border-gray-300">
                  {employee?.personal_info?.permanent_address}
                </td>
                <td className="border border-gray-300">
                  {employee?.personal_info?.present_address}
                </td>

                <td className="border border-gray-300">
                  {employee?.job_profile_details}
                </td>
                <th className="border border-gray-300">
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
