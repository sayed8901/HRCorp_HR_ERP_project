const StatDashboard = () => {
  return (
    <div className="flex flex-col justify-center items-center my-28">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mb-10 text-center text-2xl sm:text-3xl font-semibold leading-9 tracking-tight">
          View
          <span className="text-gradient"> Live Dashboard</span> of Regular HR
          Status
        </h2>
      </div>

      <div className="stats shadow gap-2 md:gap-5">
        <div className="stat gap-1 md:gap-3">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="space-y-5">
            <div className="stat-title">Total Applicant CV</div>
            <div className="stat-value">3K+</div>
          </div>
        </div>

        <div className="stat gap-1 md:gap-3">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div className="space-y-5">
            <div className="stat-title">Active HR Staff</div>
            <div className="stat-value">4,221</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatDashboard;
