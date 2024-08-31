import { useState, useEffect } from "react";

const useEmployeesData = () => {
  const [allEmployeesFullInfo, setAllEmployeesFullInfo] = useState([]);
  const [allPersonalInfo, setAllPersonalInfo] = useState([]);
  const [allEmploymentInfo, setAllEmploymentInfo] = useState([]);
  const [allSalaryInfo, setAllSalaryInfo] = useState([]);
  const [allJobProfileHistory, setAllJobProfileHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function to fetch and combine data
    const fetchAndCombineData = async () => {
      try {
        // Fetch all employee IDs
        const employeesResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/employee/list/`
        );
        const employeeIDs = await employeesResponse.json();

        // Fetch personal info
        const personalInfoResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/employment/personal_info/list/`
        );
        const personalInfo = await personalInfoResponse.json();
        setAllPersonalInfo(personalInfo);

        // Fetch employment info
        const employmentInfoResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/employment/employment_info/list/`
        );
        const employmentInfo = await employmentInfoResponse.json();
        setAllEmploymentInfo(employmentInfo);

        // Fetch salary info
        const salaryInfoResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/salary/salary_info/list/`
        );
        const salaryInfo = await salaryInfoResponse.json();
        setAllSalaryInfo(salaryInfo);

        // Fetch job profile history
        const profileInfoResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/job_profile_history/list/`
        );
        const profileInfo = await profileInfoResponse.json();
        setAllJobProfileHistory(profileInfo);

        // Combine data (via searching by employee_ID)
        const combinedData = employeeIDs.map((employee) => {
          const personal =
            personalInfo.find(
              (info) => info.employee === employee.employee_id
            ) || {};
          const employment =
            employmentInfo.find(
              (info) => info.employee === employee.employee_id
            ) || {};
          const salary =
            salaryInfo.find((info) => info.employee === employee.employee_id) ||
            {};

          // Aggregate details text from all job profile entries
          // Step 1: Filter job profile entries by employee ID
          const filteredProfileInfo = profileInfo.filter(
            (info) => info.employee === employee.employee_id
          );
          // Step 2: Add serial number to each profile detail
          const numberedProfileDetails = filteredProfileInfo.map(
            (info, index) => `${index + 1}. ${info.details}`
          );
          // Step 3: Combine all details with a comma separator
          const jobProfileDetails = numberedProfileDetails.join(" , ");

          return {
            ...employee,
            personal_info: personal,
            employment_info: employment,
            salary_info: salary,
            job_profile_details: jobProfileDetails, // Single field (details field) for concatenated details with serial numbers
          };
        });

        setAllEmployeesFullInfo(combinedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndCombineData();
  }, []);

  if (loading)
    return {
      allEmployeesFullInfo: [],
      allPersonalInfo: [],
      allEmploymentInfo: [],
      allSalaryInfo: [],
      allJobProfileHistory: [],
      loading: true,
      error: null,
    };
  if (error)
    return {
      allEmployeesFullInfo: [],
      allPersonalInfo: [],
      allEmploymentInfo: [],
      allSalaryInfo: [],
      allJobProfileHistory: [],
      loading: false,
      error,
    };

  return {
    allEmployeesFullInfo,
    allPersonalInfo,
    allEmploymentInfo,
    allSalaryInfo,
    allJobProfileHistory,
    loading,
    error,
  };
};

export default useEmployeesData;
