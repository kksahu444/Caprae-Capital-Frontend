/**
=========================================================
* Lead Intelligence Dashboard - AI-Enhanced Leads Data
=========================================================
*/

// Lead Intelligence Dashboard components
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import MDAvatar from "components/MDAvatar";

// Mock data fallback when backend is not available
const mockLeads = [
  {
    business_name: "TechFlow Solutions", category: "SaaS", website: "techflow.io",
    phone: "+1 (555) 123-4567", address: "San Francisco, CA", rating: 4.8,
    lead_score: { total_score: 87, tier: "HOT" },
  },
  {
    business_name: "DataVault Inc", category: "Analytics", website: "datavault.com",
    phone: "+1 (555) 987-6543", address: "Austin, TX", rating: 4.9,
    lead_score: { total_score: 92, tier: "HOT" },
  },
  {
    business_name: "CloudSync Pro", category: "Cloud Services", website: "cloudsync.pro",
    phone: "+1 (555) 456-7890", address: "Seattle, WA", rating: 4.2,
    lead_score: { total_score: 68, tier: "WARM" },
  },
  {
    business_name: "SecureNet Systems", category: "Cybersecurity", website: "securenet.sys",
    phone: "+1 (555) 321-0987", address: "Boston, MA", rating: 4.9,
    lead_score: { total_score: 95, tier: "HOT" },
  },
  {
    business_name: "AutoScale Technologies", category: "DevOps", website: "autoscale.tech",
    phone: "+1 (555) 654-3210", address: "Denver, CO", rating: 4.3,
    lead_score: { total_score: 74, tier: "WARM" },
  },
  {
    business_name: "GrowthMetrics", category: "Marketing Tech", website: "growthmetrics.com",
    phone: "+1 (555) 789-0123", address: "Chicago, IL", rating: 4.6,
    lead_score: { total_score: 81, tier: "HOT" },
  },
  {
    business_name: "FinTech Solutions", category: "Financial Services", website: "fintechsol.com",
    phone: "+1 (555) 246-8135", address: "New York, NY", rating: 4.7,
    lead_score: { total_score: 89, tier: "HOT" },
  },
  {
    business_name: "StartupHub", category: "Platform", website: "startuphub.co",
    phone: "+1 (555) 135-7924", address: "Miami, FL", rating: 3.8,
    lead_score: { total_score: 56, tier: "COLD" },
  },
];

export default function leadsData(backendCompanies = []) {
  const companies = backendCompanies.length > 0 ? backendCompanies : mockLeads;

  const Company = ({ name, domain, industry }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar bgColor="info" size="sm" borderRadius="lg" sx={{ mr: 1 }}>
        {name.charAt(0)}
      </MDAvatar>
      <MDBox lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption" color="text">
          {domain} • {industry}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  Company.propTypes = {
    name: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    industry: PropTypes.string.isRequired,
  };

  const LeadScore = ({ score, tier }) => {
    const tierColors = { HOT: "success", WARM: "warning", COLD: "info", LOW: "error" };
    const color = tierColors[tier] || (score >= 75 ? "success" : score >= 50 ? "info" : score >= 25 ? "warning" : "error");
    const label = tier || (score >= 75 ? "Premium" : score >= 50 ? "High" : score >= 25 ? "Medium" : "Low");

    return (
      <MDBox display="flex" alignItems="center" gap={1}>
        <MDBox width="8px" height="8px" bgColor={color} borderRadius="50%" />
        <MDTypography variant="caption" fontWeight="medium">
          {score}
        </MDTypography>
        <MDBadge badgeContent={label} color={color} variant="gradient" size="sm" />
      </MDBox>
    );
  };

  LeadScore.propTypes = {
    score: PropTypes.number.isRequired,
    tier: PropTypes.string,
  };

  return {
    columns: [
      { Header: "company", accessor: "company", width: "25%", align: "left" },
      { Header: "contact", accessor: "contact", align: "left" },
      { Header: "location", accessor: "location", align: "left" },
      { Header: "lead score", accessor: "score", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "rating", accessor: "rating", align: "center" },
    ],

    rows: companies.map((c) => {
      const name = c.business_name || c.name || "Unknown";
      const category = c.category || "Business";
      const website = c.website || "";
      const phone = c.phone || "—";
      const address = c.address || c.location || "—";
      const rating = c.rating || 0;
      const totalScore = c.lead_score?.total_score || Math.round(rating * 20);
      const tier = c.lead_score?.tier || (totalScore >= 75 ? "HOT" : totalScore >= 50 ? "WARM" : totalScore >= 25 ? "COLD" : "LOW");

      return {
        company: (
          <Company
            name={name}
            domain={website.replace(/^https?:\/\//, "").split("/")[0] || "—"}
            industry={category}
          />
        ),
        contact: (
          <MDBox lineHeight={1}>
            <MDTypography variant="caption" color="text" fontWeight="medium" display="block">
              {phone}
            </MDTypography>
            {website && (
              <MDTypography
                component="a"
                href={website.startsWith("http") ? website : `https://${website}`}
                target="_blank"
                variant="caption"
                color="info"
              >
                {website.replace(/^https?:\/\//, "").substring(0, 25)}
              </MDTypography>
            )}
          </MDBox>
        ),
        location: (
          <MDTypography variant="caption" color="text">
            {address.substring(0, 35)}
          </MDTypography>
        ),
        score: <LeadScore score={totalScore} tier={tier} />,
        status: (
          <MDBadge
            badgeContent={tier === "HOT" ? "hot lead" : tier === "WARM" ? "warm" : tier === "COLD" ? "cold" : "low"}
            color={tier === "HOT" ? "success" : tier === "WARM" ? "warning" : tier === "COLD" ? "info" : "dark"}
            variant="gradient"
            size="sm"
          />
        ),
        rating: (
          <MDBox display="flex" alignItems="center" gap={0.5}>
            <MDTypography variant="caption" fontWeight="medium">
              ⭐ {rating || "—"}
            </MDTypography>
          </MDBox>
        ),
      };
    }),
  };
}
