import { useState } from "react";
import useEmployeesData from "../../utilities/dataFetches/useAllEmployeesData";
import LoadingSpinner from "../../utilities/LoadingSpinner";
import DateSelector from "./reports_utility_components/DateSelectorComponent";
import calculateCounts from "../../utilities/CalculateUtils/employeeCalculateCounts";
import getDatesForDuration from "../../utilities/CalculateUtils/useGetDatesForDuration";
import StatisticsCard from "./reports_utility_components/StaticticsCard";

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

  // Filter employees based on selected duration
  const { startDate, endDate } = getDatesForDuration(selectedDuration);
  const filteredStaff = filterByJoiningDate(startDate, endDate);

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
        <DateSelector
          selectedDuration={selectedDuration}
          onChange={setSelectedDuration}
        />
      </div>

      <div className="flex flex-col md:flex-row w-full">
        {/* Section for Departments */}
        <StatisticsCard
          title="Joined (in Selected Duration) by Department"
          data={departmentCount}
        />

        <div className="divider divider-horizontal"></div>

        {/* Section for Designations */}
        <StatisticsCard
          title="Joined (in Selected Duration) by Designation"
          data={designationCount}
        />

        <div className="divider divider-horizontal"></div>

        {/* Section for Job Locations */}
        <StatisticsCard
          title="Joined (in Selected Duration) by Job Location"
          data={jobLocationCount}
        />
      </div>
    </div>
  );
};

export default JoiningReport;
