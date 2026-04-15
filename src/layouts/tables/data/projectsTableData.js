/**
=========================================================
* Lead Intelligence Dashboard - Company Intelligence Data
=========================================================
*/

// @mui material components
import Icon from "@mui/material/Icon";

// Lead Intelligence Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Mock data fallback
const mockCompanies = [
  { business_name: "TechFlow Solutions", category: "SaaS", address: "San Francisco, CA", review_count: 156, rating: 4.8, website: "techflow.io", phone: "+1-555-123" },
  { business_name: "DataVault Inc", category: "Analytics", address: "Austin, TX", review_count: 220, rating: 4.9, website: "datavault.com", phone: "+1-555-987" },
  { business_name: "CloudSync Pro", category: "Cloud Services", address: "Seattle, WA", review_count: 89, rating: 4.2, website: "cloudsync.pro", phone: "+1-555-456" },
  { business_name: "SecureNet Systems", category: "Cybersecurity", address: "Boston, MA", review_count: 312, rating: 4.9, website: "securenet.sys", phone: "+1-555-321" },
  { business_name: "AutoScale Tech", category: "DevOps", address: "Denver, CO", review_count: 67, rating: 4.3, website: "", phone: "+1-555-654" },
  { business_name: "GrowthMetrics", category: "MarTech", address: "Chicago, IL", review_count: 145, rating: 4.6, website: "growthmetrics.com", phone: "" },
];

export default function data(backendCompanies = []) {
  const companies = backendCompanies.length > 0 ? backendCompanies : mockCompanies;

  return {
    columns: [
      { Header: "company", accessor: "company", width: "30%", align: "left" },
      { Header: "location", accessor: "location", align: "left" },
      { Header: "reviews", accessor: "reviews", align: "center" },
      { Header: "completeness", accessor: "completeness", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: companies.map((c) => {
      const name = c.business_name || c.name || "Unknown";
      // calculate completeness based on available fields
      let filledFields = 0;
      const totalFields = 5;
      if (c.phone) filledFields++;
      if (c.website) filledFields++;
      if (c.rating) filledFields++;
      if (c.address || c.location) filledFields++;
      if (c.category) filledFields++;
      const completeness = Math.round((filledFields / totalFields) * 100);
      const completenessColor = completeness >= 80 ? "success" : completeness >= 50 ? "info" : "warning";

      return {
        company: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDAvatar bgColor="dark" size="sm" variant="rounded" sx={{ mr: 1 }}>
              {name.charAt(0)}
            </MDAvatar>
            <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
              {name}
            </MDTypography>
          </MDBox>
        ),
        location: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {c.address || c.location || "—"}
          </MDTypography>
        ),
        reviews: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {c.review_count || c.reviews || "—"} reviews
          </MDTypography>
        ),
        completeness: (
          <MDBox display="flex" alignItems="center">
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {completeness}%
            </MDTypography>
            <MDBox ml={0.5} width="9rem">
              <MDProgress variant="gradient" color={completenessColor} value={completeness} />
            </MDBox>
          </MDBox>
        ),
        action: (
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        ),
      };
    }),
  };
}
