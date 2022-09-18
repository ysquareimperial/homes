import { useRoutes } from "react-router-dom";
import Home from "../AdminDashboard/Home";
import CreateUserPortfolio from "../AdminDashboard/CreateUserPortfolio";
import Operators from "../AdminDashboard/Operators";
// import ViewOperator from "../AdminDashboard/ViewOperator";
import Login from "../Auth/Login";
import AppIndex from "./AppIndex";
import PM from "../AdminDashboard/PMS";
import CreatePM from "../AdminDashboard/CreatePM";
// import CreateTenant from "../AdminDashboard/CreateTenant";
import ViewPM from "../AdminDashboard/ViewPM";
import ViewBlock from "../AdminDashboard/ViewBlock";
// import { Edit } from "react-feather";
import EditPM from "../AdminDashboard/EditPM";
import EditOperator from "../AdminDashboard/EditOperator";
import OperatorDashboard from "../Operator/OperatorDashboard";
import OperatorPM from "../Operator/OperatorPM";
import OperatorViewPM from "../Operator/OperatorViewPM";
import OperatorViewBlock from "../Operator/OperatorViewBlock";
import OperatorNotification from "../Operator/OperatorNotification";

function AppNavigation() {

    let element = useRoutes([
        {
            path: "/",
            element: <Login />,
            children: [{ index: true }],
        },
        {
            element: <AppIndex />,
            children: [
                { index: true, element: < Login /> },

                {
                    path: "/admin/home",
                    element: <Home />,
                },
                {
                    path: '/admin/create-portfolio',
                    element: <CreateUserPortfolio />
                },
                {
                    path: '/admin/PM',
                    element: <PM />
                },
                {
                    path: '/admin/operators',
                    element: <Operators />
                },
                {
                    path: '/admin/edit-operator',
                    element: <EditOperator />
                },
                {
                    path: 'admin/create-pm',
                    element: <CreatePM />
                },
                {
                    path: 'admin/view-pm',
                    element: <ViewPM />
                },
                {
                    path: 'admin/view-block',
                    element: <ViewBlock />
                },
                {
                    path: 'admin/edit-pm',
                    element: <EditPM />
                },

                ////////////////////////////////////

                {
                    path: "/operator/home",
                    element: <OperatorDashboard />,
                },
                {
                    path: '/operator/PM',
                    element: <OperatorPM />
                },
                {
                    path: '/operator/view-PM',
                    element: <OperatorViewPM />
                },
                {
                    path: '/operator/view-block',
                    element: <OperatorViewBlock />
                },
                {
                    path: '/operator/notifications',
                    element: <OperatorNotification />
                }

            ],
        },
    ]);
    return element;
}
export default AppNavigation;
