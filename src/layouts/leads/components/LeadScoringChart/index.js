/**
=========================================================
* Lead Intelligence Dashboard - AI Lead Scoring Chart
=========================================================
*/

import { useState, useEffect } from "react";

// @mui material components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Lead Intelligence Dashboard example components
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";

function LeadScoringChart() {
  const [chartData, setChartData] = useState({
    labels: ["Low Quality", "Medium Quality", "High Quality", "Premium Leads"],
    datasets: {
      label: "Lead Count",
      data: [245, 560, 342, 100],
      color: "info",
    },
  });

  // simulate ai-powered lead scoring data
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => ({
        ...prevData,
        datasets: {
          ...prevData.datasets,
          data: prevData.datasets.data.map((value) =>
            Math.max(0, value + Math.floor(Math.random() * 20 - 10))
          ),
        },
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MDBox>
      <ReportsBarChart
        color="info"
        title="AI-Powered Lead Scoring"
        description="Real-time lead quality assessment based on company data, engagement, and market signals"
        date="updated 2 min ago"
        chart={chartData}
      />

      {/* Lead Quality Legend */}
      <MDBox mt={3} display="flex" justifyContent="space-around" flexWrap="wrap">
        <MDBox display="flex" alignItems="center" mb={1}>
          <MDBox width="12px" height="12px" bgColor="error" borderRadius="50%" mr={1} />
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Low Quality (0-25)
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={1}>
          <MDBox width="12px" height="12px" bgColor="warning" borderRadius="50%" mr={1} />
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Medium Quality (26-50)
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={1}>
          <MDBox width="12px" height="12px" bgColor="info" borderRadius="50%" mr={1} />
          <MDTypography variant="caption" color="text" fontWeight="medium">
            High Quality (51-75)
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={1}>
          <MDBox width="12px" height="12px" bgColor="success" borderRadius="50%" mr={1} />
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Premium (76-100)
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

export default LeadScoringChart;
