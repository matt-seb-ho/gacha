import React, { useContext, useState, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CasinoIcon from '@mui/icons-material/Casino';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { UserContext } from '../contexts/UserContext'
import Gacha from '../components/Gacha';
import { getAuth, signOut } from "firebase/auth";


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme({palette: {mode: 'dark'}});

const styles = {
  // this group of buttons will be aligned to the right side
  loginButton: {
    marginLeft: 'auto',
  },
};

export default function Home() {
  const navigate = useNavigate();
  const auth = getAuth();
  const navToLogin = useCallback(() => navigate('login', {replace: true}), [navigate]);
  const handleLogoutClick = useCallback(() => {
    // db.auth().signOut(); 
    signOut(auth);
    navigate('login', {replace: true})
  }, [navigate]);
  const { user } = useContext(UserContext);

  const faito = () => { 
    console.log("Home console log: ", user.uid)
  };
  
  const { 
    povertyPoints, 
    premiumPoints, 
    name
    // setPovertyPoints, 
    // setPremiumPoints
  } = useContext(UserContext);
  // const [gold, setGold] = useState(0);
  const [gachaOpen, setGachaOpen] = useState(false);
  const handleGachaOpen = () => {user? setGachaOpen(true) : navToLogin()};
  const handleGachaClose = () => setGachaOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <CasinoIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" noWrap>
              Legitimate Vibeo Game
            </Typography>
          </Box>
          {
            user ? (
              <p>
                Welcome, {name} 
                <Button 
                  variant="outlined" 
                  color="error" 
                  sx={{ml: "10px"}}
                  onClick={handleLogoutClick}
                >Log out</Button>
              </p>
            ) : (         
              <Button variant="outlined" onClick={navToLogin}>Login</Button>
            )
          }
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Legitimate Vibeo Game
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              This is a video game that is legitimate (not a scam).
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Chip label={`Poverty Points ${povertyPoints}`} />
              <Chip label={`Premium Points ${premiumPoints}`} variant="outlined" />
            </Stack>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={handleGachaOpen}>Roll Gacha</Button>
              <Button variant="outlined" onClick={faito}>Fight (Choose Violence)</Button>
              <Gacha open={gachaOpen} handleClose={handleGachaClose} />
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
