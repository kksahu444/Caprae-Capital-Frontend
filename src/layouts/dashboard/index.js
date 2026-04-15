/**
=========================================================
* Lead Intelligence Dashboard - Main Dashboard
=========================================================

* AI-Powered Lead Generation Analytics
* Built for Caprae Capital AI-Readiness Challenge

=========================================================
*/

import { useState, useEffect } from "react";

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

// API
import { fetchSummaryStats, fetchTierDistribution } from "services/api";

// Default fallback stats
const defaultStats = {
  total_leads: 1247,
  hot_leads: 342,
  leads_with_email: 891,
  leads_with_website: 156,
  avg_lead_score: 65.3,
  completeness_rate: 71,
  enrichment_rate: 45,
};

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [stats, setStats] = useState(defaultStats);
  const [tierData, setTierData] = useState(null);

  useEffect(() => {
    (async () => {
      const summary = await fetchSummaryStats();
      if (summary && summary.total_leads != null) {
        setStats(summary);
      }

      const tiers = await fetchTierDistribution();
      if (tiers && tiers.distribution) {
        setTierData(tiers);
      }
    })();
  }, []);

  // build tier chart data if available
  const barChartData = tierData
    ? {
        labels: Object.keys(tierData.distribution),
        datasets: {
          label: "Leads",
          data: Object.values(tierData.distribution).map((t) => t.count),
        },
      }
    : reportsBarChartData;

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
                count={stats.total_leads?.toLocaleString() || "1,247"}
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
                title="Hot Leads"
                count={stats.hot_leads?.toLocaleString() || "342"}
                percentage={{
                  color: "success",
                  amount: `${stats.avg_lead_score || 65}`,
                  label: "avg lead score",
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
                count={stats.leads_with_email?.toLocaleString() || "891"}
                percentage={{
                  color: "info",
                  amount: `${stats.enrichment_rate || 71}%`,
                  label: "enrichment rate",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="download"
                title="With Website"
                count={stats.leads_with_website?.toLocaleString() || "156"}
                percentage={{
                  color: "success",
                  amount: `${stats.completeness_rate || 45}%`,
                  label: "completeness",
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
                  title="lead tier distribution"
                  description="Leads by quality tier from AI scoring"
                  date="data updated live"
                  chart={barChartData}
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
