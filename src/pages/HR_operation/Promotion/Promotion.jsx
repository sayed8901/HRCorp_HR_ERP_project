import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../utilities/LoadingSpinner";
import useEmployeesData from "../../../utilities/dataFetches/useAllEmployeesData";
import PromotionModal from "./PromotionModal";
import useTitle from "../../../utilities/useTitle";

const Promotion = () => {
  useTitle("Promotion");

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

  const handlePromote = async (employee_id, promotionData) => {
    // console.log("promotion btn clicked");

    setIsProcessing(true);
    setModalError(""); // Clear any previous errors

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/promotion/promote/?employee_id=${employee_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(promotionData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || "Failed to make job promotion for the employee."
        );
      }

      // Show success toast message
      toast.success("Job promotion was successful!");

      // Delay page refresh to allow toast to be shown
      setTimeout(() => {
        navigate(0);
      }, 1000); // Adjust delay as needed
    } catch (error) {
      setModalError(
        error.message || "An error occurred while processing the job promotion."
      );
      toast.error("Failed to make job promotion for the employee."); // Show error toast message
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
                All ({allActiveEmployeesInfo?.length}) Active Employee
              </span>{" "}
              List
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

                  <td className="border border-gray-300">Is Confirmed</td>
                  <td className="border border-gray-300">
                    Confirmation Effective Date
                  </td>
                  <td className="border border-gray-300">
                    Last Promotion Date
                  </td>

                  <td className="border border-gray-300">Salary Grade</td>
                  <td className="border border-gray-300">Starting Basic</td>
                  <td className="border border-gray-300">Salary Step</td>
                  <td className="border border-gray-300">Effective Basic</td>
                  <td className="border border-gray-300">House Rent</td>
                  <td className="border border-gray-300">Medical</td>
                  <td className="border border-gray-300">Conveyance</td>
                  <td className="border border-gray-300">Hardship</td>
                  <td className="border border-gray-300">PF Contribution</td>
                  <td className="border border-gray-300">Gross Salary</td>
                  <td>PF Deduction</td>
                  <td className="border border-gray-300">SWF Deduction</td>
                  <td className="border border-gray-300">Tax Deduction</td>
                  <td className="border border-gray-300">Net Salary</td>

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
                      {formatDate(employee?.employment_info?.joining_date)}
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
                      {employee?.salary_info?.salary_grade}
                    </td>
                    <td className="border border-gray-300">
                      {employee?.salary_info?.starting_basic}
                    </td>
                    <td className="border border-gray-300">
                      {employee?.salary_info?.salary_step}
                    </td>
                    <td className="border border-gray-300">
                      {employee?.salary_info?.effective_basic}
                    </td>
                    <td className="border border-gray-300">
                      {employee?.salary_info?.house_rent}
                    </td>
                    <td className="border border-gray-300">
                      {employee?.salary_info?.medical_allowance}
                    </td>
                    <td className="border border-gray-300">
                      {employee?.salary_info?.conveyance}
                    </td>
                    <td className="border border-gray-300">
                      {employee?.salary_info?.hardship}
                    </td>
                    <td className="border border-gray-300">
                      {employee?.salary_info?.pf_contribution}
                    </td>
                    <td className="border border-gray-300">
                      {employee?.salary_info?.gross_salary}
                    </td>
                    <td className="border border-gray-300">
                      {employee?.salary_info?.pf_deduction}
                    </td>
                    <td className="border border-gray-300">
                      {employee?.salary_info?.swf_deduction}
                    </td>
                    <td className="border border-gray-300">
                      {employee?.salary_info?.tax_deduction}
                    </td>
                    <td className="border border-gray-300">
                      {employee?.salary_info?.net_salary}
                    </td>

                    <td className="border border-gray-300">
                      {employee?.job_profile_details}
                    </td>
                    <th className="border border-gray-300">
                      <button
                        className="btn btn-xs btn-outline btn-accent h-10"
                        onClick={() => handleOpenModal(employee)}
                      >
                        Promotion
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
          <PromotionModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onPromote={handlePromote}
            employee={selectedEmployee}
            isProcessing={isProcessing}
            error={modalError}
          />
        )}
      </div>
    </div>
  );
};

export default Promotion;
