import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../utilities/LoadingSpinner";
import useFetch from "../../../utilities/dataFetches/useDataFetchHooks";
import TransferUpdateModal from "../Transfer_list/UpdateTransferModal";

const TransferList = () => {
  const navigate = useNavigate();

  const {
    data: all_transfers,
    error,
    loading,
  } = useFetch(`${import.meta.env.VITE_API_URL}/transfer/list/`);

  const [currentTransferData, setCurrentTransferData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalError, setModalError] = useState("");

  const [employeeData, setEmployeeData] = useState({});

  // Function to fetch personalData and employmentData based on employee_id
  const fetchPersonalAndEmploymentInfo = async (employee_id) => {
    try {
      const [personalResponse, employmentResponse] = await Promise.all([
        fetch(
          `${
            import.meta.env.VITE_API_URL
          }/employment/personal_info/?employee_id=${employee_id}`
        ),
        fetch(
          `${
            import.meta.env.VITE_API_URL
          }/employment/employment_info/?employee_id=${employee_id}`
        ),
      ]);

      if (!personalResponse.ok || !employmentResponse.ok) {
        throw new Error("Failed to fetch employee info.");
      }

      const personalData = await personalResponse.json();
      const employmentData = await employmentResponse.json();

      return {
        personalData: personalData || {},
        employmentData: employmentData || {},
      };
    } catch (error) {
      console.error(`Error fetching data for employee ${employee_id}:`, error);
      return {
        personalData: {},
        employmentData: {},
      }; // Fallback in case of error
    }
  };

  // Fetch the personal & employment data for each employee in the transfer list
  useEffect(() => {
    if (all_transfers) {
      all_transfers.forEach(async (transfer) => {
        const { employee } = transfer;
        const data = await fetchPersonalAndEmploymentInfo(employee);

        setEmployeeData((prev) => ({
          ...prev,
          [employee]: data, // Store data for each employee
        }));
      });
    }
  }, [all_transfers]);

  const token = localStorage.getItem("authToken");
  const user_type = localStorage.getItem("user_type");

  const handleOpenTransferUpdateModal = (transferData) => {
    setCurrentTransferData(transferData);
    setModalError(""); // Clear any previous errors when opening the modal
    setIsModalOpen(true);
  };

  const handleCloseTransferUpdateModal = () => {
    setIsModalOpen(false);
    setCurrentTransferData(null);
  };

  // function to update the transfer
  const handleUpdateTransfer = async (
    employee_id,
    transfer_id,
    transferData
  ) => {
    // console.log("Update transfer btn clicked");

    setIsProcessing(true);
    setModalError(""); // Clear any previous errors

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/transfer/update/?employee_id=${employee_id}&transfer_id=${transfer_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(transferData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update transfer info.");
      }

      // Show success toast message
      toast.success("Transfer info successfully updated!");

      // Delay page refresh to allow toast to be shown
      setTimeout(() => {
        navigate(0);
      }, 1000); // Adjust delay as needed
    } catch (error) {
      setModalError(
        error.message || "An error occurred while updating the transfer."
      );
      toast.error("Failed to update transfer info."); // Show error toast message
    } finally {
      setIsProcessing(false);
      handleCloseTransferUpdateModal(); // Close the modal after processing
    }
  };

  // function to cancel the transfer
  const handleWithdrawTransfer = async (employee_id, transfer_id) => {
    // console.log("Withdraw transfer btn clicked");

    setIsProcessing(true);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/transfer/cancel/?employee_id=${employee_id}&transfer_id=${transfer_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to withdraw transfer.");
      }

      // Show success toast message
      toast.success("Transfer has been cancelled successfully!");

      // Delay page refresh to allow toast to be shown
      setTimeout(() => {
        navigate(0);
      }, 1000); // Adjust delay as needed
    } catch (error) {
      toast.error(`Failed to withdraw transfer. occurred error: ${error}`); // Show error toast message
    } finally {
      setIsProcessing(false);
    }
  };

  // Helper function to check if transfer effective date is already gone or not
  const isTransferNotOutdated = (transferEffectiveDate) => {
    const effectiveDate = new Date(transferEffectiveDate);
    const currentDate = new Date();
    return effectiveDate >= currentDate;
  };

  return (
    <div className="container mx-auto px-2 sm:px-0 mt-16 mb-10">
      <div className="w-full mx-auto px-5 my-10">
        <div className="px-4 sm:px-0">
          <h2 className="text-center text-3xl font-semibold leading-8 mb-10">
            <span className="text-gradient">All Transfer</span> List
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
                <th>Transfer ID</th>
                <th>Employee ID</th>
                <td>Name</td>
                <td>Designation</td>

                <td>Transfer from location</td>
                <td>Transfer to location</td>
                <td>Transfer from department</td>
                <td>Transfer to department</td>
                <td>Effective date</td>

                <th>Transfer Update/ cancel</th>
              </tr>
            </thead>
            <tbody>
              {all_transfers?.map((transferData, index) => {
                const employee_id = transferData?.employee;
                const employeeInfo = employeeData[employee_id] || {};
                const name = employeeInfo?.personalData?.name || "Loading...";
                const designation =
                  employeeInfo?.employmentData?.designation || "Loading...";

                return (
                  <tr
                    key={transferData?.id}
                    // here, length - 1 is used not to apply bottom border for the very last line of the table
                    className={`hover ${
                      index < all_transfers.length - 1
                        ? "border-b-2 border-indigo-300"
                        : ""
                    }`}
                  >
                    <th>{transferData?.id}</th>
                    <th>{employee_id}</th>
                    <td>{name}</td>
                    <td>{designation}</td>

                    <td>{transferData?.transfer_from_location}</td>
                    <td>{transferData?.transfer_to_location}</td>
                    <td>{transferData?.transfer_from_department}</td>
                    <td>{transferData?.transfer_to_department}</td>
                    <td>{transferData?.transfer_effective_date}</td>

                    {/* Checking if transfer is not outdated and if the user is power_user */}
                    {isTransferNotOutdated(
                      transferData?.transfer_effective_date
                    ) ? (
                      <>
                        {user_type === "power_user" ? (
                          <th className="flex flex-col gap-2 items-center">
                            <button
                              className="btn btn-xs btn-outline btn-accent w-32"
                              onClick={() =>
                                handleOpenTransferUpdateModal(transferData)
                              }
                            >
                              Update Transfer
                            </button>
                            <button
                              className="btn btn-xs btn-outline btn-secondary"
                              onClick={() =>
                                handleWithdrawTransfer(
                                  transferData.employee,
                                  transferData.id
                                )
                              }
                            >
                              Withdraw Transfer
                            </button>
                          </th>
                        ) : (
                          <th>
                            <div className="text-xsm text-center border border-blue-300 rounded-lg font-normal px-2 py-1">
                              N/A (Only power user can perform update / delete)
                            </div>
                          </th>
                        )}
                      </>
                    ) : (
                      <th className="flex flex-col items-center">
                        <div className="text-xsm text-center border border-red-300 rounded-lg font-normal px-2 py-1">
                          N/A (This Transfer is Already Expired)
                        </div>
                      </th>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <TransferUpdateModal
          isOpen={isModalOpen}
          isProcessing={isProcessing}
          error={modalError}
          transferData={currentTransferData}
          onUpdateTransfer={handleUpdateTransfer}
          onClose={handleCloseTransferUpdateModal}
        />
      </div>
    </div>
  );
};

export default TransferList;
