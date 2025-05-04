import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SpeedIcon from '@mui/icons-material/Speed';
import WorkIcon from '@mui/icons-material/Work';
import HelpIcon from '@mui/icons-material/Help';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledAccordion = styled(Accordion)`
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  background-color: #f4f6f8;
  padding: 10px 20px;
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  background-color: #fafafa;
  padding: 15px 20px;
`;

const AccordianComp = () => {
  return (
    <div>
      {/* Accordion 1: Overview */}

    </div>
  );
};

export default AccordianComp;
