/**
=========================================================
* Lead Intelligence Dashboard - Lead Activity Timeline
=========================================================

* Real-time Lead Activity Tracking Component
* Built for Caprae Capital AI-Readiness Challenge

=========================================================
*/

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Lead Intelligence Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Lead Intelligence Dashboard example components
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Lead Activity
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              18%
            </MDTypography>{" "}
            conversion rate this month
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color="success"
          icon="trending_up"
          title="TechFlow Solutions - High quality lead scored 87"
          dateTime="22 DEC 7:20 PM"
        />
        <TimelineItem
          color="info"
          icon="auto_awesome"
          title="DataVault Inc - AI enrichment completed"
          dateTime="21 DEC 11 PM"
        />
        <TimelineItem
          color="success"
          icon="star"
          title="SecureNet Systems - Premium lead added"
          dateTime="21 DEC 9:34 PM"
        />
        <TimelineItem
          color="warning"
          icon="download"
          title="Lead export completed - 156 records"
          dateTime="20 DEC 2:20 AM"
        />
        <TimelineItem
          color="primary"
          icon="person_add"
          title="GrowthMetrics - New contact enriched"
          dateTime="18 DEC 4:54 AM"
          lastItem
        />
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
