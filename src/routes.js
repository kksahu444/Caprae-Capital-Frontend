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
*/

// Lead Intelligence Dashboard layouts
import Dashboard from "layouts/dashboard";
import Scraper from "layouts/scraper";
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
    name: "Lead Scraper",
    key: "scraper",
    icon: <Icon fontSize="small">travel_explore</Icon>,
    route: "/scraper",
    component: <Scraper />,
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
  // Auth routes (hidden from sidebar — no type: "collapse")
  {
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
