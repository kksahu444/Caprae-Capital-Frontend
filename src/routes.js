/**
=========================================================
* Lead Intelligence Dashboard - Caprae Capital Challenge
=========================================================

* AI-Powered Lead Generation Tool
* Built for Caprae Capital AI-Readiness Challenge

=========================================================
*/

/** 
  Lead Intelligence Dashboard Routes Configuration
  
  This file contains all routes for the Lead Intelligence Dashboard.
  Routes are automatically displayed in the sidebar navigation.
  
  Route Configuration:
  - type: "collapse" for main routes, "title" for section headers, "divider" for separators
  - name: Display name in the sidebar
  - key: Unique identifier for the route
  - icon: Material-UI icon component
  - route: URL path for the route
  - component: React component to render
*/

// Lead Intelligence Dashboard layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Leads from "layouts/leads";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

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
    name: "Lead Intelligence",
    key: "leads",
    icon: <Icon fontSize="small">trending_up</Icon>,
    route: "/leads",
    component: <Leads />,
  },
  {
    type: "collapse",
    name: "Lead Database",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
