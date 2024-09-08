import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const EmployeeInfoTable = ({ allEmployeesFullInfo }) => {
  const navigate = useNavigate();

  const handleViewDetails = (employee_id) => {
    navigate(`/employee_details/${employee_id}`);
  };

  return (
    <div className="overflow-x-auto w-11/12 mx-auto mt-10 mb-16">
      <h2 className="text-center text-2xl font-semibold leading-8 mb-10">
        <span className="text-gradient">
          All ({allEmployeesFullInfo?.length}) Employee
        </span>{" "}
        Info
      </h2>

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
            <td>Net Salary</td>
            <td>Consolidated Salary</td>

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
              Job Profile Details of The Employee Describing The Full History of
              The Employee During His Employment
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
              <td>{employee?.employment_info?.tentative_confirmation_date}</td>
              <td>{employee?.salary_info?.is_confirmed ? "Yes" : "No"}</td>
              <td>{employee?.employment_info?.confirmation_effective_date}</td>

              <td>{employee?.last_promotion?.promotion_effective_date}</td>

              <td>{employee?.separation_info?.separation_type}</td>
              <td>{employee?.separation_info?.cause_of_separation}</td>
              <td>{employee?.separation_info?.application_submission_date}</td>
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
              <td>{employee?.salary_info?.net_salary}</td>
              <td>{employee?.salary_info?.consolidated_salary}</td>

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
  );
};

EmployeeInfoTable.propTypes = {
  allEmployeesFullInfo: PropTypes.array.isRequired,
};

export default EmployeeInfoTable;
