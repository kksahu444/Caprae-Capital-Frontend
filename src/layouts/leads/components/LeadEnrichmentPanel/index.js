/**
=========================================================
* Lead Intelligence Dashboard - AI Lead Enrichment Panel
=========================================================
*/

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";

// Lead Intelligence Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// @mui icons
import Icon from "@mui/material/Icon";

function LeadEnrichmentPanel() {
  const [isEnriching, setIsEnriching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [enrichedCount, setEnrichedCount] = useState(0);

  const handleEnrichment = async () => {
    setIsEnriching(true);
    setProgress(0);
    setEnrichedCount(0);

    // simulate ai enrichment process
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          setIsEnriching(false);
          setEnrichedCount((prev) => prev + Math.floor(Math.random() * 50) + 25);
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const handleBulkExport = () => {
    // simulate csv export with enriched data
    const csvContent =
      "Company,Industry,Revenue,Employees,Quality Score\n" +
      "Acme Corp,Technology,$50M,200,85\n" +
      "TechStart Inc,Software,$10M,50,72\n" +
      "Global Solutions,Consulting,$100M,500,91";

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "enriched_leads.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="warning"
        borderRadius="lg"
        coloredShadow="warning"
      >
        <MDTypography variant="h6" color="white">
          AI Lead Enrichment
        </MDTypography>
      </MDBox>

      <MDBox pt={3} px={2}>
        {/* Enrichment Controls */}
        <MDBox mb={3}>
          <MDTypography variant="button" color="text" fontWeight="medium" gutterBottom>
            enrich lead data with ai
          </MDTypography>
          <MDBox display="flex" gap={1} mb={2}>
            <MDInput placeholder="company domain or name" size="small" sx={{ flexGrow: 1 }} />
            <MDButton
              variant="gradient"
              color="info"
              size="small"
              onClick={handleEnrichment}
              disabled={isEnriching}
            >
              <Icon>auto_awesome</Icon>
            </MDButton>
          </MDBox>
          
          {isEnriching && (
            <MDBox mb={2}>
              <MDTypography variant="caption" color="text" display="block" mb={1}>
                enriching data... {Math.round(progress)}%
              </MDTypography>
              <LinearProgress
                variant="determinate"
                value={progress}
                color="info"
                sx={{ height: 6, borderRadius: 3 }}
              />
            </MDBox>
          )}

          {enrichedCount > 0 && (
            <MDTypography variant="caption" color="success" fontWeight="medium">
              ✓ enriched {enrichedCount} leads with company data
            </MDTypography>
          )}
        </MDBox>

        {/* Export Options */}
        <MDBox mb={3}>
          <MDTypography variant="button" color="text" fontWeight="medium" gutterBottom>
            export enriched leads
          </MDTypography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <MDButton
                variant="outlined"
                color="info"
                size="small"
                fullWidth
                onClick={handleBulkExport}
              >
                <Icon fontSize="small">file_download</Icon>
                CSV Export
              </MDButton>
            </Grid>
            <Grid item xs={6}>
              <MDButton variant="outlined" color="success" size="small" fullWidth>
                <Icon fontSize="small">table_chart</Icon>
                Excel Export
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>

        {/* Quality Metrics */}
        <MDBox>
          <MDTypography variant="button" color="text" fontWeight="medium" gutterBottom>
            enrichment quality metrics
          </MDTypography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MDBox textAlign="center">
                <MDTypography variant="h4" color="success" fontWeight="bold">
                  94%
                </MDTypography>
                <MDTypography variant="caption" color="text">
                  accuracy rate
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={6}>
              <MDBox textAlign="center">
                <MDTypography variant="h4" color="info" fontWeight="bold">
                  2.3s
                </MDTypography>
                <MDTypography variant="caption" color="text">
                  avg processing time
                </MDTypography>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default LeadEnrichmentPanel;
