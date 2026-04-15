/**
=========================================================
* Lead Intelligence Dashboard - Main Leads Interface
=========================================================

* AI-Powered Lead Generation and Management System
* Built for Caprae Capital AI-Readiness Challenge

=========================================================
*/

import { useState, useEffect } from "react";

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

// API
import { fetchSummaryStats, fetchCompanies } from "services/api";

// Default stats fallback
const defaultStats = {
  total_leads: 1247,
  hot_leads: 342,
  leads_with_email: 891,
  leads_with_website: 156,
  enrichment_rate: 71,
  completeness_rate: 45,
};

function Leads() {
  const [stats, setStats] = useState(defaultStats);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    (async () => {
      const summary = await fetchSummaryStats();
      if (summary && summary.total_leads != null) setStats(summary);

      const data = await fetchCompanies({ limit: 50, sortBy: "rating", order: "desc" });
      if (data && data.results) setCompanies(data.results);
    })();
  }, []);

  const { columns, rows } = leadsTableData(companies);

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
                color="error"
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
