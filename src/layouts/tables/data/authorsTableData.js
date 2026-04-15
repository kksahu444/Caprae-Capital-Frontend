/**
=========================================================
* Lead Intelligence Dashboard - Lead Contacts Data
=========================================================
*/

// Lead Intelligence Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Mock data fallback
const mockContacts = [
  { business_name: "TechFlow Solutions", phone: "+1 (555) 123-4567", website: "techflow.io", rating: 4.8, category: "SaaS", lead_score: { tier: "HOT" } },
  { business_name: "DataVault Inc", phone: "+1 (555) 987-6543", website: "datavault.com", rating: 4.9, category: "Analytics", lead_score: { tier: "HOT" } },
  { business_name: "CloudSync Pro", phone: "+1 (555) 456-7890", website: "cloudsync.pro", rating: 4.2, category: "Cloud", lead_score: { tier: "WARM" } },
  { business_name: "SecureNet Systems", phone: "+1 (555) 321-0987", website: "securenet.sys", rating: 4.9, category: "Security", lead_score: { tier: "HOT" } },
  { business_name: "AutoScale Tech", phone: "+1 (555) 654-3210", website: "autoscale.tech", rating: 4.3, category: "DevOps", lead_score: { tier: "WARM" } },
  { business_name: "GrowthMetrics", phone: "+1 (555) 789-0123", website: "growthmetrics.com", rating: 4.6, category: "MarTech", lead_score: { tier: "HOT" } },
];

export default function data(backendCompanies = []) {
  const companies = backendCompanies.length > 0 ? backendCompanies : mockContacts;

  return {
    columns: [
      { Header: "company", accessor: "company", width: "30%", align: "left" },
      { Header: "category", accessor: "category", align: "left" },
      { Header: "phone", accessor: "phone", align: "center" },
      { Header: "rating", accessor: "rating", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: companies.map((c) => {
      const name = c.business_name || c.name || "Unknown";
      const tier = c.lead_score?.tier || "WARM";
      const tierColors = { HOT: "success", WARM: "warning", COLD: "info", LOW: "dark" };

      return {
        company: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDAvatar bgColor="info" size="sm" sx={{ mr: 1 }}>
              {name.charAt(0)}
            </MDAvatar>
            <MDBox ml={1} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                {name}
              </MDTypography>
              <MDTypography variant="caption">
                {(c.website || "").replace(/^https?:\/\//, "")}
              </MDTypography>
            </MDBox>
          </MDBox>
        ),
        category: (
          <MDBox lineHeight={1} textAlign="left">
            <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
              {c.category || "Business"}
            </MDTypography>
          </MDBox>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {c.phone || "—"}
          </MDTypography>
        ),
        rating: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            ⭐ {c.rating || "—"}
          </MDTypography>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge
              badgeContent={tier.toLowerCase()}
              color={tierColors[tier] || "warning"}
              variant="gradient"
              size="sm"
            />
          </MDBox>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="info" fontWeight="medium">
            View
          </MDTypography>
        ),
      };
    }),
  };
}
