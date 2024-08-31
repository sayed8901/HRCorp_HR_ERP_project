import { useParams } from "react-router-dom";
import useEmployeesData from "../../utilities/dataFetches/useAllEmployeesData";
import useFetch from "../../utilities/dataFetches/useDataFetchHooks";
import LoadingSpinner from "../../utilities/LoadingSpinner";

const SingleEmployeeDetails = () => {
  const { employee_id } = useParams();

  // Fetch all the employees full info data
  const {
    allEmployeesFullInfo,
    loading: employeeLoading,
    error: employeeError,
  } = useEmployeesData();

  // Fetch job profile data
  const {
    data: jobProfileData,
    error: jobProfileError,
    loading: jobProfileLoading,
  } = useFetch(
    `${
      import.meta.env.VITE_API_URL
    }/job_profile_history/?employee_id=${employee_id}`
  );
  //   console.log("id:", employee_id, "profile", jobProfileData);

  // getting the employee by employee_id
  const employee = allEmployeesFullInfo.find(
    (emp) => emp.employee_id === employee_id
  );

  if (employeeLoading || jobProfileLoading)
    return <LoadingSpinner></LoadingSpinner>;
  if (employeeError || jobProfileError)
    return <div>Error: {employeeError || jobProfileError}</div>;
  if (!employee) return <div>No employee found</div>;

  return (
    <div className="container mx-auto px-2 sm:px-0 mb-10">
      <div className="w-full mx-auto px-5 my-10">
        <div className="px-4 sm:px-0">
          <h2 className="text-center text-3xl font-semibold leading-8 mb-8">
            {" "}
            Employee Details for
            <span className="text-gradient">
              {employee.personal_info.first_name} {employee.personal_info.name}{" "}
              (ID#{employee.personal_info.employee})
            </span>
          </h2>
        </div>

        {/* tabs */}
        <div role="tablist" className="tabs tabs-lifted w-11/12 mx-auto">
          {/* Personal Information Tab */}
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab font-bold sm:text-lg sm:mx-2"
            aria-label="Personal_Info"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <p>
              <strong>Name:</strong> {employee.personal_info.first_name}{" "}
              {employee.personal_info.name}
            </p>
            <p>
              <strong>Father:</strong> {employee.personal_info.father_name}
            </p>
            <p>
              <strong>Mother:</strong> {employee.personal_info.mother_name}
            </p>
            <p>
              <strong>Email:</strong> {employee.personal_info.email}
            </p>
            <p>
              <strong>Contact Number:</strong>{" "}
              {employee.personal_info.contact_number}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {employee.personal_info.date_of_birth}
            </p>
            <p>
              <strong>Gender:</strong> {employee.personal_info.gender}
            </p>
            <p>
              <strong>Marital Status:</strong>{" "}
              {employee.personal_info.marital_status}
            </p>
            <p>
              <strong>Spouse:</strong> {employee.personal_info.spouse_name}
            </p>
            <p>
              <strong>Blood Group:</strong> {employee.personal_info.blood_group}
            </p>
            <p>
              <strong>Education:</strong>{" "}
              {employee.personal_info.educational_degree}
            </p>
            <p>
              <strong>Smart NID:</strong> {employee.personal_info.smart_id}
            </p>
            <p>
              <strong>Permanent Address:</strong>{" "}
              {employee.personal_info.permanent_address}
            </p>
            <p>
              <strong>Present Address:</strong>{" "}
              {employee.personal_info.present_address}
            </p>
          </div>

          {/* Employment Information Tab */}
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab font-bold sm:text-lg sm:mx-2"
            aria-label="Employment_Info"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <p>
              <strong>Status:</strong> {employee.employment_info.status}
            </p>
            <p>
              <strong>Designation:</strong>{" "}
              {employee.employment_info.designation}
            </p>
            <p>
              <strong>Department:</strong> {employee.employment_info.department}
            </p>
            <p>
              <strong>Job Location:</strong>{" "}
              {employee.employment_info.job_location}
            </p>
            <p>
              <strong>Joining Date:</strong>{" "}
              {employee.employment_info.joining_date}
            </p>
            <p>
              <strong>Probation Period (months):</strong>{" "}
              {employee.employment_info.probation_period_months}
            </p>
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab font-bold sm:text-lg sm:mx-2"
            aria-label="Salary_Info"
          />

          {/* Salary Information Tab */}
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <p>
              <strong>Is_confirmed:</strong>{" "}
              {employee.employment_info.is_confirmed}
            </p>
            <p>
              <strong>Salary Grade:</strong>{" "}
              {employee?.salary_info?.salary_grade}
            </p>
            <p>
              <strong>Starting basic:</strong>{" "}
              {employee?.salary_info?.starting_basic}
            </p>
            <p>
              <strong>Salary Step:</strong> {employee?.salary_info?.salary_step}
            </p>
            <p>
              <strong>Effective basic:</strong>{" "}
              {employee?.salary_info?.effective_basic}
            </p>
            <p>
              <strong>House Rent:</strong> {employee?.salary_info?.house_rent}
            </p>
            <p>
              <strong>Medical Allowance:</strong>{" "}
              {employee?.salary_info?.medical_allowance}
            </p>
            <p>
              <strong>Conveyance Allowance:</strong>{" "}
              {employee?.salary_info?.conveyance}
            </p>
            <p>
              <strong>Hardship Allowance:</strong>{" "}
              {employee?.salary_info?.hardship}
            </p>
            <p>
              <strong>PF Contribution:</strong>{" "}
              {employee?.salary_info?.pf_contribution}
            </p>
            <p>
              <strong>Gross Salary:</strong>{" "}
              {employee?.salary_info?.gross_salary}
            </p>
            <p>
              <strong>PF Deduction:</strong>{" "}
              {employee?.salary_info?.pf_deduction}
            </p>
            <p>
              <strong>SWF Deduction:</strong>{" "}
              {employee?.salary_info?.swf_deduction}
            </p>
            <p>
              <strong>Tax Deduction:</strong>{" "}
              {employee?.salary_info?.tax_deduction}
            </p>
            <p>
              <strong>Net Salary:</strong> {employee?.salary_info?.net_salary}
            </p>
            <p>
              <strong>Consolidated Salary:</strong>{" "}
              {employee?.salary_info?.consolidated_salary}
            </p>
          </div>

          {/* Job Profile History Tab */}
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab font-bold sm:text-lg sm:mx-2"
            aria-label="Job_Profile"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
              {jobProfileData &&
                jobProfileData.map((jobProfile, index) => (
                  <li key={index}>
                    <div className="timeline-middle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div
                      className={`timeline-${
                        index % 2 === 0 ? "start" : "end"
                      } mb-10`}
                    >
                      <time className="font-mono italic">
                        {jobProfile.start_date}
                      </time>
                      <div className="text-lg font-black">
                        {jobProfile.job_title}
                      </div>
                      {/* showing profile data */}
                      <div className="flex justify-between">
                        <p>
                          <strong>{jobProfile.effective_date}</strong>
                        </p>
                        <p>
                          <strong>- {jobProfile.event_type}</strong>
                        </p>
                      </div>
                      <p>{jobProfile.details}</p>
                    </div>
                    <hr />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEmployeeDetails;
