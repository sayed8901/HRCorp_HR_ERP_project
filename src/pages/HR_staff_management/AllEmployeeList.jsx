import LoadingSpinner from "../../utilities/LoadingSpinner";
import useEmployeesData from "../../utilities/dataFetches/useAllEmployeesData";
import { useNavigate } from "react-router-dom";

const AllEmployeeList = () => {
  const { allEmployeesFullInfo, loading, error } = useEmployeesData();
  const navigate = useNavigate();

  const handleViewDetails = (employee_id) => {
    navigate(`/employee_details/${employee_id}`);
  };

  return (
    <div className="container mx-auto px-2 sm:px-0 mt-16 mb-10">
      <div className="w-full mx-auto px-5 my-10">
        <div className="px-4 sm:px-0">
          <h2 className="text-center text-3xl font-semibold leading-8 mb-10">
            <span className="text-gradient">
              All ({allEmployeesFullInfo?.length}) Employee
            </span>{" "}
            Info
          </h2>
        </div>

        {loading && <LoadingSpinner />}

        {/* Display error messages */}
        {error && (
          <div className="mt-6 text-center text-base text-red-600">{error}</div>
        )}

        {/* Employee table */}
        <div className="overflow-x-auto w-11/12 mx-auto">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th>ID</th>
                <td>Status</td>
                <td>Designation</td>
                <td>Department</td>
                <td>Location</td>
                <td>Joining Date</td>
                <td>Probation (months)</td>
                <td>Is_confirmed</td>

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

                <td>Name</td>
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

                <td>Job Profile History Details of The Employee</td>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {allEmployeesFullInfo?.map((employee) => (
                <tr key={employee?.employee_id} className="hover">
                  <th>{employee?.employee_id}</th>
                  <td>{employee?.employment_info?.status}</td>
                  <td>{employee?.employment_info?.designation}</td>
                  <td>{employee?.employment_info?.department}</td>
                  <td>{employee?.employment_info?.job_location}</td>
                  <td>{employee?.employment_info?.joining_date}</td>
                  <td>{employee?.employment_info?.probation_period_months}</td>
                  <td>{employee?.employment_info?.is_confirmed}</td>

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

                  <td>{employee?.personal_info?.name}</td>
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
                      className="btn btn-xs btn-outline btn-accent"
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
    </div>
  );
};

export default AllEmployeeList;
