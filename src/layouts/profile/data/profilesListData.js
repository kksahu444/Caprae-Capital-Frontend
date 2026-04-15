/**
=========================================================
* Lead Intelligence Dashboard - Recent Activity Data
=========================================================
*/

// Images
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default [
  {
    image: team3,
    name: "Scrape Completed",
    description: "50 leads extracted from Google Maps — Austin, TX",
    action: {
      type: "internal",
      route: "/scraper",
      color: "info",
      label: "view",
    },
  },
  {
    image: team4,
    name: "Enrichment Done",
    description: "32 emails verified via SMTP for recent batch",
    action: {
      type: "internal",
      route: "/leads",
      color: "success",
      label: "view",
    },
  },
  {
    image: team3,
    name: "CSV Export",
    description: "156 leads exported to enriched_leads.csv",
    action: {
      type: "internal",
      route: "/tables",
      color: "info",
      label: "view",
    },
  },
  {
    image: team4,
    name: "Hot Lead Alert",
    description: "SecureNet Systems scored 95/100 — Premium tier",
    action: {
      type: "internal",
      route: "/leads",
      color: "success",
      label: "view",
    },
  },
  {
    image: team3,
    name: "New Scrape",
    description: "Started: 'restaurants near Denver CO'",
    action: {
      type: "internal",
      route: "/scraper",
      color: "info",
      label: "view",
    },
  },
];
