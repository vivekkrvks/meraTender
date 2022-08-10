import  React , {useContext} from 'react';
import { MainContext } from "../../../Components/Context/MainContext";
import { DRAWER, LOGOUT_USER } from "../../../Components/Context/types";


import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';



import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const drawerWidth = 240;



export default function PubAppBarCom(props) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { state, dispatch } = useContext(MainContext);

  const handleLogout = () => {
    dispatch({ type: LOGOUT_USER });
  };
  return (
    <>
      <AppBar style={{marginBottom:"auto"}} color="default" position="fixed" open={props.open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => props.handleDrawerOpen()}
            edge="start"
            sx={{ mr: 2, ...(props.open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
         		<Link to="/">
						<img
            style={{maxHeight: "50px"}}
							src="https://res.cloudinary.com/mera-tender/image/upload/v1658171115/defaultLogo/MERA-removebg-preview_s4dviw.png"
							alt="Qualifier-logo"
							border="0"
						/>
					</Link>
          <Box sx={{ flexGrow: 0 }} style={{marginRight:"2px",marginLeft:"auto"}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="https://res.cloudinary.com/mera-tender/image/upload/v1660153735/defaultIcons/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug_fuhfrj.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {myList.map((value,i) => (                
                <MenuItem key={value.link} onClick={handleCloseUserMenu}>
                  <Link href={value.link} to={value.link}  >
                  <Typography textAlign="center">{value.text}</Typography></Link>
                </MenuItem>
              ))}
              <MenuItem  onClick={handleCloseUserMenu} style={{color:"red"}}>
				 <Link onClick={handleLogout} to={"#"} href={"#"} color="inherit" underline="hover">
                  <Typography textAlign="center">Logout</Typography> </Link>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
 
      </>
  );
}


const myList = [
	{ text: "Dashboard", link: "/dashboard" },
  { text: "Transaction", link: "/AddTender"},
  { text: "Profile", link: "/AddDepartment"},
];


