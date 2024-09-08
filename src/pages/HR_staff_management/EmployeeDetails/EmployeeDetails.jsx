import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useEmployeesData from "../../../utilities/dataFetches/useAllEmployeesData";
import LoadingSpinner from "../../../utilities/LoadingSpinner";
import EmployeeDetailsTab from "./EmployeeDetailsTab";
import UpcomingModule from "../../UpcomingModule";
import SampleKeyboardLayout from "../../../components/SampleKeyboardLayout";

const EmployeeDetails = () => {
  const { employee_id: urlEmployeeId } = useParams();
  const [searchId, setSearchId] = useState(urlEmployeeId || "");
  const [submittedId, setSubmittedId] = useState("");
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
      setSubmittedId(searchId);
      navigate(`/employee_details/${searchId}`);
    }
  };

  // Handle enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const employee = allEmployeesFullInfo
    ? allEmployeesFullInfo.find((emp) => emp.employee_id === submittedId)
    : null;

  useEffect(() => {
    if (urlEmployeeId) {
      setSearchId(urlEmployeeId);
      setSubmittedId(urlEmployeeId);
    }
  }, [urlEmployeeId]);

  if (employeeLoading) return (
    <div className="my-36">
      <LoadingSpinner />
    </div>
  );

  if (employeeError) {
    return (
      <div className="flex items-center justify-center my-28">
        <div className="text-center space-y-5">
          <h2 className="text-2xl font-semibold text-red-600">Error</h2>
          <p className="text-gray-700">
            There was an issue connecting to the server. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // Show Not Found page only if the search has been submitted and no employee found
  if (!employee && submittedId) {
    return (
      <div className="flex items-center justify-center">
        <UpcomingModule title="Employee" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-0 mt-16 mb-10">
      <div className="w-full mx-auto px-5 my-10">
        <div className="px-4 sm:px-0">
          {submittedId && employee ? (
            <h2 className="text-center text-3xl font-semibold leading-8 mb-10">
              Employee Details for
              <span className="text-gradient">
                {employee.personal_info.first_name}{" "}
                {employee.personal_info.name} (ID#
                {employee.personal_info.employee})
              </span>
            </h2>
          ) : (
            <h2 className="text-center text-3xl font-semibold leading-8 mb-10">
              <span className="text-gradient">Search to view details </span>of
              an employee
            </h2>
          )}
        </div>

        {/* Search field */}
        <div className="flex items-center justify-center mb-12">
          <div className="join rounded-l-full">
            <input
              className="input input-bordered join-item"
              placeholder="Start typing Employee ID"
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyDown={handleKeyDown} // Add the onKeyDown event
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
        {submittedId ? (
          <EmployeeDetailsTab employee_id={submittedId} />
        ) : (
          // {/* extra design part */}
          // {/* rendering conditionally the sample keyboard layout */}
          <SampleKeyboardLayout></SampleKeyboardLayout>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
