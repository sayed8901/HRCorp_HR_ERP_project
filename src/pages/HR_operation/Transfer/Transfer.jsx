import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../utilities/LoadingSpinner";
import useEmployeesData from "../../../utilities/dataFetches/useAllEmployeesData";
import TransferModal from "./TransferModal";
import useTitle from "../../../utilities/useTitle";

const Transfer = () => {
  useTitle("Transfer");

  const navigate = useNavigate();
  const { allActiveEmployeesInfo, loading, error } = useEmployeesData();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalError, setModalError] = useState("");

  // for pagination implementations
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  const totalPages = Math.ceil(allActiveEmployeesInfo.length / itemsPerPage);

  const currentEmployees = allActiveEmployeesInfo.slice(
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
  const handleOpenModal = (employee) => {
    setSelectedEmployee(employee);
    setModalError(""); // Clear any previous errors when opening the modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const token = localStorage.getItem("authToken");

  const handleTransfer = async (employee_id, transferData) => {
    // console.log("transfer btn clicked");

    setIsProcessing(true);
    setModalError(""); // Clear any previous errors

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/transfer/?employee_id=${employee_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(transferData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to transfer employee.");
      }

      // Show success toast message
      toast.success("Employee transfer was successful!");

      // Delay page refresh to allow toast to be shown
      setTimeout(() => {
        navigate(0);
      }, 1000); // Adjust delay as needed
    } catch (error) {
      setModalError(
        error.message || "An error occurred while processing the transfer."
      );
      toast.error("Failed to transfer employee."); // Show error toast message
    } finally {
      setIsProcessing(false);
      handleCloseModal(); // Close the modal after processing
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-0 mt-16 mb-10">
      <div className="w-full mx-auto px-5 my-10">
        <div className="px-4 sm:px-0">
          <h2 className="text-center text-3xl font-semibold leading-8 mb-10">
            <span className="text-gradient">
              All ({allActiveEmployeesInfo?.length}) Active Employee
            </span>{" "}
            Info
          </h2>
        </div>

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
          <div className="mt-6 text-center text-base text-red-600">{error}</div>
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
                <td className="border border-gray-300">Probation (months)</td>
                <td className="border border-gray-300">Is_confirmed</td>
                <td className="border border-gray-300">Permanent Address</td>
                <td className="border border-gray-300">Present Address</td>

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
                  // here, length - 1 is used not to apply bottom border for the very last line of the table
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
                    {employee?.employment_info?.joining_date}
                  </td>
                  <td className="border border-gray-300">
                    {employee?.employment_info?.probation_period_months}
                  </td>
                  <td className="border border-gray-300">
                    {employee?.employment_info?.is_confirmed ? "Yes" : "No"}
                  </td>
                  <td className="border border-gray-300">
                    {employee?.personal_info?.permanent_address}
                  </td>
                  <td className="border border-gray-300">
                    {employee?.personal_info?.present_address}
                  </td>

                  <td className="border border-gray-300">
                    {employee?.job_profile_details}
                  </td>
                  <th className="border border-gray-300">
                    <button
                      className="btn btn-xs btn-outline btn-accent h-10"
                      onClick={() => handleOpenModal(employee)}
                    >
                      Transfer
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

      <TransferModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTransfer={handleTransfer}
        employee={selectedEmployee}
        isProcessing={isProcessing}
        error={modalError}
      />
    </div>
  );
};

export default Transfer;
