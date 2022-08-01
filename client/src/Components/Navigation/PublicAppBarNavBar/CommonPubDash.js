import  React , {useContext} from 'react';
import { styled, useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';

import PubAppBarCom from "./PubAppBar"
import PubDrawerCom from "./PubDrawer"
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft({compo}) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <PubAppBarCom 
      handleDrawerOpen={handleDrawerOpen}
      open={open}
      />
    
 <PubDrawerCom 
      open={open}
      handleDrawerClose={handleDrawerClose}
      handleDrawerOpen={handleDrawerOpen}

 />
      <Main open={open}>
        <DrawerHeader />
        <div
        style={{backgroundColor:"red",marginLeft:"240px"}}
        >
        {compo}
        
        </div>
      </Main>
    </Box>
  );
}

