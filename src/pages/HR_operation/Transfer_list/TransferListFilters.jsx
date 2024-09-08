import PropTypes from "prop-types";
import DateSelector from "../../reports/reports_utility_components/DateSelectorComponent";

const TransferFilters = ({
  filterText,
  setFilterText,
  filterDepartment,
  setFilterDepartment,
  filterDesignation,
  setFilterDesignation,
  selectedDuration,
  setSelectedDuration,
  selectedYear,
  setSelectedYear,
}) => {
  return (
    <div>
      {/* Filter input fields */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <input
          type="text"
          placeholder="Filter by 'Name'"
          className="input input-bordered"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by 'Designation'"
          className="input input-bordered"
          value={filterDesignation}
          onChange={(e) => setFilterDesignation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by 'Department'"
          className="input input-bordered"
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        />
      </div>

      <div className="my-6 flex justify-center items-center gap-2">
        {/* Select Option fields for filtering */}
        <DateSelector
          selectedDuration={selectedDuration}
          onChange={setSelectedDuration}
        />
        <input
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          placeholder="Year"
          className="input input-bordered w-32 rounded-r-full"
        />
      </div>
    </div>
  );
};

TransferFilters.propTypes = {
  filterText: PropTypes.string.isRequired,
  setFilterText: PropTypes.func.isRequired,
  filterDepartment: PropTypes.string.isRequired,
  setFilterDepartment: PropTypes.func.isRequired,
  filterDesignation: PropTypes.string.isRequired,
  setFilterDesignation: PropTypes.func.isRequired,
  selectedDuration: PropTypes.string.isRequired,
  setSelectedDuration: PropTypes.func.isRequired,
  selectedYear: PropTypes.number.isRequired,
  setSelectedYear: PropTypes.func.isRequired,
};

export default TransferFilters;
