/**
=========================================================
* Lead Intelligence Dashboard - Caprae Capital Challenge
=========================================================

* AI-Powered Lead Generation Tool
* Built for Caprae Capital AI-Readiness Challenge

=========================================================
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Lead Intelligence Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Lead Intelligence Dashboard base styles
import typography from "assets/theme/base/typography";

function Footer({ company, links }) {
  const { href, name } = company;
  const { size } = typography;

  const renderLinks = () =>
    links.map((link) => (
      <MDBox key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <MDTypography variant="button" fontWeight="regular" color="text">
            {link.name}
          </MDTypography>
        </Link>
      </MDBox>
    ));

  return (
    <MDBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, powered by AI for
        <MDBox fontSize={size.md} color="info" mb={-0.5} mx={0.25}>
          <Icon color="inherit" fontSize="inherit">
            auto_awesome
          </Icon>
        </MDBox>
        <Link href={href} target="_blank">
          <MDTypography variant="button" fontWeight="medium" color="info">
            &nbsp;{name}&nbsp;
          </MDTypography>
        </Link>
        lead generation excellence.
      </MDBox>
      <MDBox
        component="ul"
        sx={({ breakpoints }) => ({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          listStyle: "none",
          mt: 3,
          mb: 0,
          p: 0,

          [breakpoints.up("lg")]: {
            mt: 0,
          },
        })}
      >
        {renderLinks()}
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { href: "https://capraecapital.com/", name: "Caprae Capital" },
  links: [
    { href: "https://capraecapital.com/", name: "Caprae Capital" },
    { href: "https://capraecapital.com/about", name: "About Us" },
    { href: "https://capraecapital.com/blog", name: "Insights" },
    { href: "https://capraecapital.com/careers", name: "Careers" },
  ],
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
