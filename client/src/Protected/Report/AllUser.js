import  React ,{useEffect, useState} from 'react';
import CachedIcon from '@mui/icons-material/Cached';

import { DataGrid } from '@mui/x-data-grid';
import CommonDash from './../../Protected/MyDashboard/CommonDash';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from "axios";
import { Autocomplete, TextField, Card,
     Accordion, AccordionSummary,
      FormControlLabel, Switch, AccordionDetails,
       Button, Chip, Tooltip, Fab,    
    } from '@mui/material';
import { FcExpand,FcSearch,FcRefresh,} from "react-icons/fc";

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { MdClearAll } from 'react-icons/md';
const useStyles = styled((theme) => ({
	dashbody: {
		height: "100vh",
        display: 'flex',
	},
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      },
    content:{
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    workArea:{
        padding:theme.spacing(2)
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
    
}));
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));
export default function DataTable() {
    
    const [tableData,setTableData]=useState([]);

    const [expandBasic,setExpand]=useState(true);
    const [showAdv,setAdv]=useState(false);
    let todayDate = new Date()
    let date = todayDate.getDate();
    let month = todayDate.getMonth() + 1;
    if(month<=9){
      month = "0"+month;
    }
    let year = todayDate.getFullYear();
    let formatDate = year + "-" + month + "-" + date;
    const [startDate, setStartDate] = React.useState(formatDate);
    const [endDate, setEndDate] = React.useState(formatDate);
    const [visibility, setVisibility] = useState(
      { label: "", id: "" }
    );
    
    useEffect(() => {
      getTableData();

    }, []);

    const getTableData = async (word) => {
      let dataToSend = {
      }
      await axios
        .post(`/api/v1/report/getUserReport/getAll`,dataToSend)
        .then((res) => (setTableData(res.data)))
        .catch((err) => console.log(err));
    };
    const getTableDataWithFiter = async(word) => {
      let dataToSend = {
        startDate:startDate,
        endDate:endDate,
        visibility:visibility,
      }
      await axios
        .post(`/api/v1/addition/business/getBusiness/filterData`,dataToSend)
        .then((res) => (setTableData(res.data)))
        .catch((err) => console.log(err));
    };
const classes = useStyles();
  return (
    <CommonDash compo = 
    {
        <>
    <Grid container spacing={2}>  
       <Grid item xs={12}>            
       <Card className={classes.workArea}>
         <div style={{display:"flex",justifyContent:"center"}}> 
       <Chip style={{marginBottom:"4px"}} color="primary" label="View User"  />    
       </div>
       <Accordion expanded={expandBasic}>
        <AccordionSummary
        onClick={()=>setExpand(!expandBasic)}
          expandIcon={<FcExpand />}
          aria-controls="basic-filter"
          id="basic-filter"
        >  
             <Button variant="outlined"
             onClick={() => (getTableData())}
             startIcon={<CachedIcon />}>
        Refresh Data
      </Button>
          <span style={{flexGrow:0.5}}/>
          <FormControlLabel
        control={<Switch color="secondary" checked={showAdv} onChange={() => {setAdv(!showAdv);setExpand(true)}} />}
        label={showAdv?"Advance Filter":"Basic Filter"} labelPlacement="start"
      />
   
        </AccordionSummary>
        
           {showAdv&&(<><AccordionDetails>
        <Grid container spacing={4}> <Grid item xs={12} md={4}>
              
            <TextField type="date" fullWidth  value={startDate} required={false} onChange={e=>(setStartDate(e.target.value),setEndDate(e.target.value))} inputProps={{ max:formatDate,min:"2022-01-11"}} InputLabelProps={{ shrink: true }}  label="Start Date" />
        
             </Grid>
            <Grid item xs={12} md={4}>
              
            <TextField type="date" fullWidth  value={endDate} required={false} onChange={e=>(setEndDate(e.target.value))} inputProps={{ max:formatDate,min:startDate}} InputLabelProps={{ shrink: true }}  label="End Date" />
        
             </Grid>
            <Grid item xs={12} md={4}>
            <Autocomplete
                  color="secondary"
                  disablePortal
                  id="combo-box-demo"
                  options={visibilityOption}
                  value={visibility}
                  getOptionLabel={(option) => option.label}
                  onChange={(e, v) => {
                    setVisibility(v);
                    
                  }}
                  renderInput={(params) => <TextField {...params} label="Visibility" />}
                  />
        
             </Grid>  
             <Grid item xs={12} style={{display:"flex",alignItems:"center"}}>
           <span style={{flexGrow:0.5}}/>
            <Button
        variant="outlined"
        color="primary"
        startIcon={<FcSearch />}
        onClick={() => getTableDataWithFiter()}
      >
        Get Data
      </Button>
      <span style={{flexGrow:0.05}}/>
      
            </Grid> 
            </Grid>
        </AccordionDetails>
      </>)}        
      </Accordion>
        </Card>          
         </Grid>
      <Grid item xs={12}>
        <Card className={classes.workArea}>
        <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={tableData}
        columns={coData}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>  </Card></Grid> </Grid></> } />  
  );
}

    const coData = [
    
      { field: 'date', headerName: 'Date', width: 210 },
      { field: 'mobileNo', headerName: 'Mobile No', width: 210 },
      { field: 'isProUser', headerName: 'Paid By User', width: 210 },
      { field: 'mobileVerified', headerName: 'Mobile Verified', width: 210 },
      { field: 'name', headerName: 'Name', width: 130 },
      { field: '_id', headerName: 'ID ', width: 210 },
      
    ];
    const visibilityOption = [
      { label: 'Public', id: "public" },
      { label: 'Unlisted', id: "unlisted" },
      { label: 'Private', id: "private" },
      {label: 'Pending', id: "pending" },
    ]
    
