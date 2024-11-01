import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../utilities/LoadingSpinner";
import useEmployeesData from "../../../utilities/dataFetches/useAllEmployeesData";
import SeparationModal from "./SeparationModal";
import useTitle from "../../../utilities/useTitle";

import MultipleInputFilters from "../../HR_staff_management/AllEmployeeList/CustomMultipleFilters";
import getDatesForDuration from "../../../utilities/CalculateUtils/useGetDatesForDuration";

const Separation = () => {
  useTitle("Separation");

  const navigate = useNavigate();

  const { allActiveEmployeesInfo, loading, error } = useEmployeesData();

  // Set up states for each filter
  const [filterID, setFilterID] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterDesignation, setFilterDesignation] = useState("");
  const [filterJobLocation, setFilterJobLocation] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Helper function to filter employees by joining date
  const filterByJoiningDate = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return allActiveEmployeesInfo?.filter((employee) => {
      const joiningDate = new Date(employee?.employment_info?.joining_date);
      return joiningDate >= start && joiningDate <= end;
    });
  };

  // Get startDate and endDate for selected duration and year
  const { startDate, endDate } = getDatesForDuration(
    selectedDuration,
    selectedYear
  );

  // Filter employees based on joining date and other filters
  const filteredEmployees = filterByJoiningDate(startDate, endDate)?.filter(
    (employee) => {
      const employee_id = employee?.employee_id;
      const name = employee?.personal_info?.name?.toLowerCase() || "";
      const designation =
        employee?.employment_info?.designation?.toLowerCase() || "";
      const department =
        employee?.employment_info?.department?.toLowerCase() || "";
      const jobLocation =
        employee?.employment_info?.jobLocation?.toLowerCase() || "";

      // Apply filters
      return (
        (filterID ? employee_id.toString() === filterID : true) &&
        name.includes(filterName.toLowerCase()) &&
        designation.includes(filterDesignation.toLowerCase()) &&
        department.includes(filterDepartment.toLowerCase()) &&
        jobLocation.includes(filterJobLocation.toLowerCase())
      );
    }
  );

  // console.log(filteredEmployees);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalError, setModalError] = useState("");

  // for pagination implementations
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // to handle next & prev btn
  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  // function to set the items per page dynamically as the user wants
  const handleItemsPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page after changing items per page
  };

  // for modal activity
  const handleOpenModal = async (employee) => {
    setSelectedEmployee(employee);
    setModalError(""); // Clear any previous errors when opening the modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const token = localStorage.getItem("authToken");

  const handleSeparation = async (employee_id, separationData) => {
    // console.log("separation BTN clicked");

    setIsProcessing(true);
    setModalError(""); // Clear any previous errors

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/separation/deactivate/?employee_id=${employee_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(separationData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail ||
            "Failed to process the separation for the employee."
        );
      }

      // Show success toast message
      toast.success("Employee separation was successful!");

      // Delay page refresh to allow toast to be shown
      setTimeout(() => {
        navigate(0);
      }, 1000); // Adjust delay as needed
    } catch (error) {
      setModalError(
        error.message || "An error occurred while processing the separation."
      );
      toast.error("Failed to process the separation for the employee."); // Show error toast message
    } finally {
      setIsProcessing(false);
      handleCloseModal(); // Close the modal after processing
    }
  };

  // Helper function to format date into dd-mm-yyy form
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  return (
    <div>
      <div className="container mx-auto px-2 sm:px-0 mt-16 mb-10">
        <div className="w-full mx-auto px-5 my-10">
          <div className="px-4 sm:px-0">
            <h2 className="w-full sm:w-1/2 mx-auto text-center text-3xl font-semibold leading-8 mb-10">
              <span className="text-gradient">
                All ({filteredEmployees?.length}) Active Employees
              </span>{" "}
              List
            </h2>
          </div>

          {/* Use CustomMultipleFilters for filtering */}
          <MultipleInputFilters
            // for ID filtering
            filterID={filterID}
            setFilterID={setFilterID}
            // for name filtering
            filterName={filterName}
            setFilterName={setFilterName}
            // for description filtering
            filterDepartment={filterDepartment}
            setFilterDepartment={setFilterDepartment}
            // for designation filtering
            filterDesignation={filterDesignation}
            setFilterDesignation={setFilterDesignation}
            // for job location filtering
            filterJobLocation={filterJobLocation}
            setFilterJobLocation={setFilterJobLocation}
            // for month & duration filtering
            selectedDuration={selectedDuration}
            setSelectedDuration={setSelectedDuration}
            // for year filtering
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />

          <div className="my-6 flex justify-end mx-2 sm:mr-10">
            <label>
              Items per page:
              <input
                type="number"
                min="1"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="ml-2 p-1 border rounded w-20"
              />
            </label>
          </div>

          {/* to show loading spinner while loading */}
          {loading && <LoadingSpinner />}

          {/* showing error messages */}
          {error && (
            <div className="mt-6 text-center text-base text-red-600">
              {error}
            </div>
          )}

          <div className="overflow-x-auto w-11/12 mx-auto">
            <table className="table table-xs table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  <th className="border border-gray-300">ID</th>
                  <td className="border border-gray-300">Status</td>
                  <td className="border border-gray-300">Name</td>
                  <td className="border border-gray-300">Designation</td>
                  <td className="border border-gray-300">Department</td>
                  <td className="border border-gray-300">Location</td>
                  <td className="border border-gray-300">Joining Date</td>

                  <td className="border border-gray-300">Tentative Confirmation Date</td>
                  <td className="border border-gray-300">Is Confirmed</td>
                  <td className="border border-gray-300">
                    Confirmation Effective Date
                  </td>
                  <td className="border border-gray-300">
                    Last Promotion Date
                  </td>

                  <td className="border border-gray-300">Separation Type</td>
                  <td className="border border-gray-300">
                    Cause of Separation
                  </td>
                  <td className="border border-gray-300">
                    Separation Application Date
                  </td>
                  <td className="border border-gray-300">
                    Separation Effective Date
                  </td>

                  <td className="border border-gray-300">
                    Job Profile Details of The Employee Describing The Full
                    History of The Employee During His Employment
                  </td>
                  <th className="border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees?.map((employee, index) => (
                  <tr
                    key={employee?.employee_id}
                    className={`hover ${
                      index < allActiveEmployeesInfo.length - 1
                        ? "border-b-2 border-indigo-300"
                        : ""
                    }`}
                  >
                    <th className="border border-gray-300">
                      {employee?.employee_id}
                    </th>
                    <td className="border border-gray-300">
                      {employee?.employment_info?.status}
                    </td>
                    <td className="border border-gray-300">
                      {employee?.personal_info?.name}
                    </td>
                    <td className="border border-gray-300">
                      {employee?.employment_info?.designation}
                    </td>
                    <td className="border border-gray-300">
                      {employee?.employment_info?.department}
                    </td>
                    <td className="border border-gray-300">
                      {employee?.employment_info?.job_location}
                    </td>
                    <td className="border border-gray-300">
                      {formatDate(employee?.employment_info?.joining_date)}
                    </td>

                    <td className="border border-gray-300">
                      {formatDate(
                        employee?.employment_info?.tentative_confirmation_date
                      )}
                    </td>
                    <td className="border border-gray-300">
                      {employee?.salary_info?.is_confirmed ? "Yes" : "No"}
                    </td>
                    <td className="border border-gray-300">
                      {formatDate(
                        employee?.employment_info?.confirmation_effective_date
                      )}
                    </td>
                    <td className="border border-gray-300">
                      {formatDate(
                        employee?.last_promotion?.promotion_effective_date
                      )}
                    </td>

                    <td className="border border-gray-300">
                      {employee?.separation_info?.separation_type}
                    </td>
                    <td className="border border-gray-300">
                      {employee?.separation_info?.cause_of_separation}
                    </td>
                    <td className="border border-gray-300">
                      {formatDate(
                        employee?.separation_info?.application_submission_date
                      )}
                    </td>
                    <td className="border border-gray-300">
                      {formatDate(
                        employee?.separation_info?.separation_effect_date
                      )}
                    </td>

                    <td className="border border-gray-300">
                      {employee?.job_profile_details}
                    </td>
                    <th className="border border-gray-300">
                      <button
                        className="btn btn-xs btn-outline btn-accent h-10"
                        onClick={() => handleOpenModal(employee)}
                      >
                        Separate
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center items-center mt-4 sm:mt-8">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="btn-sm w-24 px-4 py-1 bg-indigo-500 text-white rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="mx-4">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="btn-sm w-24 px-4 py-1 bg-indigo-500 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>

        {isModalOpen && (
          <SeparationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSeparate={handleSeparation}
            employee={selectedEmployee}
            isProcessing={isProcessing}
            error={modalError}
          />
        )}
      </div>
    </div>
  );
};

export default Separation;
