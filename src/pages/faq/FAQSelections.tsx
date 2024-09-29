import { AccordionDetails, AccordionSummary } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";

import React from "react";

import SvgChevron from "../../assets/icons/SvgChevron";

import { FAQ_QUESTIONS } from "../../utils/variables/accordionContent";

const CustomAccordion = styled(Accordion)(({ theme }) => {
  return {
    boxShadow: "none", // this styles directly apply to accordion
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: "0.5rem",
    justifyContent: "space-between",
    ".MuiAccordionDetails-root": {},
    ".MuiAccordionSummary-root": {},
    // this apply to Summary
  };
});

export default function HelpSelections() {
  return (
    <section className="section faq">
      {FAQ_QUESTIONS.map((subsection, index) => (
        <React.Fragment key={`${index}-${subsection.header}`}>
          <div className="help-subsection">
            <header className="section-header">
              <h2>{subsection.header}</h2>
            </header>
            <div className="quick-tools-btn-group nest-card">
              {subsection.questions.map((question, index) => (
                <React.Fragment key={`${index}-${question.title}`}>
                  <CustomAccordion key={index}>
                    <AccordionSummary
                      expandIcon={<SvgChevron />}
                      aria-controls="panel1-content"
                      className="faq-header"
                    >
                      {question.title}
                    </AccordionSummary>
                    <AccordionDetails className="faq-content">{question.content}</AccordionDetails>
                  </CustomAccordion>
                  <div className="seperator" />
                </React.Fragment>
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </section>
  );
}
