import { Link } from "react-router-dom";
import  React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { MainContext } from "../../Components/Context/MainContext";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));
export default function DasScreen() {
  const { state, dispatch } = useContext(MainContext);
  const designationId = state.designation.id;
  return (
      <>
     
<Grid container spacing={3}>
<Grid item xs={12} md={12}>
<Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gap: 2,
              }}
            >
                <Grid container spacing={3}>
                {data.map((l,i) => (
                  ("aa" == "aa" || designationId==="admin" || (designationId==="supervisor" && l.supervisor=== true) || (designationId==="fieldPartner" && l.fieldPartner=== true)) &&
                ( <Grid item xs={12} md={6}>
                 <Link to={l.link} >
                 <Item key={l.ele} elevation={l.ele}>
                  {l.title}
                </Item>
                </Link>
                 </Grid>)
           
              ))}

  </Grid>
  
  </Box>
  </Grid>
</Grid>  </>
   
  );
}

const data = [{title:'Dashboard',link:"/dashboard",ele:8},
{title:'Add Category',link:"/AddCategory",ele:8},
{title:'Add Tender',link:"/AddTender",ele:8},
{title:'Add Department',link:"/AddDepartment",ele:8},
{title:'Add State',link:"/AddState",ele:8},
{title:'Sign Up',link:"/signup",ele:8},
{title:'Login',link:"/login",ele:8}]


