import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomAccordion({ plants }) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Full Sun</Typography>
        </AccordionSummary>
        <AccordionDetails className="accordion-body">
          {plants.map(
            (plant, index) =>
              plant["Sun Type"].includes("Full Sun") && (
                <div key={index} className="plant-card">
                  <div className="plant-header">
                    <img
                      src={plant.Image}
                      alt="plant"
                      width="40px"
                      height="40px"
                    />

                    <h5>{plant.Plant}</h5>
                  </div>

                  <p>{plant.Description}</p>
                </div>
              )
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Partial Shade</Typography>
        </AccordionSummary>
        <AccordionDetails className="accordion-body">
        {plants.map(
            (plant, index) =>
              plant["Sun Type"].includes("Partial") && (
                <div key={index} className="plant-card">
                  <div className="plant-header">
                    <img
                      src={plant.Image}
                      alt="plant"
                      width="40px"
                      height="40px"
                    />

                    <h5>{plant.Plant}</h5>
                  </div>

                  <p>{plant.Description}</p>
                </div>
              )
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Full Shade</Typography>
        </AccordionSummary>
        <AccordionDetails className="accordion-body">
        {plants.map(
            (plant, index) =>
              plant["Sun Type"].includes("Full Shade") && (
                <div key={index} className="plant-card">
                  <div className="plant-header">
                    <img
                      src={plant.Image}
                      alt="plant"
                      width="40px"
                      height="40px"
                    />

                    <h5>{plant.Plant}</h5>
                  </div>

                  <p>{plant.Description}</p>
                </div>
              )
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
