// import dashboardImg from "./assets/dashboard.svg"
import dashboardImg from "./assets/element-3.svg";
import dashboardActive from './assets/element-3 (2).svg';
import employeesImg from './assets/Employees.svg';
import employeesActive from './assets/document-text.svg';
import taskboardImg from './assets/Taskboard.svg';
import taskboardActive from './assets/refresh-2.svg';
import leaveboardImg from './assets/Leaveboard.svg';
import leaveboardActive from './assets/calendar.svg';
import payrollImg from './assets/Payroll.svg';
import payrollActive from './assets/document-like.svg';
import settingsImg from './assets/settings.svg';
import settingsActive from './assets/setting-2.svg';
// ================================================
import peopleImg from './assets/Frame 7.svg'
import taskImg from './assets/Frame 7 (1).svg'
import calenderImg from './assets/Frame 7 (2).svg'
// ==================================================
import people1 from './assets/Frame 189.svg'
import people2 from './assets/Frame 189 (1).svg'
import people3 from './assets/Frame 32.svg'
// ==================================================
import planimg from "./assets/Frame 184.svg"
import plansimg from "./assets/Frame 184 (1).svg"


export const sidebarLink = [
    {
        id:1,
        Icon: dashboardImg,
        active: dashboardActive,
        name: "Dashboard",
        path: "",
    },
    {
        id:2,
        Icon: employeesImg,
        active: employeesActive,
        name: "Employees",
        path: "/admin-dashboard/employees",
    },
    {
        id:3,
        Icon: taskboardImg,
        active: taskboardActive,
        name: "Taskboard",
        path: "/admin-dashboard/taskboard",
    },
    {
        id:4,
        Icon: leaveboardImg,
        active: leaveboardActive,
        name: "Leaveboard",
        path: "/admin-dashboard/leaveboard",
    },
    {
        id:5,
        Icon: payrollImg,
        active: payrollActive,
        name: "Payroll",
        path: "/admin-dashboard/payroll",
    },
    {
        id:6,
        Icon: settingsImg,
        active: settingsActive,
        name: "Settings",
        path: "/admin-dashboard/settings",
    }
]


export const Dashboard = [
    {
        id:1,
        names:"Total Employees",
        number:"24",
        Icons: peopleImg,
    },
    {
        id:2,
        names:"Total Tasks",
        number:"107",
        Icons: taskImg,
    },
    {
        id:3,
        names:"Current Leaves",
        number:"15",
        Icons: calenderImg,
    },
]


export const DashboardPages = [
    {
        id:1,
        task:"Website Project Update On Slack",
        images: people1,
        start:"Start: 03 Mar 2023",
        end:"End: 10 Mar 2023",
        action:"Planned",
    },
    {
        id:2,
        task:"Productize Beta Testing",
        images: people2,
        start:"Start: 03 Mar 2023",
        end:"End: 10 Mar 2023",
        action:"Completed",
    },
    {
        id:3,
        task:"Website Project Update On Slack",
        images: people3,
        start:"Start: 03 Mar 2023",
        end:"End: 10 Mar 2023",
        action:"In Progress"
    },
    {
        id:4,
        task:"Website Project Update On Slack",
        images: people1,
        start:"Start: 03 Mar 2023",
        end:"End: 10 Mar 2023",
        action:"Planned",
    },
    {
        id:5,
        task:"Productize Beta Testing",
        images: people2,
        start:"Start: 03 Mar 2023",
        end:"End: 10 Mar 2023",
        action:"Completed",
    },
    {
        id:6,
        task:"Website Project Update On Slack",
        images: people3,
        start:"Start: 03 Mar 2023",
        end:"End: 10 Mar 2023",
        action:"In Progress",
    },
    {
        id:7,
        task:"Website Project Update On Slack",
        images: people1,
        start:"Start: 03 Mar 2023",
        end:"End: 10 Mar 2023",
        action:"Planned",
    }

]



export const sidebarLinkEmployee = [
    {
        id:1,
        Icon: dashboardImg,
        name: "Dashboard",
        path: "",
    },
    {
        id:2,
        Icon: taskboardImg,
        name: "Taskboard",
        path: "/admin-employee/taskboard",
    },
    {
        id:3,
        Icon: leaveboardImg,
        name: "Leaveboard",
        path: "/admin-employee/leaveboard",
    },
    {
        id:4,
        Icon: settingsImg,
        name: "Settings",
        path: "/admin-employee/settings",
    }
]



export const DashboardEmploy = [
    {
        id:1,
        names:"Planned Tasks",
        number:"24",
        Icons: planimg,
    },
    {
        id:2,
        names:"In Progress",
        number:"107",
        Icons: plansimg,
    },
    {
        id:3,
        names:"Remaining Leaves",
        number:"15",
        Icons: calenderImg,
    },
]



export const DashboardPagesEmploy = [
    {
        id:1,
        task:"New Task Assigned",
        description:"Website Project Update on Slack",
        date:"Sep 21, 2024",
        status:"Pending",
    },
    {
        id:2,
        task:"Leave Request Approval",
        description:"Leave Approved for Sep 30 - Oct",
        date:"Sep 21, 2024",
        status:"In Progress",
    },
    {
        id:3,
        task:"Leave Request",
        description:"Leave Approved for Sep 30 - Oct",
        date:"Sep 21, 2024",
        status:"In Progress",
    },
    {
        id:4,
        task:"New Task Assigned",
        description:"Website Project Update on Slack",
        date:"Sep 21, 2024",
        status:"Pending",
    },
    {
        id:5,
        task:"New Task Assigned",
        description:"Website Project Update on Slack",
        date:"Sep 21, 2024",
        status:"Pending",
    },
    {
        id:6,
        task:"Leave Request Approval",
        description:"Leave Approved for Sep 30 - Oct",
        date:"Sep 21, 2024",
        status:"Approved",
    },
    {
        id:7,
        task:"Leave Request Decliend",
        description:"Leave Approved for Sep 30 - Oct",
        date:"Sep 21, 2024",
        status:"In Progress",
    },
    {
        id:8,
        task:"Leave Request",
        description:"Leave Approved for Sep 30 - Oct",
        date:"Sep 21, 2024",
        status:"In Progress",
    },
    {
        id:9,
        task:"New Task Assigned",
        description:"Website Project Update on Slack",
        date:"Sep 21, 2024",
        status:"Approved",
    },
    {
        id:10,
        task:"New Task Assigned",
        description:"Website Project Update on Slack",
        date:"Sep 21, 2024",
        status:"Pending",
    }, 

]



export const TaskboardEmploy = [
    {
        id:1,
        names:"Planned Tasks",
        number:"24",
        Icons: planimg,
    },
    {
        id:2,
        names:"In Progress",
        number:"107",
        Icons: plansimg,
    },
    {
        id:3,
        names:"Completed Tasks",
        number:"15",
        Icons: taskImg,
    },
]



export const newemploy = [
    {
        id:1,
        name: "Personal Information",
        path:"/admin-dashboard/employees/newemployee",
    },
    {
        id:2,
        name: "Professional",
        path:"/admin-dashboard/employees/newemployee",
    },
    {
        id:3,
        name: "Documents",
        path:"/admin-dashboard/employees/newemployee/document",
    },
    {
        id:4,
        name: "Account Access",
        path:"/admin-dashboard/employees/newemployee/accountaccess",
    },
]