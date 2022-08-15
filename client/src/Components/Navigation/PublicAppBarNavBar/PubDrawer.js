import  React , {useContext} from 'react';
import { MainContext } from "../../../Components/Context/MainContext";
import {  LOGOUT_USER } from "../../../Components/Context/types";

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
import { red, yellow,purpl,black  } from '@mui/material/colors';
import AddBoxIcon from '@mui/icons-material/AddBox';
import KayakingIcon from '@mui/icons-material/Kayaking';
import CottageIcon from '@mui/icons-material/Cottage';
import ChaletIcon from '@mui/icons-material/Chalet';
import GroupIcon from '@mui/icons-material/Group';
import { Link } from 'react-router-dom';
import { Avatar, Badge, Chip, ListItemAvatar, Tooltip, Typography } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PaidIcon from '@mui/icons-material/Paid';
import InfoIcon from '@mui/icons-material/Info';
import SecurityIcon from '@mui/icons-material/Security';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import ContactsIcon from '@mui/icons-material/Contacts';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PolicyIcon from '@mui/icons-material/Policy';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

const drawerWidth = 240;
const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
}));
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PubDrawerCom(props) {

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const { state, dispatch } = useContext(MainContext);
const designationId = state.designation.id;
const handleLogout = () => {
  dispatch({ type: LOGOUT_USER });
};
  const theme = useTheme();

  const mobileNo = localStorage.getItem('mobileNo');

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
             <ListItem alignItems="flex-start">
        <ListItemAvatar>
        <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        badgeContent={
          <SmallAvatar alt="pro" src="https://res.cloudinary.com/mera-tender/image/upload/v1660153628/defaultIcons/11639339665xjgeog8cggi9wquzto3cz97ecgkxkb8m1ukwcmh18x1gjlhbw8p2y72bmg1qhtn5jmsjohq5fcsx8k83jg7jpswjtgmq6hhhyxmu_rcybdu.png" />
        }
      >
        <Avatar alt="user" src="https://res.cloudinary.com/mera-tender/image/upload/v1660153735/defaultIcons/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug_fuhfrj.png" />
      </Badge>
        </ListItemAvatar>
        <ListItemText
          primary={state.name || state.mobileNo || mobileNo}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               Valid till
              </Typography>
              - 22/11/22
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />

          {listData1.map((l, i) => (
              ("aa"=="aa" || (designationId==="admin" && l.admin=== true) || (designationId==="supervisor" && l.supervisor=== true) || (designationId==="fieldPartner" && l.fieldPartner=== true)) &&
              (<Link href={l.link} to={l.link} key={l.link} color="inherit" underline="none">
                  <ListItem button >
                  <Tooltip title={l.text} placement="right">
              <ListItemIcon>
                {l.icon}
              </ListItemIcon>
              </Tooltip>
              <ListItemText style={{color:"black"}} primary={l.text} />
            </ListItem>
          </Link>)
                 
          ))}
        </List>
        <Divider />
  
      

      <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Some public pages in General
        </ListSubheader>
      }
    >

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="General" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {listData2.map((l, i) => (
              ("aa"=="aa" || (designationId==="admin" && l.admin=== true) || (designationId==="supervisor" && l.supervisor=== true) || (designationId==="fieldPartner" && l.fieldPartner=== true)) &&
              (<Link href={l.link} to={l.link} key={l.link} color="inherit" underline="none">
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
      </Collapse>
    </List>
        <Divider />
        <List>
        {listData3.map((l, i) => (
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
     <ListItemText  style={{color:"black"}} primary="LogOut" />
   </ListItem>
 </Link>
				) : (
          <Link to={"#"} href="/" color="inherit" underline="hover">
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
	{ text: "Dashboard", link: "/MainApp", icon: <DashboardIcon color="primary"  />,admin:true,supervisor:true,fieldPartner:true  },
  { text: "Profile", link: "/UserProfile", icon: <AssignmentIndIcon color="success" />,admin:true },
  { text: "Transaction", link: "/transaction", icon: <PaidIcon color="success" />,admin:true },
];
const listData2 = [
	{ text: "About Us", link: "/about", icon: <InfoIcon color="secondary"  />,admin:true,supervisor:true,fieldPartner:true  },
  { text: "Privacy Policy", link: "/PrivacyPolicy", icon: <SecurityIcon color="secondary" />,admin:true },
  { text: "Term & Condition", link: "/TermAndCondition", icon: <VpnLockIcon color="secondary" />,admin:true },
  { text: "Contact Us", link: "/ProContact", icon: <ContactsIcon color="secondary" />,admin:true },
  { text: "Pricing", link: "/PricingContent", icon: <CurrencyRupeeIcon color="secondary" />,admin:true },
  { text: "Refund Policy", link: "/RefundPolicy", icon: <PolicyIcon color="secondary" />,admin:true },
];
const listData3 = [
	// { text: "All User", link: "/AllUser", icon: <GroupIcon sx={{ color: purple [500] }}/> },


];
