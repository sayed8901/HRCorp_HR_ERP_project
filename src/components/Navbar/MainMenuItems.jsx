import PropTypes from "prop-types";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const MainMenuItems = ({ user }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuToggle = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <>
      {/* HR Staff Management */}
      <div className="dropdown m-2 w-56 lg:w-24 lg:text-center">
        <div
          tabIndex={0}
          role="button"
          className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
          onClick={() => handleMenuToggle("hrStaffManagement")}
        >
          HR staff management
        </div>
        <ul
          tabIndex={0}
          className={`menu dropdown-content bg-base-100 rounded-box z-[1] p-2 -mt-8 lg:mt-2 shadow-lg space-y-2 ${
            openMenu === "hrStaffManagement" ? "block" : "hidden"
          }`}
          style={{
            position: "absolute",
            top: "100%",
            right: "0",
          }}
        >
          {(user.userType === "standard_user" ||
            user.userType === "power_user") && (
            <li>
              <NavLink
                to="/entry_new_employee"
                className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
              >
                Entry new employee
              </NavLink>
            </li>
          )}
          {(user.userType === "standard_user" ||
            user.userType === "power_user" ||
            user.userType === "employee" ||
            !user.userType) && (
            <>
              <li>
                <NavLink
                  to="/employee_details"
                  className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
                >
                  Employee details
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/all_employee"
                  className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
                >
                  All employee
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/employee_dashboard"
                  className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
                >
                  Employee dashboard
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* HR Operations */}
      {(user.userType === "standard_user" ||
        user.userType === "power_user") && (
        <div className="dropdown m-2 w-56 lg:w-20 lg:text-center">
          <div
            tabIndex={0}
            role="button"
            className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
            onClick={() => handleMenuToggle("hrOperations")}
          >
            HR operation
          </div>
          <ul
            tabIndex={0}
            className={`menu dropdown-content bg-base-100 rounded-box z-[1] p-2 -mt-8 lg:mt-2 shadow-lg space-y-2 ${
              openMenu === "hrOperations" ? "block" : "hidden"
            }`}
            style={{
              position: "absolute",
              top: "100%",
              right: "0",
            }}
          >
            <li>
              <NavLink
                to="/confirmation"
                className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
              >
                Confirmation
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/promotion"
                className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
              >
                Promotion
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/transfer"
                className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
              >
                Transfer
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/training"
                className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
              >
                Training
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/separation"
                className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
              >
                Separation
              </NavLink>
            </li>
            {user.userType === "power_user" && (
              <>
                <li>
                  <NavLink
                    to="/update_transfer"
                    className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
                  >
                    Update transfer
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/transfer_withdraw"
                    className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
                  >
                    Transfer withdraw
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* Reports */}
      {(user.userType === "standard_user" ||
        user.userType === "power_user") && (
        <div className="dropdown m-2 w-56 lg:w-20 lg:text-center">
          <div
            tabIndex={0}
            role="button"
            className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
            onClick={() => handleMenuToggle("reports")}
          >
            Reports
          </div>
          <ul
            tabIndex={0}
            className={`menu dropdown-content bg-base-100 rounded-box z-[1] p-2 -mt-8 lg:mt-2 shadow-lg space-y-2 ${
              openMenu === "reports" ? "block" : "hidden"
            }`}
            style={{
              position: "absolute",
              top: "100%",
              right: "0",
            }}
          >
            <li>
              <NavLink
                to="/joining"
                className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
              >
                Joining
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/separation"
                className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
              >
                Separation
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/confirmation"
                className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
              >
                Confirmation
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/promotion"
                className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
              >
                Promotion
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/transfer"
                className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
              >
                Transfer
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/training"
                className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
              >
                Training
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {/* Payroll Management */}
      {(user.userType === "standard_user" ||
        user.userType === "power_user") && (
        <div className="dropdown m-2 w-56 lg:w-20 lg:text-center">
          <div
            tabIndex={0}
            role="button"
            className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
            onClick={() => handleMenuToggle("payrollManagement")}
          >
            Payroll
          </div>
          <ul
            tabIndex={0}
            className={`menu dropdown-content bg-base-100 rounded-box z-[1] p-2 -mt-8 lg:mt-2 shadow-lg space-y-2 ${
              openMenu === "payrollManagement" ? "block" : "hidden"
            }`}
            style={{
              position: "absolute",
              top: "100%",
              right: "0",
            }}
          >
            {(user.userType === "power_user" ||
              user.userType === "standard_user") && (
              <li>
                <NavLink
                  to="/entry_leave_data"
                  className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
                >
                  Entry leave data
                </NavLink>
              </li>
            )}
            {user.userType === "power_user" && (
              <>
                <li>
                  <NavLink
                    to="/salary_deduction"
                    className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
                  >
                    Salary deduction
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/salary_sheet"
                    className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
                  >
                    Salary sheet
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* Power Access */}
      {user.userType === "power_user" && (
        <div className="dropdown m-2 w-56 lg:w-20 lg:text-center">
          <div
            tabIndex={0}
            role="button"
            className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
            onClick={() => handleMenuToggle("powerAccess")}
          >
            Power Access
          </div>
          <ul
            tabIndex={0}
            className={`menu dropdown-content bg-base-100 rounded-box z-[1] p-2 -mt-8 lg:mt-2 shadow-lg space-y-2 ${
              openMenu === "powerAccess" ? "block" : "hidden"
            }`}
            style={{
              position: "absolute",
              top: "100%",
              right: "0",
            }}
          >
            <li>
              <NavLink
                to="/manage_designation"
                className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
              >
                Manage designation
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/manage_department"
                className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
              >
                Manage department
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/manage_job_location"
                className="rounded-md px-2 py-1 text-sm font-medium btn-ghost border-0"
              >
                Manage job_location
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

MainMenuItems.propTypes = {
  user: PropTypes.object.isRequired,
};

export default MainMenuItems;
