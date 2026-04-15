/**
=========================================================
* Lead Intelligence Dashboard - AI Insights Widget
=========================================================
*/

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Chip from "@mui/material/Chip";

// Lead Intelligence Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// API
import { fetchTopLeads } from "services/api";

// default fallback insights
const defaultInsights = [
  {
    icon: "trending_up",
    title: "Hot Lead Alert",
    description: "TechFlow Solutions showing 87% engagement",
    color: "success",
    timestamp: "2 min ago",
  },
  {
    icon: "auto_awesome",
    title: "AI Enrichment Complete",
    description: "156 leads enriched with company data",
    color: "info",
    timestamp: "5 min ago",
  },
  {
    icon: "star",
    title: "Premium Lead Detected",
    description: "SecureNet Systems scored 95/100",
    color: "warning",
    timestamp: "8 min ago",
  },
];

function AIInsights() {
  const [insights, setInsights] = useState(defaultInsights);
  const [currentInsight, setCurrentInsight] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await fetchTopLeads(5, "HOT");
      if (data && data.results && data.results.length > 0) {
        const mapped = data.results.slice(0, 5).map((lead, i) => ({
          icon: i === 0 ? "star" : i === 1 ? "trending_up" : "auto_awesome",
          title: lead.business_name || lead.name || "Top Lead",
          description: `Lead Score: ${lead.lead_score?.total_score || lead.rating || "N/A"} — ${lead.category || "Business"}`,
          color: i === 0 ? "success" : i === 1 ? "warning" : "info",
          timestamp: lead.location || "Recently added",
        }));
        setInsights(mapped.length > 0 ? mapped : defaultInsights);
      }
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [insights.length]);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDBox display="flex" alignItems="center" mb={2}>
          <Icon sx={{ color: "info", mr: 1 }}>psychology</Icon>
          <MDTypography variant="h6" fontWeight="medium">
            AI Insights
          </MDTypography>
          <Chip label="Live" color="success" size="small" sx={{ ml: 2 }} />
        </MDBox>
        <MDTypography variant="caption" color="text">
          real-time lead intelligence powered by ai
        </MDTypography>
      </MDBox>

      <MDBox p={3}>
        <MDBox
          display="flex"
          alignItems="center"
          p={2}
          borderRadius="lg"
          bgColor="grey-100"
          sx={{
            minHeight: "120px",
            transition: "all 0.3s ease",
            "&:hover": {
              bgColor: "grey-200",
              transform: "translateY(-2px)",
            },
          }}
        >
          <MDBox mr={2}>
            <MDBox
              width="3rem"
              height="3rem"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgColor={insights[currentInsight].color}
              color="white"
            >
              <Icon>{insights[currentInsight].icon}</Icon>
            </MDBox>
          </MDBox>
          <MDBox flex={1}>
            <MDTypography variant="h6" fontWeight="medium" color="dark">
              {insights[currentInsight].title}
            </MDTypography>
            <MDTypography variant="body2" color="text" mb={1}>
              {insights[currentInsight].description}
            </MDTypography>
            <MDTypography variant="caption" color="text">
              {insights[currentInsight].timestamp}
            </MDTypography>
          </MDBox>
        </MDBox>

        <MDBox mt={2} display="flex" justifyContent="center">
          {insights.map((_, index) => (
            <MDBox
              key={index}
              width="8px"
              height="8px"
              borderRadius="50%"
              bgColor={index === currentInsight ? "info" : "grey-300"}
              mr={1}
              sx={{ cursor: "pointer" }}
              onClick={() => setCurrentInsight(index)}
            />
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default AIInsights;
