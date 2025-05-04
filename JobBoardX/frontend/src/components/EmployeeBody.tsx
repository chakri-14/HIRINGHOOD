import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import ProfileLeft from "./ProfileLeft";
import JobCard from "./JobCard";
import axios from "axios";
import AccordianComp from "./AccordianComp";

const MainBody = styled(Grid)`
  min-height: 100vh;
  display: flex;
  padding: 20px;
  overflow: hidden;
`;

const StickySide = styled(Box)`
  position: sticky;
  top: 0;
  // height: 100vh;
  // overflow-y: auto;
  padding: 10px;
`;

const CenterFeed = styled(Box)`
  flex: 1;
  // height: calc(100vh - 40px); /* Subtract the padding and margins */
  overflow-y: auto;
  padding: 10px;
`;

type User = {
  name: string;
  email: string;
  profilePhoto: string;
};

type Company = {
  name: string;
  location: string;
  description: string;
  website: string;
};

type NavigationProps = {
  user: User | null;
};

const EmployeeBody: React.FC<NavigationProps> = ({ user }) => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    // Fetch companies data from the API
    axios
      .get("http://localhost:5000/api/v1/user/companies")
      .then((response) => {
        if (response.data.success) {
          setCompanies(response.data.data); // Set the company data into state
        }
      })
      .catch((error) => {
        console.error("Error fetching companies data:", error);
      });
  }, []);

  return (
    <MainBody container spacing={2}>
      <Grid size={3}>
        <StickySide>
          <ProfileLeft user={user} />
        </StickySide>
      </Grid>
      <Grid size={6}>
        <CenterFeed>
          {companies.length > 0 ? (
            companies.slice(0,5).map((company, index) => (
              <JobCard
                key={index}
                name={company.name}
                location={company.location}
                description={company.description}
                website={company.website}
              />
            ))
          ) : (
            <Typography>No companies available</Typography>
          )}
        </CenterFeed>
      </Grid>
      <Grid size={3}>
        <StickySide>
          <AccordianComp/>
        </StickySide>
      </Grid>
    </MainBody>
  );
};

export default EmployeeBody;
