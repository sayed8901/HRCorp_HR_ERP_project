import LoadingSpinner from "../../utilities/LoadingSpinner";
import useEmployeesData from "../../utilities/dataFetches/useAllEmployeesData";

const AllEmployeeList = () => {

const { allEmployeesFullInfo, loading, error } = useEmployeesData();
console.log(allEmployeesFullInfo);

  return (
    <div className="container mx-auto px-2 sm:px-0 mb-10">
      <div className="w-full mx-auto px-5 my-10">
        <div className="px-4 sm:px-0">
          <h2 className="text-center text-3xl font-semibold leading-8  mb-8">
            <span className="text-gradient">All Employee</span> Info ({allEmployeesFullInfo?.length})
          </h2>
        </div>

        {loading && <LoadingSpinner></LoadingSpinner>}

        {/* Display error messages */}
        {error && (
          <div className="mt-6 text-center text-base text-red-600">
            {error}
          </div>
        )}

        {/* employee table */}
        <div className="overflow-x-auto">
          <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th></th>
                <td>Name</td>
                <td>Job</td>
                <td>company</td>
                <td>location</td>
                <td>Last Login</td>
                <td>Favorite Color</td>
                <td>Name</td>
                <td>Job</td>
                <td>company</td>
                <td>location</td>
                <td>Last Login</td>
                <td>Favorite Color</td>
                <td>Name</td>
                <td>Job</td>
                <td>company</td>
                <td>location</td>
                <td>Last Login</td>
                <td>Favorite Color</td>
                <td>Name</td>
                <td>Job</td>
                <td>company</td>
                <td>location</td>
                <td>Last Login</td>
                <td>Favorite Color</td>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover">
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Littel, Schaden and Vandervort</td>
                <td>Canada</td>
                <td>12/16/2020</td>
                <td>Blue</td>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Littel, Schaden and Vandervort</td>
                <td>Canada</td>
                <td>12/16/2020</td>
                <td>Blue</td>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Littel, Schaden and Vandervort</td>
                <td>Canada</td>
                <td>12/16/2020</td>
                <td>Blue</td>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Littel, Schaden and Vandervort</td>
                <td>Canada</td>
                <td>12/16/2020</td>
                <td>Blue</td>
                <th>1</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllEmployeeList;
