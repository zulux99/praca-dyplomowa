import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EarbudsIcon from '@mui/icons-material/Earbuds';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AuthContext from '../context/AuthContext';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { isBrowser } from 'react-device-detect';

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navBarPagesArrayGuest = [{ link: '/login', name: 'Zaloguj się' }];
  const navBarPagesArrayUser = [
    { link: '/', name: 'Strona główna' },
    { link: '/konta', name: 'Konta' },
    { link: '/przychody', name: 'Przychody' },
    { link: '/wydatki', name: 'Wydatki' },
    { link: '/dluznicy', name: 'Dłużnicy' },
    { link: '/kategorie', name: 'Kategorie' }
  ];
  return (
    <>
      <Box>
        <AppBar position="fixed" className="pasek-gorny">
          <Toolbar className="pasek-gorny-zawartosc">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsNavExpanded(!isNavExpanded)}>
              <MenuIcon />
            </IconButton>
            <Typography
              className="pasek-gorny-tytul"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}>
              <Link to="/">Aplikacja webowa</Link>
            </Typography>
            {isBrowser && (
              <List className="gorne-menu">
                {user
                  ? navBarPagesArrayUser.map((page, index) => (
                      <Link key={index} to={page.link} className="gorne-menu-link">
                        <ListItemButton className="gorne-menu-button">{page.name}</ListItemButton>
                      </Link>
                    ))
                  : navBarPagesArrayGuest.map((page, index) => (
                      <Link key={index} to={page.link} className="gorne-menu-link">
                        <ListItemButton className="gorne-menu-button">{page.name}</ListItemButton>
                      </Link>
                    ))}
              </List>
            )}
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          open={isNavExpanded}
          onClose={() => setIsNavExpanded(false)}
          onOpen={() => setIsNavExpanded(true)}>
          <Box onClick={() => setIsNavExpanded(!isNavExpanded)} sx={{ justifyContent: 'right' }}>
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {user
              ? navBarPagesArrayUser.map((page, index) => (
                  <ListItem key={index} disablePadding>
                    <Link
                      key={index}
                      to={page.link}
                      onClick={() => setIsNavExpanded(false)}
                      className="boczne-menu-link">
                      <ListItemButton sx={{ justifyContent: 'center' }}>
                        <ListItemIcon>
                          <EarbudsIcon />
                        </ListItemIcon>
                        <ListItemText primary={page.name} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))
              : navBarPagesArrayGuest.map((page, index) => (
                  <Link
                    key={index}
                    to={page.link}
                    onClick={() => setIsNavExpanded(false)}
                    className="boczne-menu-link">
                    <ListItem key={index} disablePadding>
                      <ListItemButton sx={{ justifyContent: 'center' }}>
                        <ListItemIcon>
                          <EarbudsIcon />
                        </ListItemIcon>
                        <ListItemText primary={page.name} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                ))}
            {user && (
              <ListItem disablePadding onClick={logoutUser}>
                <ListItemButton
                  sx={{ justifyContent: 'center' }}
                  onClick={() => setIsNavExpanded(false)}>
                  <ListItemIcon>
                    <EarbudsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Wyloguj się" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </SwipeableDrawer>
      </Box>
    </>
  );
}

export default Navbar;
