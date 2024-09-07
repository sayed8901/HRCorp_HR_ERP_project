import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../utilities/LoadingSpinner";
import useEmployeesData from "../../../utilities/dataFetches/useAllEmployeesData";
import JobConfirmationModal from "./JobConfirmationModal";

const JobConfirmation = () => {
  const navigate = useNavigate();
  const { allActiveEmployeesInfo, loading, error } = useEmployeesData();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalError, setModalError] = useState("");

  const allNonConfirmedActiveStaffList = allActiveEmployeesInfo.filter(
    (employee) => employee.employment_info.is_confirmed === false
  );

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

  const handleConfirm = async (employee_id, confirmationData) => {
    // console.log("confirm btn clicked");

    setIsProcessing(true);
    setModalError(""); // Clear any previous errors

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/confirmation/confirm/?employee_id=${employee_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(confirmationData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail ||
            "Failed to make job confirmation for the employee."
        );
      }

      // Show success toast message
      toast.success("Job confirmation was successful!");

      // Delay page refresh to allow toast to be shown
      setTimeout(() => {
        navigate(0);
      }, 1000); // Adjust delay as needed
    } catch (error) {
      setModalError(
        error.message ||
          "An error occurred while processing the job confirmation."
      );
      toast.error("Failed to make job confirmation for the employee."); // Show error toast message
    } finally {
      setIsProcessing(false);
      handleCloseModal(); // Close the modal after processing
    }
  };

  return (
    <div>
      {loading ? (
        <div className="my-32">
          <LoadingSpinner />
        </div>
      ) : allNonConfirmedActiveStaffList.length > 0 ? (
        <div className="container mx-auto px-2 sm:px-0 mt-16 mb-10">
          <div className="w-full mx-auto px-5 my-10">
            <div className="px-4 sm:px-0">
              <h2 className="w-full sm:w-1/2 mx-auto text-center text-3xl font-semibold leading-8 mb-10">
                <span className="text-gradient">
                  All ({allNonConfirmedActiveStaffList?.length}) Active Employee
                </span>{" "}
                List to Make Job Confirmation
              </h2>
            </div>

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
                    <td>Probation (months)</td>
                    <td>Tentative Confirm Date</td>
                    <td>Is Confirmed</td>
                    <td>Confirmation Effective Date</td>

                    <td>Salary Grade</td>
                    <td>Starting Basic</td>
                    <td>Salary Step</td>
                    <td>Effective Basic</td>
                    <td>House Rent</td>
                    <td>Medical</td>
                    <td>Conveyance</td>
                    <td>Hardship</td>
                    <td>PF Contribution</td>
                    <td>Gross Salary</td>
                    <td>PF Deduction</td>
                    <td>SWF Deduction</td>
                    <td>Tax Deduction</td>
                    <td>Net Salary</td>
                    <td>Consolidated Salary</td>

                    <td>
                      Job Profile Details of The Employee Describing The Full
                      History of The Employee During His Employment
                    </td>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allNonConfirmedActiveStaffList?.map((employee, index) => (
                    <tr
                      key={employee?.employee_id} // here, length - 1 is used not to apply bottom border for the very last line of the table
                      className={`hover ${
                        index < allNonConfirmedActiveStaffList.length - 1
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
                        {employee?.employment_info?.probation_period_months}
                      </td>
                      <td>
                        {employee?.employment_info?.tentative_confirmation_date}
                      </td>
                      <td>
                        {employee?.salary_info?.is_confirmed ? "Yes" : "No"}
                      </td>
                      <td>
                        {employee?.employment_info?.confirmation_effective_date}
                      </td>

                      <td>{employee?.salary_info?.salary_grade}</td>
                      <td>{employee?.salary_info?.starting_basic}</td>
                      <td>{employee?.salary_info?.salary_step}</td>
                      <td>{employee?.salary_info?.effective_basic}</td>
                      <td>{employee?.salary_info?.house_rent}</td>
                      <td>{employee?.salary_info?.medical_allowance}</td>
                      <td>{employee?.salary_info?.conveyance}</td>
                      <td>{employee?.salary_info?.hardship}</td>
                      <td>{employee?.salary_info?.pf_contribution}</td>
                      <td>{employee?.salary_info?.gross_salary}</td>
                      <td>{employee?.salary_info?.pf_deduction}</td>
                      <td>{employee?.salary_info?.swf_deduction}</td>
                      <td>{employee?.salary_info?.tax_deduction}</td>
                      <td>{employee?.salary_info?.net_salary}</td>
                      <td>{employee?.salary_info?.consolidated_salary}</td>

                      <td>{employee?.job_profile_details}</td>
                      <th>
                        <button
                          className="btn btn-xs btn-outline btn-accent h-10"
                          onClick={() => handleOpenModal(employee)}
                        >
                          Confirm Job
                        </button>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {isModalOpen && (
            <JobConfirmationModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onConfirm={handleConfirm}
              employee={selectedEmployee}
              isProcessing={isProcessing}
              error={modalError}
            />
          )}
        </div>
      ) : (
        <div className="hero flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center text-3xl font-semibold leading-8 space-y-5">
            <p className="text-gradient">No Active Employees </p>
            <p>
              to <span className="text-gradient">confirm</span> right now!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobConfirmation;