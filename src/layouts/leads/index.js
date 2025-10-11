/**
=========================================================
* Lead Intelligence Dashboard - Main Leads Interface
=========================================================

* AI-Powered Lead Generation and Management System
* Built for Caprae Capital AI-Readiness Challenge

=========================================================
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Lead Intelligence Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Lead Intelligence Dashboard example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Lead Intelligence components
import LeadScoringChart from "layouts/leads/components/LeadScoringChart";
import LeadEnrichmentPanel from "layouts/leads/components/LeadEnrichmentPanel";

// Data
import leadsTableData from "layouts/leads/data/leadsTableData";

function Leads() {
  const { columns, rows } = leadsTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* Lead Intelligence Stats */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="trending_up"
                title="Total Leads"
                count="1,247"
                percentage={{
                  color: "success",
                  amount: "+23%",
                  label: "than last week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="star"
                title="High Quality Leads"
                count="342"
                percentage={{
                  color: "success",
                  amount: "+18%",
                  label: "conversion rate",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="auto_awesome"
                title="AI Enriched"
                count="891"
                percentage={{
                  color: "info",
                  amount: "71%",
                  label: "of total leads",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="download"
                title="Exported"
                count="156"
                percentage={{
                  color: "success",
                  amount: "+45%",
                  label: "this month",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>

        {/* Lead Scoring Analytics */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Lead Quality Distribution
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <LeadScoringChart />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <LeadEnrichmentPanel />
          </Grid>
        </Grid>

        {/* Leads Table */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="success"
                borderRadius="lg"
                coloredShadow="success"
              >
                <MDTypography variant="h6" color="white">
                  Lead Intelligence Database
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={{ defaultValue: 10, entries: [5, 10, 15, 20, 25] }}
                  canSearch={true}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Leads;
