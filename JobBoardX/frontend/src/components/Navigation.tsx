
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const NavLink = styled(Button)`
  color: black;
  text-transform: none;
  font-size: 16px;
  font-weight: 500;
  margin: 0 12px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;



const StyledAppBar = styled(AppBar)`
  background-color: rgb(253, 254, 255);
  box-shadow: none;
`;



const Navigation= () => {
  
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem("user")||'{}')
  console.log("current user",currentUser.name)
  

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
            JobBoardX
          </Typography>
          <NavLink onClick={()=>navigate("/seeker/home")}>Home</NavLink>
          <NavLink onClick={()=>navigate("/seeker/jobs")}>Jobs</NavLink>
          <NavLink onClick={()=>navigate("/seeker/applications")}>Applications</NavLink>
        
          <NavLink onClick={()=>navigate("/seeker/profile")}>Profile</NavLink>
          <Button
          onClick={()=>{
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            navigate("/")
          }}
          >Logout</Button>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navigation;
