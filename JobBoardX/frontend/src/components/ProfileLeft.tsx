import { Box, Avatar, Typography, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

const ProfileCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#fff",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
}));

const StatBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
  marginTop: theme.spacing(2),
}));

const StatItem = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(1),
  flex: 1,
  cursor: "pointer",
  transition: "color 0.3s ease",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

type User = {
  name: string;
  email: string;
  profilePhoto: string;
};

type NavigationProps = {
  user: User | null;
};

const ProfileLeft: React.FC<NavigationProps> = ({ user }) => {
 
  if (!user) {
    return (
      <ProfileCard>
        <Typography variant="h6">Loading user...</Typography>
      </ProfileCard>
    );
  }

  return (
    <ProfileCard>
      <Avatar
        src={user.profilePhoto}
        alt={user.name}
        sx={{ width: 64, height: 64, marginBottom: 1 }}
      />
      <Typography variant="h6" fontWeight="bold">
        {user.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {user.email}
      </Typography>
      <Divider sx={{ width: "100%", my: 2 }} />
      <StatBox>
        <StatItem>
          <Typography variant="subtitle2" fontWeight="bold">
            Applied
          </Typography>
        </StatItem>
        <StatItem>
          <Typography variant="subtitle2" fontWeight="bold">
            Recruiter Actions
          </Typography>
        </StatItem>
      </StatBox>
    </ProfileCard>
  );
};

export default ProfileLeft;
