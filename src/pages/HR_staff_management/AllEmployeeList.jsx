import LoadingSpinner from "../../utilities/LoadingSpinner";
import useEmployeesData from "../../utilities/dataFetches/useAllEmployeesData";
import EmployeeInfoTable from "../reports/reports_utility_components/EmployeeInfoTable";

const AllEmployeeList = () => {
  const { allEmployeesFullInfo, loading, error } = useEmployeesData();
  // console.log(allEmployeesFullInfo);

  return (
    <div className="container mx-auto px-2 sm:px-0 mt-16 mb-10">
      <div className="w-full mx-auto px-5 my-10">
        {loading && <LoadingSpinner />}

        {/* Display error messages */}
        {error && (
          <div className="mt-6 text-center text-base text-red-600">{error}</div>
        )}

        {/* All Employee table */}
        <div className="my-10">
          <EmployeeInfoTable
            allEmployeesFullInfo={allEmployeesFullInfo}
            reportType="all_employees"
          ></EmployeeInfoTable>
        </div>
      </div>
    </div>
  );
};

export default AllEmployeeList;
