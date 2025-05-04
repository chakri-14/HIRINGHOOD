import { Button, Box, Typography, Modal, Paper } from "@mui/material";
import { useState } from "react";
import AddCompany from "./AddCompany";
import CompanyList from "./CompanyList";
import styled from "styled-components";

// Styled components
const CompaniesContainer = styled(Box)`
  padding: 32px;
  background-color: #121212;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled(Typography)`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.5px;
`;

const AddCompanyButton = styled(Button)`
  background-color: #7c3aed;
  color: #ffffff;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  text-transform: none;
  box-shadow: 0 3px 10px rgba(124, 58, 237, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background-color: #6d28d9;
    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
    transform: translateY(-2px);
  }
`;

const AddCompanyModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalPaper = styled(Paper)`
  padding: 0;
  width: 450px;
  border-radius: 10px;
  background-color: #1e1e1e;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
`;

const CompaniesSection = styled(Box)`
  margin-top: 32px;
`;

const Companies = () => {
  const [openAddCompany, setOpenAddCompany] = useState(false);

  const handleAddCompany = () => {
    setOpenAddCompany(true);
  };

  const handleCloseAddCompany = () => {
    setOpenAddCompany(false);
  };

  return (
    <CompaniesContainer>
      <Header>
        <Title>Companies</Title>
        <AddCompanyButton onClick={handleAddCompany}>Add Company</AddCompanyButton>
      </Header>

      {/* Add Company Modal */}
      <AddCompanyModal open={openAddCompany} onClose={handleCloseAddCompany}>
        <ModalPaper>
          <AddCompany openAddCompany={openAddCompany} setOpenAddCompany={setOpenAddCompany} />
        </ModalPaper>
      </AddCompanyModal>

      {/* Company Listings */}
      <CompaniesSection>
        <CompanyList />
      </CompaniesSection>
    </CompaniesContainer>
  );
};

export default Companies;