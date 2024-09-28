import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../utilities/LoadingSpinner";
import useEmployeesData from "../../../utilities/dataFetches/useAllEmployeesData";
import SeparationModal from "./SeparationModal";
import useTitle from "../../../utilities/useTitle";

const Separation = () => {
  useTitle("Separation");

  const navigate = useNavigate();
  const { allActiveEmployeesInfo, loading, error } = useEmployeesData();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalError, setModalError] = useState("");

  //   console.log(allActiveEmployeesInfo);

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

  return (
    <div>
      <div className="container mx-auto px-2 sm:px-0 mt-16 mb-10">
        <div className="w-full mx-auto px-5 my-10">
          <div className="px-4 sm:px-0">
            <h2 className="w-full sm:w-1/2 mx-auto text-center text-3xl font-semibold leading-8 mb-10">
              <span className="text-gradient">
                All ({allActiveEmployeesInfo?.length}) Active Employees
              </span>{" "}
              List
            </h2>
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
                  <th>ID</th>
                  <td>Status</td>
                  <td>Name</td>
                  <td>Designation</td>
                  <td>Department</td>
                  <td>Location</td>
                  <td>Joining Date</td>

                  <td>Is Confirmed</td>
                  <td>Confirmation Effective Date</td>
                  <td>Last Promotion Date</td>

                  <td>Separation Type</td>
                  <td>Cause of Separation</td>
                  <td>Separation Application Date</td>
                  <td>Separation Effective Date</td>

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

                    <td>
                      {employee?.salary_info?.is_confirmed ? "Yes" : "No"}
                    </td>
                    <td>
                      {employee?.employment_info?.confirmation_effective_date}
                    </td>
                    <td>
                      {employee?.last_promotion?.promotion_effective_date}
                    </td>

                    <td>{employee?.separation_info?.separation_type}</td>
                    <td>{employee?.separation_info?.cause_of_separation}</td>
                    <td>
                      {employee?.separation_info?.application_submission_date}
                    </td>
                    <td>{employee?.separation_info?.separation_effect_date}</td>

                    <td>{employee?.job_profile_details}</td>
                    <th>
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
