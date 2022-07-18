import  React , {useContext} from 'react';
import { MainContext } from "../../../Components/Context/MainContext";
import { DRAWER, LOGOUT_USER } from "../../../Components/Context/types";

import { styled, useTheme } from '@mui/material/styles';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { red, yellow,purple  } from '@mui/material/colors';
import AddBoxIcon from '@mui/icons-material/AddBox';
import KayakingIcon from '@mui/icons-material/Kayaking';
import CottageIcon from '@mui/icons-material/Cottage';
import ChaletIcon from '@mui/icons-material/Chalet';
import GroupIcon from '@mui/icons-material/Group';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PubDrawerCom(props) {


  const { state, dispatch } = useContext(MainContext);
const designationId = state.designation.id;
const handleLogout = () => {
  dispatch({ type: LOGOUT_USER });
};
  const theme = useTheme();


  return (

      <SwipeableDrawer
      variant="temporary"
      anchor="left"
      open={props.open}
         onClose={props.handleDrawerClose}
	    onOpen={props.handleDrawerOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        ModalProps={{
            keepMounted: true, // Better open performance on mobile.
        }}

      >
        <DrawerHeader 
               
        >
          <IconButton onClick={props.handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
            
        >
          {listData1.map((l, i) => (
              ("aa"=="aa" || (designationId==="admin" && l.admin=== true) || (designationId==="supervisor" && l.supervisor=== true) || (designationId==="fieldPartner" && l.fieldPartner=== true)) &&
              (<Link href={l.link} to={l.link} key={l.link} color="inherit" underline="hover">
                  <ListItem button >
                  <Tooltip title={l.text} placement="right">
              <ListItemIcon>
                {l.icon}
              </ListItemIcon>
              </Tooltip>
              <ListItemText primary={l.text} />
            </ListItem>
          </Link>)
                 
          ))}
        </List>
        <Divider />
        <List>
        {listData2.map((l, i) => (
             <Link href={l.link} to={l.link} key={l.text} color="inherit" underline="hover">
                 <ListItem button >
                 <Tooltip title={l.text} placement="right">
             <ListItemIcon>
               {l.icon}
             </ListItemIcon>
             </Tooltip>
             <ListItemText primary={l.text} />
           </ListItem>
         </Link> ))}
         {state.isAuthenticated ? (
				 <Link onClick={handleLogout} to={"#"} href={"#"} color="inherit" underline="hover">
         <ListItem button key="LogOut">
         <Tooltip title="LogOut" placement="right">
     <ListItemIcon>
     <LogoutIcon sx={{ color: red[500] }}/>
     </ListItemIcon>
     </Tooltip>
     <ListItemText primary="LogOut" />
   </ListItem>
 </Link>
				) : (
          <Link to={"#"} href="/login" color="inherit" underline="hover">
          <ListItem button key="Log In">
          <Tooltip title="Log In" placement="right">
      <ListItemIcon>
      <LoginIcon color="success"/>
      </ListItemIcon>
      </Tooltip>
      <ListItemText primary="Log In" />
    </ListItem>
  </Link>
				)}
     
        </List>
      </SwipeableDrawer>
    
  );
}

const listData1 = [
	{ text: "Dashboard", link: "/dashboard", icon: <DashboardIcon color="primary"  />,admin:true,supervisor:true,fieldPartner:true  },
  { text: "Add Tender", link: "/AddTender", icon: <AddBoxIcon color="success" />,admin:true },
  { text: "Add Department", link: "/AddDepartment", icon: <KayakingIcon color="success" />,admin:true },
  { text: "Add State", link: "/AddState", icon: <CottageIcon color="success" />,admin:true },
  { text: "Add District", link: "/AddDistrict", icon: <ChaletIcon color="success" />,admin:true },
];
const listData2 = [
	{ text: "All User", link: "/AllUser", icon: <GroupIcon sx={{ color: purple [500] }}/> },


];
