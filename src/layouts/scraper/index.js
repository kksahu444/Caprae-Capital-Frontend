/**
 * Lead Scraper — Google Maps Lead Generation Interface
 * Launches scraping tasks via backend and displays results in real-time.
 */

import { useState, useEffect, useRef, useCallback } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Switch from "@mui/material/Switch";
import LinearProgress from "@mui/material/LinearProgress";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

// Lead Intelligence Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";

// Lead Intelligence Dashboard example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// API service
import { startGoogleMapsScrape, getScraperTaskStatus, getDatabaseLeads } from "services/api";

// scrape status to color mapping
const statusColors = {
  PENDING: "warning",
  STARTED: "info",
  SUCCESS: "success",
  FAILURE: "error",
};

function Scraper() {
  // form state
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [maxResults, setMaxResults] = useState(20);
  const [headless, setHeadless] = useState(true);

  // task state
  const [taskId, setTaskId] = useState(null);
  const [taskStatus, setTaskStatus] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState(null);
  const pollRef = useRef(null);

  // results state
  const [results, setResults] = useState([]);
  const [dbLeads, setDbLeads] = useState([]);
  const [scrapeHistory, setScrapeHistory] = useState([]);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    setIsPolling(false);
  }, []);

  // poll task status
  useEffect(() => {
    if (!taskId || !isPolling) return;

    pollRef.current = setInterval(async () => {
      const status = await getScraperTaskStatus(taskId);
      if (status) {
        setTaskStatus(status);
        if (status.status === "SUCCESS") {
          stopPolling();
          setResults(status.result || []);
          setScrapeHistory((prev) => [
            { id: taskId, query, location, count: (status.result || []).length, time: new Date().toLocaleTimeString() },
            ...prev,
          ]);
          // also refresh db leads
          const dbData = await getDatabaseLeads(100, 0);
          if (dbData) setDbLeads(dbData.results || []);
        } else if (status.status === "FAILURE") {
          stopPolling();
          setError("Scraping task failed. Please try again.");
        }
      }
    }, 2000);

    return () => stopPolling();
  }, [taskId, isPolling, query, location, stopPolling]);

  // load db leads on mount
  useEffect(() => {
    (async () => {
      const dbData = await getDatabaseLeads(100, 0);
      if (dbData) setDbLeads(dbData.results || []);
    })();
  }, []);

  const handleStartScrape = async () => {
    if (!query.trim()) {
      setError("Please enter a search query (e.g., 'coffee shops', 'restaurants')");
      return;
    }
    setError(null);
    setTaskStatus(null);
    setResults([]);

    const resp = await startGoogleMapsScrape({
      query: query.trim(),
      location: location.trim() || "United States",
      maxResults,
      headless,
    });

    if (resp && resp.task_id) {
      setTaskId(resp.task_id);
      setTaskStatus({ status: "PENDING" });
      setIsPolling(true);
    } else {
      setError("Failed to start scraping. Is the backend running?");
    }
  };

  // build results table
  const resultsColumns = [
    { Header: "business", accessor: "business", width: "25%", align: "left" },
    { Header: "phone", accessor: "phone", align: "left" },
    { Header: "website", accessor: "website", align: "left" },
    { Header: "rating", accessor: "rating", align: "center" },
    { Header: "address", accessor: "address", align: "left" },
  ];

  const buildRows = (data) =>
    data.map((item) => ({
      business: (
        <MDTypography variant="button" fontWeight="medium">
          {item.business_name || item.name || item.title || "—"}
        </MDTypography>
      ),
      phone: (
        <MDTypography variant="caption" color="text">
          {item.phone || "—"}
        </MDTypography>
      ),
      website: item.website ? (
        <MDTypography
          component="a"
          href={item.website.startsWith("http") ? item.website : `https://${item.website}`}
          target="_blank"
          variant="caption"
          color="info"
          fontWeight="medium"
        >
          {item.website.replace(/^https?:\/\//, "").substring(0, 30)}
        </MDTypography>
      ) : (
        <MDTypography variant="caption" color="text">—</MDTypography>
      ),
      rating: (
        <MDBox display="flex" alignItems="center" gap={0.5}>
          <Icon sx={{ color: "#ffc107", fontSize: "1rem" }}>star</Icon>
          <MDTypography variant="caption" fontWeight="medium">
            {item.rating || "—"}
          </MDTypography>
        </MDBox>
      ),
      address: (
        <MDTypography variant="caption" color="text">
          {(item.address || item.location || "—").substring(0, 40)}
        </MDTypography>
      ),
    }));

  const displayData = results.length > 0 ? results : dbLeads;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* Scraper Form */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="dark"
                borderRadius="lg"
                coloredShadow="dark"
              >
                <MDBox display="flex" alignItems="center" gap={1}>
                  <Icon sx={{ color: "#fff" }}>travel_explore</Icon>
                  <MDTypography variant="h6" color="white">
                    Google Maps Lead Scraper
                  </MDTypography>
                  <Chip label="AI-Powered" size="small" sx={{ ml: 1, bgcolor: "rgba(255,255,255,0.2)", color: "#fff" }} />
                </MDBox>
              </MDBox>

              <MDBox p={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <MDInput
                      label="Business Type / Query"
                      placeholder="e.g., coffee shops, restaurants, dentists"
                      fullWidth
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDInput
                      label="Location"
                      placeholder="e.g., Austin TX, New York, San Francisco"
                      fullWidth
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDInput
                      label="Max Results"
                      type="number"
                      fullWidth
                      value={maxResults}
                      onChange={(e) => setMaxResults(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                      inputProps={{ min: 1, max: 100 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDBox display="flex" alignItems="center" height="100%">
                      <Switch checked={headless} onChange={() => setHeadless(!headless)} />
                      <MDTypography variant="button" color="text" fontWeight="regular" ml={1}>
                        Headless Mode
                      </MDTypography>
                      <Tooltip title="Run browser in background (recommended)" placement="top">
                        <Icon sx={{ ml: 0.5, fontSize: "1rem", color: "text.secondary" }}>info_outline</Icon>
                      </Tooltip>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      onClick={handleStartScrape}
                      disabled={isPolling}
                      sx={{ height: "100%" }}
                    >
                      <Icon sx={{ mr: 1 }}>rocket_launch</Icon>
                      {isPolling ? "Scraping..." : "Start Scraping"}
                    </MDButton>
                  </Grid>
                </Grid>

                {/* Error message */}
                {error && (
                  <MDBox mt={2} p={1.5} bgColor="error" borderRadius="lg" opacity={0.9}>
                    <MDTypography variant="caption" color="white" fontWeight="medium">
                      {error}
                    </MDTypography>
                  </MDBox>
                )}

                {/* Task Status */}
                {taskStatus && (
                  <MDBox mt={3}>
                    <Divider />
                    <MDBox display="flex" alignItems="center" gap={1} mt={2} mb={1}>
                      <Icon sx={{ color: "text.secondary" }}>info</Icon>
                      <MDTypography variant="button" color="text" fontWeight="medium">
                        Task Status:
                      </MDTypography>
                      <MDBadge
                        badgeContent={taskStatus.status}
                        color={statusColors[taskStatus.status] || "dark"}
                        variant="gradient"
                        size="sm"
                      />
                    </MDBox>
                    {(taskStatus.status === "PENDING" || taskStatus.status === "STARTED") && (
                      <LinearProgress color="info" sx={{ borderRadius: 2, height: 6 }} />
                    )}
                    {taskStatus.status === "SUCCESS" && (
                      <MDTypography variant="caption" color="success" fontWeight="medium">
                        ✓ Scraped {results.length} leads successfully!
                      </MDTypography>
                    )}
                  </MDBox>
                )}
              </MDBox>
            </Card>
          </Grid>

          {/* Scrape History */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ height: "100%" }}>
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
                  Scrape History
                </MDTypography>
              </MDBox>
              <MDBox p={2}>
                {scrapeHistory.length === 0 ? (
                  <MDBox textAlign="center" py={4}>
                    <Icon sx={{ fontSize: "3rem", color: "text.disabled" }}>history</Icon>
                    <MDTypography variant="body2" color="text" mt={1}>
                      No scrapes yet. Start your first scrape!
                    </MDTypography>
                  </MDBox>
                ) : (
                  scrapeHistory.map((item, idx) => (
                    <MDBox
                      key={idx}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      p={1.5}
                      mb={1}
                      borderRadius="lg"
                      sx={{ bgcolor: "grey.100" }}
                    >
                      <MDBox>
                        <MDTypography variant="button" fontWeight="medium" display="block">
                          {item.query}
                        </MDTypography>
                        <MDTypography variant="caption" color="text">
                          {item.location} • {item.time}
                        </MDTypography>
                      </MDBox>
                      <MDBadge
                        badgeContent={`${item.count} leads`}
                        color="success"
                        variant="gradient"
                        size="sm"
                      />
                    </MDBox>
                  ))
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {/* Results Table */}
        <Grid container spacing={3}>
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
                <MDBox display="flex" justifyContent="space-between" alignItems="center">
                  <MDTypography variant="h6" color="white">
                    {results.length > 0 ? "Scrape Results" : "Lead Database"}
                  </MDTypography>
                  <MDTypography variant="caption" color="white" opacity={0.8}>
                    {displayData.length} leads
                  </MDTypography>
                </MDBox>
              </MDBox>
              <MDBox pt={3}>
                {displayData.length > 0 ? (
                  <DataTable
                    table={{ columns: resultsColumns, rows: buildRows(displayData) }}
                    isSorted={true}
                    entriesPerPage={{ defaultValue: 10, entries: [5, 10, 25, 50] }}
                    canSearch={true}
                    showTotalEntries={true}
                    noEndBorder
                  />
                ) : (
                  <MDBox textAlign="center" py={6}>
                    <Icon sx={{ fontSize: "4rem", color: "text.disabled" }}>search</Icon>
                    <MDTypography variant="h6" color="text" mt={2}>
                      No leads yet
                    </MDTypography>
                    <MDTypography variant="body2" color="text">
                      Use the scraper above to generate leads from Google Maps
                    </MDTypography>
                  </MDBox>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Scraper;
