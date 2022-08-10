import React from "react";
import { Container, Typography, Grid, Card, Avatar } from "@mui/material";
import { makeStyles } from '@mui/styles';
import StaticAppBar from "./Component/StaticAppBar";
const useStyles = makeStyles(() => ({

	conatiner: {
		zIndex: 2,
		padding: "20px",
		position: "relative",
		marginTop: "1%",
		overflow: "hidden",
		borderTopLeftRadius: "20px",
		borderTopRightRadius: "20px",
	},
	charity: {
	
		background: "url(https://i.ibb.co/KjXnWKy/csr-MeraTender.jpg)",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover",
		height: "400px",
	},
	charText: {
		textAlign: "center",
		paddingTop: 130,
	
		color: "#fff",
	},
	joyImg: {
		width: "80%",
		display: "block",
		marginLeft: "auto",
		marginRight: "auto",
	},
	card: {
		width: 110,
		height: 200,
		borderRadius: 10,
		margin:"2px",
		"&:hover": {
			background: "linear-gradient(0deg, rgba(34,195,120,0.5889706224286589) 0%, rgba(45,168,253,0.6786064767703957) 100%)",
			border: "1px dashed blue",
		},
	},
	avatar: {
		width: 8,
		height: 8,
		marginLeft: "auto",
		marginRight: "auto",
	},
}));

export default function About(props) {
	const classes = useStyles();
	document.title = "About - MeraTender : FREE Online Test Series & Practice - Railway, SSC, Banking, Placement Papers & CBSE Exams For FREE";

	return (
        <StaticAppBar>
		<div>
		
			<Container className={classes.conatiner}>
				<Typography variant="h5" align="center" color="primary" style={{marginBottom:"5%"}}>
					About <strong>MeraTender</strong> | All Bihar Gov. tenders in one place
				</Typography>
				<Typography paragraph align="center" color="textSecondary">
					
Welcome to <strong>Mera Tender</strong>, your number one source for all Tender Information of Bihar. We're dedicated to giving you the very and all tender info, with a focus on to upload each and every tender with 0 error.


Founded in 2022 , <strong>Mera Tender</strong> has come a long way from its beginnings .


We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.


Sincerely,

[- MeraTender]


				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<img className={classes.joyImg} src="https://res.cloudinary.com/mera-tender/image/upload/v1659903946/defaultImage/in-app-bidding_nafmf5.png" alt="happy" border="0" />
					</Grid>
					<Grid item xs={12} sm={6}>
						<br />
						<Typography align="center" variant="h6" color="secondary">
                        Spend your time winning business, not finding it.
						</Typography>
						<Typography align="center" paragraph color="textSecondary">
                        Never miss a single relevant tendering opportunity of Bihar
						</Typography>
						<br />
						<Grid container justify="center" spacing={2}>
							{cardData.map((d, i) => (
								<Grid item key={i}>
									<Card elevation={3} className={classes.card}>
										<Avatar variant="rounded" alt={d.text} src={d.img} className={classes.avatar} />
										<Typography align="center" color="secondary">
											{d.text}
										</Typography>
										<Typography align="center" color="textSecondary">
											{d.des}
										</Typography>
									</Card>
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>
			</Container>
			<div className={classes.charity} alt="charity-water">
				<div className={classes.charText}>
					<h4>Let's make the Nation a better place</h4>
					<p>
						At <strong>MeraTender</strong>, We strongly believe in supporting the needy youth.
					</p>
				</div>
			</div>
	
		</div></StaticAppBar>
	);
}

const cardData = [
	{
		img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs5DQT9_jl0nor9GnlxlJh0qzsYMdtyQxSx0ltaic&s",
		text: "Department",
		des: "Filter Tender with Department to get releavent tender for you",
	},
	{ img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs5DQT9_jl0nor9GnlxlJh0qzsYMdtyQxSx0ltaic&s", text: "District", des: "Filter Tender with District to get releavent tender for you" },
	{ img: "https://www.howto-connect.com/wp-content/uploads/2012/08/Adobe-PDF-logo.png", text: "Save Tender", des: "Save the Tender within app to check it later" },
	{ img: "https://www.howto-connect.com/wp-content/uploads/2012/08/Adobe-PDF-logo.png", text: "Download Files", des: "Download all the file releavent to Tender" },
];
