import { useRoutes } from "react-router-dom";
import AdminHome from "../AdminDashboard/AdminHome";
import CreatePM from "../AdminDashboard/CreatePM";
import CreateUserPortfolio from "../AdminDashboard/CreateUserPortfolio";
import Operators from "../AdminDashboard/Operators";
import ViewOperator from "../AdminDashboard/ViewOperator";
import Login from "../Auth/Login";
import AppIndex from "./AppIndex";

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
                    path: "/admin",
                    element: <AdminHome />,
                },
                {
                    path: '/admin/create-user-portfolio',
                    element: <CreateUserPortfolio />
                },
                {
                    path: '/admin/create-PM',
                    element: <CreatePM />
                },
                {
                    path: '/admin/operators',
                    element: <Operators />
                },
                {
                    path: '/admin/view-operator',
                    element: <ViewOperator />
                }

            ],
        },
    ]);
    return element;
}
export default AppNavigation;
