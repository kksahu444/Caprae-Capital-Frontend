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

export default function leadsData() {
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

  const LeadScore = ({ score }) => {
    let color = "error";
    let label = "Low";

    if (score >= 75) {
      color = "success";
      label = "Premium";
    } else if (score >= 50) {
      color = "info";
      label = "High";
    } else if (score >= 25) {
      color = "warning";
      label = "Medium";
    }

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
  };

  const ContactInfo = ({ email, phone, linkedin }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {email}
      </MDTypography>
      <MDTypography variant="caption" color="text">
        {phone}
      </MDTypography>
      <MDTypography variant="caption" color="info" component="a" href={linkedin}>
        LinkedIn Profile
      </MDTypography>
    </MDBox>
  );

  ContactInfo.propTypes = {
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    linkedin: PropTypes.string.isRequired,
  };

  const CompanyDetails = ({ revenue, employees, location }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {revenue}
      </MDTypography>
      <MDTypography variant="caption" color="text">
        {employees} employees
      </MDTypography>
      <MDTypography variant="caption" color="text">
        {location}
      </MDTypography>
    </MDBox>
  );

  const ActionButtons = () => (
    <MDBox display="flex" gap={1}>
      <MDTypography 
        component="a" 
        href="#" 
        variant="caption" 
        color="info" 
        fontWeight="medium"
        sx={{ cursor: "pointer" }}
      >
        Enrich
      </MDTypography>
      <MDTypography 
        component="a" 
        href="#" 
        variant="caption" 
        color="success" 
        fontWeight="medium"
        sx={{ cursor: "pointer" }}
      >
        Export
      </MDTypography>
    </MDBox>
  );

  CompanyDetails.propTypes = {
    revenue: PropTypes.string.isRequired,
    employees: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
  };

  return {
    columns: [
      { Header: "company", accessor: "company", width: "25%", align: "left" },
      { Header: "contact info", accessor: "contact", align: "left" },
      { Header: "company details", accessor: "details", align: "left" },
      { Header: "lead score", accessor: "score", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "last updated", accessor: "updated", align: "center" },
      { Header: "actions", accessor: "actions", align: "center" },
    ],

    rows: [
      {
        company: <Company name="TechFlow Solutions" domain="techflow.io" industry="SaaS" />,
        contact: <ContactInfo email="john@techflow.io" phone="+1 (555) 123-4567" linkedin="linkedin.com/in/johndoe" />,
        details: <CompanyDetails revenue="$2.5M ARR" employees="45" location="San Francisco, CA" />,
        score: <LeadScore score={87} />,
        status: (
          <MDBadge badgeContent="hot lead" color="success" variant="gradient" size="sm" />
        ),
        updated: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            2 hours ago
          </MDTypography>
        ),
        actions: <ActionButtons />,
      },
      {
        company: <Company name="DataVault Inc" domain="datavault.com" industry="Analytics" />,
        contact: <ContactInfo email="sarah@datavault.com" phone="+1 (555) 987-6543" linkedin="linkedin.com/in/sarahsmith" />,
        details: <CompanyDetails revenue="$8.2M ARR" employees="120" location="Austin, TX" />,
        score: <LeadScore score={92} />,
        status: (
          <MDBadge badgeContent="premium" color="info" variant="gradient" size="sm" />
        ),
        updated: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            1 hour ago
          </MDTypography>
        ),
        actions: <ActionButtons />,
      },
      {
        company: <Company name="CloudSync Pro" domain="cloudsync.pro" industry="Cloud Services" />,
        contact: <ContactInfo email="mike@cloudsync.pro" phone="+1 (555) 456-7890" linkedin="linkedin.com/in/mikejohnson" />,
        details: <CompanyDetails revenue="$1.8M ARR" employees="32" location="Seattle, WA" />,
        score: <LeadScore score={68} />,
        status: (
          <MDBadge badgeContent="warm" color="warning" variant="gradient" size="sm" />
        ),
        updated: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            4 hours ago
          </MDTypography>
        ),
        actions: <ActionButtons />,
      },
      {
        company: <Company name="SecureNet Systems" domain="securenet.sys" industry="Cybersecurity" />,
        contact: <ContactInfo email="lisa@securenet.sys" phone="+1 (555) 321-0987" linkedin="linkedin.com/in/lisadavis" />,
        details: <CompanyDetails revenue="$12.5M ARR" employees="180" location="Boston, MA" />,
        score: <LeadScore score={95} />,
        status: (
          <MDBadge badgeContent="premium" color="success" variant="gradient" size="sm" />
        ),
        updated: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            30 min ago
          </MDTypography>
        ),
        actions: <ActionButtons />,
      },
      {
        company: <Company name="AutoScale Technologies" domain="autoscale.tech" industry="DevOps" />,
        contact: <ContactInfo email="david@autoscale.tech" phone="+1 (555) 654-3210" linkedin="linkedin.com/in/davidwilson" />,
        details: <CompanyDetails revenue="$3.2M ARR" employees="67" location="Denver, CO" />,
        score: <LeadScore score={74} />,
        status: (
          <MDBadge badgeContent="qualified" color="info" variant="gradient" size="sm" />
        ),
        updated: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            6 hours ago
          </MDTypography>
        ),
        actions: <ActionButtons />,
      },
      {
        company: <Company name="GrowthMetrics" domain="growthmetrics.com" industry="Marketing Tech" />,
        contact: <ContactInfo email="anna@growthmetrics.com" phone="+1 (555) 789-0123" linkedin="linkedin.com/in/annabrown" />,
        details: <CompanyDetails revenue="$5.7M ARR" employees="95" location="Chicago, IL" />,
        score: <LeadScore score={81} />,
        status: (
          <MDBadge badgeContent="hot lead" color="success" variant="gradient" size="sm" />
        ),
        updated: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            3 hours ago
          </MDTypography>
        ),
        actions: <ActionButtons />,
      },
      {
        company: <Company name="FinTech Solutions" domain="fintechsol.com" industry="Financial Services" />,
        contact: <ContactInfo email="robert@fintechsol.com" phone="+1 (555) 246-8135" linkedin="linkedin.com/in/robertlee" />,
        details: <CompanyDetails revenue="$15.3M ARR" employees="220" location="New York, NY" />,
        score: <LeadScore score={89} />,
        status: (
          <MDBadge badgeContent="premium" color="info" variant="gradient" size="sm" />
        ),
        updated: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            1 hour ago
          </MDTypography>
        ),
        actions: <ActionButtons />,
      },
      {
        company: <Company name="StartupHub" domain="startuphub.co" industry="Platform" />,
        contact: <ContactInfo email="emily@startuphub.co" phone="+1 (555) 135-7924" linkedin="linkedin.com/in/emilytaylor" />,
        details: <CompanyDetails revenue="$4.1M ARR" employees="78" location="Miami, FL" />,
        score: <LeadScore score={56} />,
        status: (
          <MDBadge badgeContent="cold" color="dark" variant="gradient" size="sm" />
        ),
        updated: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            1 day ago
          </MDTypography>
        ),
        actions: <ActionButtons />,
      },
    ],
  };
}
