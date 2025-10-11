/**
=========================================================
* Lead Intelligence Dashboard - Main Dashboard
=========================================================

* AI-Powered Lead Generation Analytics
* Built for Caprae Capital AI-Readiness Challenge

=========================================================
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Lead Intelligence Dashboard components
import MDBox from "components/MDBox";

// Lead Intelligence Dashboard example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import AIInsights from "layouts/dashboard/components/AIInsights";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
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
                color="primary"
                icon="download"
                title="Exported Today"
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
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="lead sources"
                  description="Lead Generation Performance by Channel"
                  date="data updated 2 hours ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="lead quality trend"
                  description={
                    <>
                      (<strong>+15%</strong>) improvement in lead quality scores.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="ai enrichment rate"
                  description="Automated Data Enhancement Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={7}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <AIInsights />
                </Grid>
                <Grid item xs={12}>
                  <OrdersOverview />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
