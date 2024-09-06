import { useState } from "react";
import useEmployeesData from "../../utilities/dataFetches/useAllEmployeesData";
import LoadingSpinner from "../../utilities/LoadingSpinner";

const JoiningReport = () => {
  const { allEmployeesFullInfo, loading, error } = useEmployeesData();
  //   console.log(allEmployeesFullInfo);

  // to track the filter parameter
  const [selectedDuration, setSelectedDuration] = useState("this_month");

  /* Show loading spinner while loading */
  if (loading) {
    return (
      <div className="my-32">
        <LoadingSpinner />
      </div>
    );
  }

  /* Show error messages */
  if (error) {
    return (
      <div className="mt-6 text-center text-base text-red-600">{error}</div>
    );
  }

  // Helper function to filter employees by joining date
  const filterByJoiningDate = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return allEmployeesFullInfo.filter((employee) => {
      const joiningDate = new Date(employee.employment_info.joining_date);
      // getting the number of employee joined within the filtered duration
      return joiningDate >= start && joiningDate <= end;
    });
  };

  // Function to get start and end dates based on selected duration
  const getDatesForDuration = (duration) => {
    const today = new Date();
    let startDate = new Date();
    let endDate = new Date();

    switch (duration) {
      case "this_month":
        // First day of the current month
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        // Last day of the current month
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;

      case "last_month":
        // 'today.getMonth()' returns the current month (0 for January, 1 for February, and so on).
        // Subtracting 1 from it gives the previous month.
        startDate.setMonth(today.getMonth() - 1);

        // This sets the day of the startDate to the 1st day of the month.
        startDate.setDate(1);

        // This line sets the endDate to the last day of the previous month.
        endDate.setDate(0);
        break;

      case "1st_QTR":
        // First day of January
        startDate = new Date(today.getFullYear(), 0, 1);
        // Last day of March
        endDate = new Date(today.getFullYear(), 2, 31);
        break;
      case "2nd_QTR":
        // First day of April
        startDate = new Date(today.getFullYear(), 3, 1);
        // Last day of June
        endDate = new Date(today.getFullYear(), 5, 30);
        break;
      case "3rd_QTR":
        // First day of July
        startDate = new Date(today.getFullYear(), 6, 1);
        // Last day of September
        endDate = new Date(today.getFullYear(), 8, 30);
        break;
      case "4th_QTR":
        // First day of October
        startDate = new Date(today.getFullYear(), 9, 1);
        // Last day of December
        endDate = new Date(today.getFullYear(), 11, 31);
        break;
      case "1st_year_half":
        // First day of January
        startDate = new Date(today.getFullYear(), 0, 1);
        // Last day of June
        endDate = new Date(today.getFullYear(), 5, 30);
        break;
      case "2nd_year_half":
        // First day of July
        startDate = new Date(today.getFullYear(), 6, 1);
        // Last day of December
        endDate = new Date(today.getFullYear(), 11, 31);
        break;
      case "Full_year":
        // First day of January
        startDate = new Date(today.getFullYear(), 0, 1);
        // Last day of December
        endDate = new Date(today.getFullYear(), 11, 31);
        break;

      case "January":
        // First day of January
        startDate = new Date(today.getFullYear(), 0, 1);
        // Last day of January
        endDate = new Date(today.getFullYear(), 0, 31);
        break;

      case "February":
        // First day of February
        startDate = new Date(today.getFullYear(), 1, 1);
        // Last day of February (leap year handling not included)
        endDate = new Date(today.getFullYear(), 1, 29);
        break;

      case "March":
        // First day of March
        startDate = new Date(today.getFullYear(), 2, 1);
        // Last day of March
        endDate = new Date(today.getFullYear(), 2, 31);
        break;

      case "April":
        // First day of April
        startDate = new Date(today.getFullYear(), 3, 1);
        // Last day of April
        endDate = new Date(today.getFullYear(), 3, 30);
        break;

      case "May":
        // First day of May
        startDate = new Date(today.getFullYear(), 4, 1);
        // Last day of May
        endDate = new Date(today.getFullYear(), 4, 31);
        break;

      case "June":
        // First day of June
        startDate = new Date(today.getFullYear(), 5, 1);
        // Last day of June
        endDate = new Date(today.getFullYear(), 5, 30);
        break;

      case "July":
        // First day of July
        startDate = new Date(today.getFullYear(), 6, 1);
        // Last day of July
        endDate = new Date(today.getFullYear(), 6, 31);
        break;

      case "August":
        // First day of August
        startDate = new Date(today.getFullYear(), 7, 1);
        // Last day of August
        endDate = new Date(today.getFullYear(), 7, 31);
        break;

      case "September":
        // First day of September
        startDate = new Date(today.getFullYear(), 8, 1);
        // Last day of September
        endDate = new Date(today.getFullYear(), 8, 30);
        break;

      case "October":
        // First day of October
        startDate = new Date(today.getFullYear(), 9, 1);
        // Last day of October
        endDate = new Date(today.getFullYear(), 9, 31);
        break;

      case "November":
        // First day of November
        startDate = new Date(today.getFullYear(), 10, 1);
        // Last day of November
        endDate = new Date(today.getFullYear(), 10, 30);
        break;

      case "December":
        // First day of December
        startDate = new Date(today.getFullYear(), 11, 1);
        // Last day of December
        endDate = new Date(today.getFullYear(), 11, 31);
        break;

      default:
        // Default to the entire year (from January 1 to December 31)
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 11, 31);
        break;
    }

    // This will return an object with startDate and endDate in 'YYYY-MM-DD' format
    return {
      // Convert the startDate object to ISO string format like: 'YYYY-MM-DDTHH:MM:SSZ',
      // Split it by "T" to separate date and time, and take the date part (before "T")
      startDate: startDate.toISOString().split("T")[0],

      // Similar approach like startDate...
      endDate: endDate.toISOString().split("T")[0],
    };
  };

  // Filter employees based on selected duration
  const { startDate, endDate } = getDatesForDuration(selectedDuration);
  const filteredStaff = filterByJoiningDate(startDate, endDate);

  // Function to calculate the counts of employees by department, designation, and job location
  const calculateCounts = (filteredStaff) => {
    // Objects to hold the counts for each department, designation, and job location
    const departmentCount = {};
    const designationCount = {};
    const jobLocationCount = {};

    // Iterate through the filtered list of staff members (employees)
    filteredStaff.forEach((employee) => {
      // Retrieve department, designation, and job location from employee's employment info
      // If any field is missing or undefined, use "Unknown" as a default value
      const department = employee.employment_info.department || "Unknown";
      const designation = employee.employment_info.designation || "Unknown";
      const jobLocation = employee.employment_info.job_location || "Unknown";

      // Increment the count for the current department
      departmentCount[department] = (departmentCount[department] || 0) + 1;
      // Increment the count for the current designation
      designationCount[designation] = (designationCount[designation] || 0) + 1;
      // Increment the count for the current job location
      jobLocationCount[jobLocation] = (jobLocationCount[jobLocation] || 0) + 1;
    });

    // Return the objects containing the counts for each category
    return { departmentCount, designationCount, jobLocationCount };
  };

  // Destructure the returned counts from the function to use them separately
  const { departmentCount, designationCount, jobLocationCount } =
    calculateCounts(filteredStaff);

  return (
    <div className="mt-16 mb-10 mx-10">
      <div className="sm:mx-auto">
        <h2 className="my-10 text-center text-2xl font-semibold leading-9 tracking-tight">
          You can get <span className="text-gradient">Joining Report</span> by
          various filtering options
        </h2>
      </div>

      <div className="my-6 flex justify-center">
        <select
          value={selectedDuration}
          // to set the filter duration to the setSelectedDuration function
          onChange={(e) => setSelectedDuration(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="this_month">This Month</option>
          <option value="last_month">Last Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
          <option value="1st_QTR">1st Quarter (Jan - Mar)</option>
          <option value="2nd_QTR">2nd Quarter (Apr - Jun)</option>
          <option value="3rd_QTR">3rd Quarter (Jul - Sep)</option>
          <option value="4th_QTR">4th Quarter (Oct - Dec)</option>
          <option value="1st_year_half">
            1st Half of the Year (Jan - Jun)
          </option>
          <option value="2nd_year_half">
            2nd Half of the Year (Jul - Dec)
          </option>
          <option value="Full_year">Full Year</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row w-full">
        {/* Section for Departments */}
        <div className="card bg-base-300 rounded-box flex-grow p-4 mb-4">
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b-2 border-indigo-300">
            Joined (in Selected Duration) by Department
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
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b-2 border-indigo-300">
            Joined (in Selected Duration) by Designation
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
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b-2 border-indigo-300">
            Joined (in Selected Duration) by Job Location
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

export default JoiningReport;
