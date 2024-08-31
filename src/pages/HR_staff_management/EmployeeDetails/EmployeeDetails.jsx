import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useEmployeesData from "../../../utilities/dataFetches/useAllEmployeesData";
import LoadingSpinner from "../../../utilities/LoadingSpinner";
import EmployeeDetailsTab from "./EmployeeDetailsTab";
import NotFoundPage from "../../NotFoundPage";

const EmployeeDetails = () => {
  const { employee_id: urlEmployeeId } = useParams();
  const [searchId, setSearchId] = useState(urlEmployeeId || ""); // Initialize with URL param if available
  const [submittedId, setSubmittedId] = useState(""); // Track the submitted search ID
  const navigate = useNavigate();

  // Fetch all the employees full info data
  const {
    allEmployeesFullInfo,
    loading: employeeLoading,
    error: employeeError,
  } = useEmployeesData();

  // Handle search button click
  const handleSearch = () => {
    if (searchId.trim()) {
      setSubmittedId(searchId); // Update the submitted ID
      navigate(`/employee_details/${searchId}`);
    }
  };

  // Check if employee exists based on the submitted ID
  const employee = allEmployeesFullInfo.find(
    (emp) => emp.employee_id === submittedId
  );

  useEffect(() => {
    if (urlEmployeeId) {
      setSearchId(urlEmployeeId);
      setSubmittedId(urlEmployeeId); // Set submitted ID on URL change
    }
  }, [urlEmployeeId]);

  if (employeeLoading) return <LoadingSpinner />;
  if (employeeError) return <div>Error: {employeeError}</div>;

  // Show Not Found page only if the search has been submitted
  if (!employee && submittedId)
    return (
      <div className="flex items-center justify-center">
        <NotFoundPage title="Employee"></NotFoundPage>
      </div>
    );

  return (
    <div className="container mx-auto px-2 sm:px-0 mt-16 mb-10">
      <div className="w-full mx-auto px-5 my-10">
        <div className="px-4 sm:px-0">
          {submittedId && employee && (
            <h2 className="text-center text-3xl font-semibold leading-8 mb-10">
              Employee Details for
              <span className="text-gradient">
                {employee.personal_info.first_name}{" "}
                {employee.personal_info.name} (ID#
                {employee.personal_info.employee})
              </span>
            </h2>
          )}
        </div>

        {/* Search field */}
        <div className="flex items-center justify-center mb-12">
          <div className="join rounded-l-full">
            <input
              className="input input-bordered join-item"
              placeholder="Employee ID"
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button
              className="btn join-item rounded-r-full"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {/* Using tabs component */}
        {submittedId && <EmployeeDetailsTab employee_id={submittedId} />}
      </div>
    </div>
  );
};

export default EmployeeDetails;
