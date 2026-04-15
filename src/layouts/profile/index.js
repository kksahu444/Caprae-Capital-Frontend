/**
=========================================================
* Lead Intelligence Dashboard - Profile Overview
=========================================================

* Lead Generation Analyst Profile
* Built for Caprae Capital AI-Readiness Challenge

=========================================================
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                description="Lead Generation Analyst at Caprae Capital. Specializing in AI-powered lead intelligence, data enrichment, and automated prospecting for private equity portfolio companies."
                info={{
                  fullName: "Lead Intelligence Analyst",
                  mobile: "(555) 123-4567",
                  email: "analyst@capraecapital.com",
                  location: "New York, USA",
                }}
                social={[
                  {
                    link: "https://www.linkedin.com/company/caprae-capital",
                    icon: <LinkedInIcon />,
                    color: "linkedin",
                  },
                  {
                    link: "https://github.com/caprae-capital",
                    icon: <GitHubIcon />,
                    color: "github",
                  },
                  {
                    link: "mailto:partners@capraecapital.com",
                    icon: <EmailIcon />,
                    color: "slack",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} xl={4}>
              <ProfilesList title="recent activity" profiles={profilesListData} shadow={false} />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Lead Generation Projects
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              AI-powered tools built for Caprae Capital
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <MDBox
                p={3}
                borderRadius="lg"
                sx={{ bgcolor: "grey.100", height: "100%" }}
              >
                <MDBox display="flex" alignItems="center" mb={2}>
                  <MDTypography variant="h5" mr={1}>🔍</MDTypography>
                  <MDTypography variant="h6" fontWeight="medium">
                    Google Maps Scraper
                  </MDTypography>
                </MDBox>
                <MDTypography variant="body2" color="text" mb={2}>
                  Automated lead extraction from Google Maps with anti-bot measures and proxy rotation.
                </MDTypography>
                <MDTypography variant="caption" color="success" fontWeight="medium">
                  ✓ Production Ready
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MDBox
                p={3}
                borderRadius="lg"
                sx={{ bgcolor: "grey.100", height: "100%" }}
              >
                <MDBox display="flex" alignItems="center" mb={2}>
                  <MDTypography variant="h5" mr={1}>🤖</MDTypography>
                  <MDTypography variant="h6" fontWeight="medium">
                    AI Lead Scoring
                  </MDTypography>
                </MDBox>
                <MDTypography variant="body2" color="text" mb={2}>
                  Intelligent scoring engine that rates leads 0-100 based on data completeness, rating, and engagement.
                </MDTypography>
                <MDTypography variant="caption" color="success" fontWeight="medium">
                  ✓ Production Ready
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MDBox
                p={3}
                borderRadius="lg"
                sx={{ bgcolor: "grey.100", height: "100%" }}
              >
                <MDBox display="flex" alignItems="center" mb={2}>
                  <MDTypography variant="h5" mr={1}>📧</MDTypography>
                  <MDTypography variant="h6" fontWeight="medium">
                    Email Enrichment
                  </MDTypography>
                </MDBox>
                <MDTypography variant="body2" color="text" mb={2}>
                  SMTP-verified email discovery using pattern matching, contact page scraping, and WHOIS lookups.
                </MDTypography>
                <MDTypography variant="caption" color="success" fontWeight="medium">
                  ✓ Production Ready
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MDBox
                p={3}
                borderRadius="lg"
                sx={{ bgcolor: "grey.100", height: "100%" }}
              >
                <MDBox display="flex" alignItems="center" mb={2}>
                  <MDTypography variant="h5" mr={1}>📊</MDTypography>
                  <MDTypography variant="h6" fontWeight="medium">
                    Analytics Dashboard
                  </MDTypography>
                </MDBox>
                <MDTypography variant="body2" color="text" mb={2}>
                  Real-time lead pipeline analytics with tier distribution, completeness metrics, and export tools.
                </MDTypography>
                <MDTypography variant="caption" color="success" fontWeight="medium">
                  ✓ Production Ready
                </MDTypography>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
