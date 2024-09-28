import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../utilities/LoadingSpinner";
import useEmployeesData from "../../../utilities/dataFetches/useAllEmployeesData";
import EntryLeaveModal from "./EntryLeaveModal";
import useTitle from "../../../utilities/useTitle";

const EntryLeave = () => {
  useTitle("Entry Leave info");

  const navigate = useNavigate();
  const { allActiveEmployeesInfo, loading, error } = useEmployeesData();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalError, setModalError] = useState("");

  // console.log(allActiveEmployeesInfo);

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

  const handleLeaveEntry = async (employee_id, leaveData) => {
    // console.log("entry_leave btn clicked");

    setIsProcessing(true);
    setModalError(""); // Clear any previous errors

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/leave/?employee_id=${employee_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(leaveData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to record leave.");
      }

      // Show success toast message
      toast.success("Leave entry was successful!");

      // Delay page refresh to allow toast to be shown
      setTimeout(() => {
        navigate(0);
      }, 1000); // Adjust delay as needed
    } catch (error) {
      setModalError(
        error.message || "An error occurred while processing leave entry."
      );
      toast.error("Failed to record leave.");
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
                <td>Probation <br /> (months)</td>
                <td>Is_confirmed</td>

                <td>Sick <br /> leave <br /> balance</td>
                <td>Casual <br /> leave <br /> balance</td>

                <td>Permanent Address</td>
                <td>Present Address</td>

                <td>
                  Job Profile Details of The Employee Describing The Full
                  History of The Employee During His Employment
                </td>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allActiveEmployeesInfo?.map((employee, index) => (
                <tr
                  key={employee?.employee_id}
                  // here, length - 1 is used not to apply bottom border for the very last line of the table
                  className={`hover ${
                    index < allActiveEmployeesInfo.length - 1
                      ? "border-b-2 border-indigo-300"
                      : ""
                  }`}
                >
                  <th>{employee?.employee_id}</th>
                  <td>{employee?.employment_info?.status}</td>
                  <td>{employee?.personal_info?.name}</td>
                  <td>{employee?.employment_info?.designation}</td>
                  <td>{employee?.employment_info?.department}</td>
                  <td>{employee?.employment_info?.job_location}</td>

                  <td>{employee?.employment_info?.joining_date}</td>
                  <td>{employee?.employment_info?.probation_period_months}</td>
                  <td>
                    {employee?.employment_info?.is_confirmed ? "Yes" : "No"}
                  </td>

                  <td>{employee?.salary_info?.sick_leave_balance}</td>
                  <td>{employee?.salary_info?.casual_leave_balance}</td>

                  <td>{employee?.personal_info?.permanent_address}</td>
                  <td>{employee?.personal_info?.present_address}</td>

                  <td>{employee?.job_profile_details}</td>
                  <th>
                    <button
                      className="btn btn-xs btn-outline btn-accent h-10"
                      onClick={() => handleOpenModal(employee)}
                    >
                      Process Leave_Info
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EntryLeaveModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onLeaveEntry={handleLeaveEntry}
        employee={selectedEmployee}
        isProcessing={isProcessing}
        error={modalError}
      />
    </div>
  );
};

export default EntryLeave;
