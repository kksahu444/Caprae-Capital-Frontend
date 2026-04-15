/**
=========================================================
* Lead Intelligence Dashboard - Lead Database
=========================================================

* AI-Enhanced Lead Management Tables
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

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

// API
import { fetchCompanies } from "services/api";

function Tables() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchCompanies({ limit: 50, sortBy: "rating", order: "desc" });
      if (data && data.results) setCompanies(data.results);
    })();
  }, []);

  const { columns, rows } = authorsTableData(companies);
  const { columns: pColumns, rows: pRows } = projectsTableData(companies);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
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
                  Lead Contacts Database
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={{ defaultValue: 10, entries: [5, 10, 25] }}
                  canSearch={true}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
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
                  Company Intelligence Database
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={true}
                  entriesPerPage={{ defaultValue: 10, entries: [5, 10, 25] }}
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

export default Tables;
