import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../utilities/LoadingSpinner";
import useEmployeesData from "../../../utilities/dataFetches/useAllEmployeesData";
import TransferModal from "./TransferModal";

const Transfer = () => {
  const navigate = useNavigate();
  const { allActiveEmployeesInfo, loading, error } = useEmployeesData();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalError, setModalError] = useState("");

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
                <th>ID</th>
                <td>Status</td>
                <td>Name</td>
                <td>Designation</td>
                <td>Department</td>
                <td>Location</td>

                <td>Joining Date</td>
                <td>Probation (months)</td>
                <td>Is_confirmed</td>
                <td>Permanent Address</td>
                <td>Present Address</td>

                <td>Job Profile History Details of The Employee</td>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allActiveEmployeesInfo?.map((employee) => (
                <tr key={employee?.employee_id} className="hover">
                  <th>{employee?.employee_id}</th>
                  <td>{employee?.employment_info?.status}</td>
                  <td>{employee?.personal_info?.name}</td>
                  <td>{employee?.employment_info?.designation}</td>
                  <td>{employee?.employment_info?.department}</td>
                  <td>{employee?.employment_info?.job_location}</td>

                  <td>{employee?.employment_info?.joining_date}</td>
                  <td>{employee?.employment_info?.probation_period_months}</td>
                  <td>{employee?.employment_info?.is_confirmed}</td>
                  <td>{employee?.personal_info?.permanent_address}</td>
                  <td>{employee?.personal_info?.present_address}</td>

                  <td>{employee?.job_profile_details}</td>
                  <th>
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
