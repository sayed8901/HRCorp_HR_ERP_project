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
        startDate = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the current month
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the current month
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
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 2, 31);
        break;
      case "2nd_QTR":
        startDate = new Date(today.getFullYear(), 3, 1);
        endDate = new Date(today.getFullYear(), 5, 30);
        break;
      case "3rd_QTR":
        startDate = new Date(today.getFullYear(), 6, 1);
        endDate = new Date(today.getFullYear(), 8, 30);
        break;
      case "4th_QTR":
        startDate = new Date(today.getFullYear(), 9, 1);
        endDate = new Date(today.getFullYear(), 11, 31);
        break;
      case "1st_year_half":
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 5, 30);
        break;
      case "2nd_year_half":
        startDate = new Date(today.getFullYear(), 6, 1);
        endDate = new Date(today.getFullYear(), 11, 31);
        break;
      case "Full_year":
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 11, 31);
        break;
      case "January":
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 0, 31);
        break;
      case "February":
        startDate = new Date(today.getFullYear(), 1, 1);
        endDate = new Date(today.getFullYear(), 1, 29); // Leap year handling not included
        break;
      case "March":
        startDate = new Date(today.getFullYear(), 2, 1);
        endDate = new Date(today.getFullYear(), 2, 31);
        break;
      case "April":
        startDate = new Date(today.getFullYear(), 3, 1);
        endDate = new Date(today.getFullYear(), 3, 30);
        break;
      case "May":
        startDate = new Date(today.getFullYear(), 4, 1);
        endDate = new Date(today.getFullYear(), 4, 31);
        break;
      case "June":
        startDate = new Date(today.getFullYear(), 5, 1);
        endDate = new Date(today.getFullYear(), 5, 30);
        break;
      case "July":
        startDate = new Date(today.getFullYear(), 6, 1);
        endDate = new Date(today.getFullYear(), 6, 31);
        break;
      case "August":
        startDate = new Date(today.getFullYear(), 7, 1);
        endDate = new Date(today.getFullYear(), 7, 31);
        break;
      case "September":
        startDate = new Date(today.getFullYear(), 8, 1);
        endDate = new Date(today.getFullYear(), 8, 30);
        break;
      case "October":
        startDate = new Date(today.getFullYear(), 9, 1);
        endDate = new Date(today.getFullYear(), 9, 31);
        break;
      case "November":
        startDate = new Date(today.getFullYear(), 10, 1);
        endDate = new Date(today.getFullYear(), 10, 30);
        break;
      case "December":
        startDate = new Date(today.getFullYear(), 11, 1);
        endDate = new Date(today.getFullYear(), 11, 31);
        break;
      default:
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 11, 31);
        break;
    }
    return {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };
  };

  // Filter employees based on selected duration
  const { startDate, endDate } = getDatesForDuration(selectedDuration);
  const filteredStaff = filterByJoiningDate(startDate, endDate);

  // Calculate counts
  const calculateCounts = (filteredStaff) => {
    const departmentCount = {};
    const designationCount = {};
    const jobLocationCount = {};

    filteredStaff.forEach((employee) => {
      const department = employee.employment_info.department || "Unknown";
      const designation = employee.employment_info.designation || "Unknown";
      const jobLocation = employee.employment_info.job_location || "Unknown";

      departmentCount[department] = (departmentCount[department] || 0) + 1;
      designationCount[designation] = (designationCount[designation] || 0) + 1;
      jobLocationCount[jobLocation] = (jobLocationCount[jobLocation] || 0) + 1;
    });

    return { departmentCount, designationCount, jobLocationCount };
  };

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
            {Object.entries(departmentCount).map(([department, count]) => (
              <li
                key={department}
                className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm"
              >
                <span>{department}</span>
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
            {Object.entries(designationCount).map(([designation, count]) => (
              <li
                key={designation}
                className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm"
              >
                <span>{designation}</span>
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
            {Object.entries(jobLocationCount).map(([jobLocation, count]) => (
              <li
                key={jobLocation}
                className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm"
              >
                <span>{jobLocation}</span>
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
