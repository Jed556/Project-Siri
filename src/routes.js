/** 
    All of the routes for the Material Dashboard 2 React are added here,
    You can add a new route, customize the routes and delete the routes here.

    Once you add a new route on this file it will be visible automatically on
    the Sidenav.

    For adding a new route you can follow the existing routes in the routes array.
    1. The `type` key with the `collapse` value is used for a route.
    2. The `type` key with the `title` value is used for a title inside the Sidenav. 
    3. The `type` key with the `divider` value is used for a divider between Sidenav items.
    4. The `name` key is used for the name of the route on the Sidenav.
    5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
    6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
    7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
    inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
    8. The `route` key is used to store the route location which is used for the react router.
    9. The `href` key is used to store the external links location.
    10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
    10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import WeeklyIteineary from "layouts/weekly-iteineary";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import TrainingCommencement from "layouts/training-commencement";
import SiteVisitForm from "layouts/site-visit";
import SummaryOfAccounts from "layouts/summary-of-accounts";
import SummaryOfTargetAccounts from "layouts/summary-of-target-accounts";
import SummaryOfArrangement from "layouts/summary-of-arrangement";
import MasterlistOfAccounts from "layouts/masterlist-of-accounts";
import PurchaseOrder from "layouts/purchase-order";
import AnnualCorporateDistributionList from "layouts/annual-corporate-distribution";
import BudgetRequest from "layouts/budget-request";
import BudgetReleaseTracker from "layouts/budget-release-tracker";
import ClientEntertainmentRequest from "layouts/client-entertainment-request";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
    {
        type: "collapse",
        name: "Dashboard",
        key: "dashboard",
        icon: <Icon fontSize="small">dashboard</Icon>,
        route: "/dashboard",
        component: <Dashboard />,
    },
    {
        type: "collapse",
        name: "Training CC",
        key: "form/training-commencement-coordination",
        icon: <Icon fontSize="small">table_view</Icon>,
        route: "/form/training-commencement-coordination",
        component: <TrainingCommencement />,
    },
    {
        name: "Site Visit",
        key: "form/site-visit",
        icon: <Icon fontSize="small">table_view</Icon>,
        route: "/form/site-visit",
        component: <SiteVisitForm />,
    },
    {
        type: "collapse",
        name: "Accounts",
        key: "accounts",
        icon: <Icon fontSize="small">table_view</Icon>,
        route: "/accounts",
        component: <SummaryOfAccounts />,
    },
    {
        type: "collapse",
        name: "Arrangements",
        key: "summary/arrangement",
        icon: <Icon fontSize="small">list_alt</Icon>,
        route: "/summary/arrangement",
        component: <SummaryOfArrangement />,
    },
    {
        type: "collapse",
        name: "Target Accounts",
        key: "summary/target-accounts",
        icon: <Icon fontSize="small">list_alt</Icon>,
        route: "/summary/target-accounts",
        component: <SummaryOfTargetAccounts />,
    },
    {
        type: "collapse",
        name: "Masterlist of Accounts",
        key: "form/masterlist-of-accounts",
        icon: <Icon fontSize="small">list_alt</Icon>,
        route: "/form/masterlist-of-accounts",
        component: <MasterlistOfAccounts />,
    },
    {
        type: "collapse",
        name: "Purchase Order",
        key: "form/purchase-order",
        icon: <Icon fontSize="small">shopping_cart</Icon>,
        route: "/form/purchase-order",
        component: <PurchaseOrder />,
    },
    {
        type: "collapse",
        name: "ACD List",
        key: "form/annual-corporate-distribution",
        icon: <Icon fontSize="small">list_alt</Icon>,
        route: "/form/annual-corporate-distribution",
        component: <AnnualCorporateDistributionList />,
    },
    {
        type: "collapse",
        name: "Budget Request",
        key: "form/budget-request",
        icon: <Icon fontSize="small">request_quote</Icon>,
        route: "/form/budget-request",
        component: <BudgetRequest />,
    },
    {
        type: "collapse",
        name: "Budget Release",
        key: "form/budget-release-tracker",
        icon: <Icon fontSize="small">request_quote</Icon>,
        route: "/form/budget-release-tracker",
        component: <BudgetReleaseTracker />,
    },
    {
        type: "collapse",
        name: "Entertainment Req...",
        key: "form/client-entertainment-request",
        icon: <Icon fontSize="small">table_view</Icon>,
        route: "/form/client-entertainment-request",
        component: <ClientEntertainmentRequest />,
    },
    {
        type: "collapse",
        name: "Tables",
        key: "tables",
        icon: <Icon fontSize="small">table_view</Icon>,
        route: "/tables",
        component: <Tables />,
    },
    // {
    //     type: "collapse",
    //     name: "Billing",
    //     key: "billing",
    //     icon: <Icon fontSize="small">receipt_long</Icon>,
    //     route: "/billing",
    //     component: <Billing />,
    // },
    // {
    //     type: "collapse",
    //     name: "Notifications",
    //     key: "notifications",
    //     icon: <Icon fontSize="small">notifications</Icon>,
    //     route: "/notifications",
    //     component: <Notifications />,
    // },
    {
        type: "",
        name: "Profile",
        key: "profile",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/profile",
        component: <Profile />,
    },
    {
        type: "",
        name: "Sign In",
        key: "sign-in",
        icon: <Icon fontSize="small">login</Icon>,
        route: "/authentication/sign-in",
        component: <SignIn />,
    },
    {
        type: "",
        name: "Sign Up",
        key: "sign-up",
        icon: <Icon fontSize="small">assignment</Icon>,
        route: "/authentication/sign-up",
        component: <SignUp />,
    },
];

export default routes;
