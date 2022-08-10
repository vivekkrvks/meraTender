import React from "react";
import { Container, Typography, Grid, Card, Avatar } from "@mui/material";
import { makeStyles } from '@mui/styles';
import StaticAppBar from "./Component/StaticAppBar";
import Paper from '@mui/material/Paper';

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

export default function RefundPolicy(props) {
	const classes = useStyles();
	document.title = "PrivacyPolicy - MeraTender";

	return (
        <StaticAppBar>
		<div>
		
			<Container className={classes.conatiner}>
				<Typography variant="h5" align="center" color="primary" style={{marginBottom:"5%"}}>
                Refund / Cancellation Policy for <strong>MeraTender</strong> |
				</Typography>
					<br />
           
                    <b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
						Refund and Cancellation Policy
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
					We recommend You to go through Our refund policy before subscribing Our Service. Services are activated upon complete advance payment only.

Subscription Services CANNOT be cancelled and charges are non-refundable once the account is activated.

We are reliant on tendering authority for display or update of any information related to any tender. We do Our best efforts to provide You information as and when it is published or made available by tendering authority. However, under any circumstances User can’t claim refund for any late information or missed tender or for any errors or missing information on MeraTender.

User is asked to fill up basic mandatory details while applying for subscription Services like company name and address, contact details, email id etc. If details provided by user are incorrect or contains any typo error failing to which user is unable to receive notifications and alerts, user should get the same resolved immediately. For any such concerns, User can’t claim refund from the Company.
					</Typography>
                    <b />
					<b />
				
					<b />
					<Typography color="textSecondary" className={classes.padding}>
						Our focus is complete customer satisfaction.
					
						In the event, if you are displeased with the services provided, we will not refund back the money, provided the reasons are genuine and
						proved after investigation like, Fail of Transaction/Money debited but not reflected as service of that account. Plase Note, in case of
						payment has deducted and service is not started for that account within 24 hours, the user has to send us information via Email/Post
						regarding the valid transactional details, and same bank account details And after verification of the case, user can get the refund of
						money or the service with-in 7 working days (max) of the information. Please read the fine prints of each deal before buying it, it
						provides all the details about the services or the product you purchase. In case of dissatisfaction from our services, clients do not have
						the liberty to cancel their projects and request a refund from us. Our Policy for the cancellation and refund will be as follows: Please
						use our FREE Trail before you pay for any plan. Refund Policy We will try our best to create the suitable design concepts for our clients.
						In case any client is not completely satisfied with our products we can NOT provide any refund.
					</Typography>
                    <b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						Use of the Platform or Services
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
						Please read the following terms and conditions carefully before registering on, accessing, browsing, downloading or using the "<strong>Mera Tender</strong>"
						website located at <a href="http://meratender.com/">http://meratender.com/</a>, and all associated sites linked to
						www.meratender.com, or any similar platform (hereinafter collectively, the MeraTender's Platform, having its registered office at
						<b> Tollygunge, Kasturba Building, Patna – 800001 </b> on any device and/or before availing any services offered by <strong>Mera Tender</strong> on the
						<strong>Mera Tender</strong> Platform which may include services such as donation or contribution or any other service that may be offered by <strong>Mera Tender</strong> on
						the <strong>Mera Tender</strong> Platform (hereinafter individually, and collectively, the <strong>Mera Tender</strong> Services). For the avoidance of doubt, it is clarified
						that these terms and conditions shall apply to all Our Services, whether offered by <strong>Mera Tender</strong>.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
						Acceptance
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
						By registering on, accessing, browsing, downloading or using the "<strong>Mera Tender</strong>" Platform for any general-purpose or for the specific purpose
						of availing any <strong>Mera Tender</strong> Service, You agree to be bound by the single-sign-on ID (hereinafter SSOID) terms and conditions set forth below
						as well as by the service-specific terms and conditions applicable to each <strong>Mera Tender</strong> Service (hereinafter collectively, the T&Cs). These
						T&Cs shall also include any additional or modified terms and conditions in relation to the SSOID or any additional or modified
						service-specific T&Cs in relation to any <strong>Mera Tender</strong> Service or any future service that may be offered by <strong>Mera Tender</strong> on the <strong>Mera Tender</strong>
						Platform. By registering on, accessing, browsing, downloading, or using (as applicable) the <strong>Mera Tender</strong> Platform or availing any <strong>Mera Tender</strong>
						Service or the SSOID, You automatically and immediately agree to all the T&Cs. If at any time You do not accept or agree with any of the
						T&Cs or do not wish to be bound by the T&Cs, You may not access, browse or use the <strong>Mera Tender</strong> Platform and immediately terminate Your
						availing the <strong>Mera Tender</strong> Services. Accepting or agreeing to the T&Cs will constitute a legal contract (hereinafter Agreement) between You,
						being at least 18 years of age and an individual user of the <strong>Mera Tender</strong> Platform or a customer, donor or beneficiary of the <strong>Mera Tender</strong>
						Services. All services are rendered by <strong>Mera Tender</strong> through the <strong>Mera Tender</strong> Platform under the brand name <strong>Mera Tender</strong> (or any derivatives or
						variations thereof). Consequently, all the rights, benefits, liabilities and obligations under the T&Cs shall, as the case may be, accrue
						to the benefit of, or incurred by, <strong>Mera Tender</strong>, regarding Your use of MeraTender digital services (which includes donation and
						contribution), or any such other services which may be added on the <strong>Mera Tender</strong> Platform and which will henceforth be a <strong>Mera Tender</strong> Service,
						from time to time. The <strong>Mera Tender</strong> HRIDHI Services shall be used by You subject to Your adherence with the T&Cs. As long as You accept and
						comply with these T&Cs, <strong>Mera Tender</strong> HRIDHI grants You a personal, nonexclusive, non-transferable, limited, revocable privilege to enter and
						use the <strong>Mera Tender</strong> Platform and/or avail the <strong>Mera Tender</strong> Services. The terms "We" / "Us" / "Our"/”Company” individually and collectively
						refer to meratender.com and the terms "Visitor” ”User” refer to the users. <br />
						This page states the Terms and Conditions under which you (Visitor) may visit this website (“Website”). Please read this page carefully.
						If you do not accept the Terms and Conditions stated here, we would request you to exit this site. The business, any of its business
						divisions and / or its subsidiaries, associate companies or subsidiaries to subsidiaries or such other investment companies (in India or
						abroad) reserve their respective rights to revise these Terms and Conditions at any time by updating this posting. You should visit this
						page periodically to re-appraise yourself of the Terms and Conditions, because they are binding on all users of this Website.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
						Indemnification
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
						You agree to indemnify, save, and hold <strong>Mera Tender</strong>, its affiliates, employees, officers, directors and partners harmless from any and all
						claims, losses, damages, and liabilities, costs and expenses, including without limitation legal fees and expenses, arising out of or
						related to: (i) Your use or misuse of the <strong>Mera Tender</strong> Services or of the <strong>Mera Tender</strong> Platform; (ii) any violation by You of this Agreement or
						the SSOID Agreement; or (iii) any breach of the representations, warranties, and covenants made by You herein. <strong>Mera Tender</strong> reserves the
						right, at Your expense, to assume the exclusive defense and control of any matter for which You are required to indemnify <strong>Mera Tender</strong>,
						including rights to settle, and You agree to cooperate with we defense and settlement of these claims. We will use reasonable efforts to
						notify You of any claim, action, or proceeding brought by a third party that is subject to the foregoing indemnification upon becoming
						aware of it. This paragraph shall survive termination of this Agreement.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
						Disclaimer; No Warranties
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
						To the fullest extent permissible pursuant to applicable law, <strong>Mera Tender</strong> and its third-party partners disclaim all warranties or guarantees
						– whether statutory, express or implied – including, but not limited to, implied warranties of merchantability, fitness for a particular
						purpose, and non-infringement of proprietary rights. No advice or information, whether oral or written, obtained by You from <strong>Mera Tender</strong> or
						through the <strong>Mera Tender</strong> Services or the <strong>Mera Tender</strong> Platform will create any warranty or guarantee other than those expressly stated herein.
						For the purposes of this Disclaimer, You expressly acknowledge that as used in this section, the term <strong>"Mera Tender"</strong> includes <strong>Mera Tender</strong>'S
						officers, directors, employees. You acknowledge that <strong>Mera Tender</strong> (www.meratender.com) is a purely social and profit enterprise, registered
						under The MSME Development Act, 2006 and is not liable for any third party (telecom companies, mobile operators or suppliers) obligations
						due to rates, quality and all other instances, whether to any such telecom companies’ subscribers or otherwise. You expressly agree that
						the use of the <strong>Mera Tender</strong> Services on our Platform is at Your sole risk. It is Your responsibility to evaluate the accuracy, completeness
						and usefulness of all opinions, advice, services, merchandise and other information provided through the site or on the Internet
						generally. We do not warrant that our Services will be uninterrupted or error-free or that defects in the site will be corrected. The
						<strong>Mera Tender</strong> Services and our Platform and any data, information, third party software, reference sites, services, or software made available
						in conjunction with or through the services and the site are provided on an “as is” and “as available,” “with all faults” basis and
						without warranties or representations of any kind either express or implied. <strong>Mera Tender</strong>, and its partners do not warrant that the data, our
						software, functions, or any other information offered on or through our Services/ our Platform or any reference sites/ platforms/ services
						will be uninterrupted, or free of errors, viruses or other harmful components and do not warrant that any of the foregoing will be
						corrected. <strong>Mera Tender</strong> and its licensors, and partners do not warrant or make any representations regarding the use or the results of the
						use of Our Services/ Our Platform or any reference sites/ platforms/ services in terms of correctness, accuracy, reliability, or
						otherwise. You understand and agree that You use, access, download, or otherwise obtain information, materials, or data through Our
						Services/ Our Platform or any reference sites/ platforms/ services at Your own discretion and risk and that You will be solely responsible
						for any damage to Your property (including Your computer system and mobile device or any other equipment) or loss of data that results
						from the download or use of such material or data. We do not authorize anyone to make any warranty on our behalf and You should not rely
						on any such statement. This paragraph shall survive the termination of this Agreement. In no event will <strong>Mera Tender</strong> be liable for any
						incidental, consequential, or indirect damages (including, but not limited to, damages for loss of profits, business interruption, loss of
						programs or information and the like) arising out of the use of or inability to use Our Platform.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
						Ownership; Proprietary Rights
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
						The <strong>Mera Tender</strong> Services and Our Platform are owned and operated by <strong>Mera Tender</strong> for Social Welfare. The visual interfaces, graphics, design,
						compilation, information, computer code (including source code and object code), services, and all other elements of Our Services and Our
						Platform provided by <strong>Mera Tender</strong> for Social Welfare are protected by international conventions, and all other relevant intellectual property
						and proprietary rights, and applicable laws. As between You and <strong>Mera Tender</strong>, all services and programs contained on Our are the property of
						<strong>Mera Tender</strong> for Social Welfare. You agree not to remove, obscure, or alter Anudip or any third party’s copyright, patent, trademark, or
						other proprietary rights notices affixed to or contained within or accessed in conjunction with or through Our Services/ Platform. Except
						as expressly authorized by <strong>Mera Tender</strong>, You agree not to sell, license, distribute, copy, modify, publicly perform or display, transmit,
						publish, edit, adapt, create derivative works from, or otherwise make unauthorized use of the services. <strong>Mera Tender</strong> reserves all rights not
						expressly granted in this Agreement. If You have comments regarding Our Services and/or Our Platform or ideas on how to improve it, please
						contact customer service. Please note that by doing so, You hereby irrevocably assign to <strong>Mera Tender</strong>, and shall assign to <strong>Mera Tender</strong>, all
						rights, title and interests in and to all ideas and suggestions and any and all worldwide intellectual property rights associated
						therewith. You agree to perform such acts and execute such documents as may be reasonably necessary to perfect the foregoing rights.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
						Dispute Resolution
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
						If any dispute, controversy or claim arises under this Agreement or in relation to any <strong>Mera Tender</strong> Service or our Platform, including any
						question regarding the existence, validity or termination of this Agreement or T&Cs (hereinafter Dispute), the parties shall use all
						reasonable endeavors to resolve such Dispute amicably. If the parties are unable to resolve the Dispute amicably within 30 days of the
						notice of such Dispute, <strong>Mera Tender</strong> may elect to resolve any Dispute by binding arbitration in accordance with the provisions of the Indian
						Arbitration & Conciliation Act, 1996 (hereinafter Act). Such Dispute shall be arbitrated on an individual basis and shall not be
						consolidated in any arbitration with any claim or controversy of any other party. The Dispute shall be resolved by a sole arbitrator,
						appointed in accordance with the Act. The seat of the arbitration shall be New Delhi and the language of this arbitration shall be
						English. Either You or Anudip may seek any interim or preliminary relief from a court of competent jurisdiction in Patna necessary to
						protect the rights or the property belonging to You or <strong>Mera Tender</strong> (or any of our agents, suppliers, and subcontractors), pending the
						completion of arbitration. Any arbitration shall be confidential, and neither You nor <strong>Mera Tender</strong> may disclose the existence, content or
						results of any arbitration, except as may be required by law or for purposes of enforcing the arbitration award. All administrative fees
						and expenses of arbitration will be divided equally between You and <strong>Mera Tender</strong>. In all arbitrations, each party will bear the expense of
						its own lawyers and preparation. This paragraph shall survive termination of this Agreement.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
						Governing Law and Forum for Disputes
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
						Subject to the Dispute Resolution section above, You agree that any claim or dispute You may have against <strong>Mera Tender</strong> must be resolved by a
						court having jurisdiction in Patna, India. You agree to submit to the personal jurisdiction of the courts located within Patna, India,
						for the purpose of litigating all such claims or disputes. This Agreement shall be governed by Indian law. This paragraph shall survive
						termination of this Agreement.
					</Typography>
			
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
						{/* Key Persons :- Mr. Raghav Jha & Mr. Vivek Singh (Grievance Officer) <br />
						<a href="http://quallifier.co.in/">http://quallifier.co.in/</a> <br />
						Registered under, The MSME Act,2006 (A unit of Softechinfra) <br /> */}
						Email: contact@meratender.com 
					</Typography>
					<b />
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
