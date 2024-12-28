import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./Auth/SignIn";
import ForgotPass from "./Auth/ForgotPass";
import PasswordReset from "./Auth/PasswordReset";
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard";
import AdminSummary from "./pages/admin-dashboard/AdminSummary";
import Employees from "./pages/admin-dashboard/Employees";
import TaskBoard from "./pages/admin-dashboard/TaskBoard";
import LeaveBoard from "./pages/admin-dashboard/LeaveBoard";
import PayRoll from "./pages/admin-dashboard/PayRoll";
import Settings from "./pages/admin-dashboard/Settings";
import Teams from "./pages/admin-dashboard/Sub-pages/Teams";
import NewEmployee from "./pages/admin-dashboard/NewEmployee";
import Professional from "./pages/admin-dashboard/Sub-pages/Professional";
import Document from "./pages/admin-dashboard/Sub-pages/Document";
import Accountaccess from "./pages/admin-dashboard/Sub-pages/Accountaccess";
import NewTeam from "./pages/admin-dashboard/Sub-pages/NewTeam"
import EditTeam from "./pages/admin-dashboard/Sub-pages/EditTeam";
import EmployeeDashboard from "./pagess/admin-dashboard-employee/EmployeeDashboard";
import EmployeeSummary from "./pagess/admin-dashboard-employee/EmployeeSummary";
import EmployeeTaskboard from "./pagess/admin-dashboard-employee/EmployeeTaskboard";
import EmployeeLeaveboard from "./pagess/admin-dashboard-employee/EmployeeLeaveboard";
import EmployeeSettings from "./pagess/admin-dashboard-employee/EmployeeSettings"
import PrivateRoute from "./utils/PrivateRoute";
import RoleBasedRoute from "./utils/RoleBasedRoute"
import {Toaster} from "react-hot-toast"


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/forgot-pass" element={<ForgotPass />} />
          <Route path="/auth/password-reset/:resetToken" element={<PasswordReset />} />
          <Route path="/admin-dashboard" element={<PrivateRoute><RoleBasedRoute requiredRole = {["admin", "super-admin"]}><AdminDashboard /></RoleBasedRoute></PrivateRoute>}>
            <Route index element={<AdminSummary />} />
            <Route path="/admin-dashboard/employees" element={<Employees />}>
              {/* <Route index element = {<Navigate to = "/admin-dashboard/employees/Employee" />}/>
              <Route path = "/admin-dashboard/employees/Employee" element = {<EmPLOYE/>}/> */}
              <Route
                path="/admin-dashboard/employees/teams"
                element={<Teams />}
              >
                {/* <Route path = "/admin-dashboard/employees/teams/n" element = {<NewTeam/>}/> */}
                <Route path = "/admin-dashboard/employees/teams/editteam" element = {<EditTeam/>}/>
            </Route>
            </Route>
            <Route
              path="/admin-dashboard/employees/newemployee"
              element={<NewEmployee />}
            >
              <Route
                path="/admin-dashboard/employees/newemployee/professional"
                element={<Professional />}
              />
              <Route
                path="/admin-dashboard/employees/newemployee/document"
                element={<Document />}
              />
              <Route
                path="/admin-dashboard/employees/newemployee/accountaccess"
                element={<Accountaccess />}
              />
            </Route>
            <Route path="/admin-dashboard/taskboard" element={<TaskBoard />} />
            <Route
              path="/admin-dashboard/leaveboard"
              element={<LeaveBoard />}
            />
            <Route path="/admin-dashboard/payroll" element={<PayRoll />} />
            <Route path="/admin-dashboard/settings" element={<Settings />} />
          </Route>
          <Route path = "/admin-employee" element = {<EmployeeDashboard/>}>
            <Route index element = {<EmployeeSummary/>}/>
            <Route path = "/admin-employee/taskboard" element = {<EmployeeTaskboard/>}/>
            <Route path = "/admin-employee/leaveboard" element = {<EmployeeLeaveboard/>}/>
            <Route path = "/admin-employee/settings" element = {<EmployeeSettings/>}/>
          </Route>
        </Routes>
        <Toaster/>
      </BrowserRouter>
    </>
  );
}

export default App;
