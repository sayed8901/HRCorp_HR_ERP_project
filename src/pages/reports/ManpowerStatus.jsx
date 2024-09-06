import useEmployeesData from "../../utilities/dataFetches/useAllEmployeesData";
import LoadingSpinner from "../../utilities/LoadingSpinner";

const ManpowerStatus = () => {
  const { allActiveEmployeesInfo, loading, error } = useEmployeesData();

  /* to show loading spinner while loading */
  if (loading) {
    return (
      <div className="my-32">
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  /* showing error messages */
  {
    error && (
      <div className="mt-6 text-center text-base text-red-600">{error}</div>
    );
  }

  // Objects to hold the counts for each department, designation, and job location
  const departmentCount = {};
  const designationCount = {};
  const jobLocationCount = {};

  // performing for loop to check all the employee, to find the number of employees
  allActiveEmployeesInfo.forEach((employee) => {
    const department = employee.employment_info.department || "Unknown";
    const designation = employee.employment_info.designation || "Unknown";
    const jobLocation = employee.employment_info.job_location || "Unknown";

    // increasing the number of employee,
    // Increment the count for the current department
    departmentCount[department] = (departmentCount[department] || 0) + 1;
    // Increment the count for the current designation
    designationCount[designation] = (designationCount[designation] || 0) + 1;
    // Increment the count for the current job location
    jobLocationCount[jobLocation] = (jobLocationCount[jobLocation] || 0) + 1;
  });

  return (
    <div className="mt-16 mb-10 mx-10">
      <div className="sm:mx-auto">
        <h2 className="my-10 text-center text-2xl font-semibold leading-9 tracking-tight">
          Existing Active <span className="text-gradient">Manpower Status</span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row w-full">
        {/* Section for Departments */}
        <div className="card bg-base-300 rounded-box flex-grow p-4 mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Active Manpower by Department
          </h3>
          <ul className="space-y-2">
            {/* map over 'Object.entries(departmentCount)', to only show the data which got any number count */}
            {/* "object.entries()" is used to convert the a object into an array of key-value pairs. So, we can access both the name and its count in each iteration. */}
            {Object.entries(departmentCount).map(([department, count]) => (
              <li
                key={department}
                className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm"
              >
                {/* Display the department name */}
                <span>{department}</span>
                {/* Display the count of employees for the current department */}
                <span>{count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="divider divider-horizontal"></div>

        {/* Section for Designations */}
        <div className="card bg-base-300 rounded-box flex-grow p-4 mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Active Manpower by Designation
          </h3>
          <ul className="space-y-2">
            {/* map over 'Object.entries(designationCount)', to only show the data which got any number count */}
            {/* "object.entries()" is used to convert the a object into an array of key-value pairs. So, we can access both the name and its count in each iteration. */}
            {Object.entries(designationCount).map(([designation, count]) => (
              <li
                key={designation}
                className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm"
              >
                {/* Display the designation name */}
                <span>{designation}</span>
                {/* Display the count of employees for the current designation */}
                <span>{count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="divider divider-horizontal"></div>

        {/* Section for Job Locations */}
        <div className="card bg-base-300 rounded-box flex-grow p-4 mb-4">
          <h3 className="text-lg font-semibold mb-2">
            Active Manpower by Job Location
          </h3>
          <ul className="space-y-2">
            {/* map over 'Object.entries(jobLocationCount)', to only show the data which got any number count */}
            {/* "object.entries()" is used to convert the a object into an array of key-value pairs. So, we can access both the name and its count in each iteration. */}
            {Object.entries(jobLocationCount).map(([jobLocation, count]) => (
              <li
                key={jobLocation}
                className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm"
              >
                {/* Display the jobLocation name */}
                <span>{jobLocation}</span>
                {/* Display the count of employees for the current jobLocation */}
                <span>{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManpowerStatus;
