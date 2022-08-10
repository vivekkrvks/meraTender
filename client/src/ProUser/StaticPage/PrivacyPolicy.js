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

export default function PrivacyPolicy(props) {
	const classes = useStyles();
	document.title = "PrivacyPolicy - MeraTender";

	return (
        <StaticAppBar>
		<div>
		
			<Container className={classes.conatiner}>
				<Typography variant="h5" align="center" color="primary" style={{marginBottom:"5%"}}>
					Privacy Policy for <strong>MeraTender</strong> |
				</Typography>
				<Paper>
					<br />
					
					<Typography color="primary" gutterBottom variant="body1" style={{ padding: "20px" }}>
						Use of the Platform or Services
					</Typography>
					<Typography color="textSecondary" className={classes.padding}>
                    When You register with MeraTender, You are opting in to receive communications 
                    from US electronically by email, SMS, WhatsApp or Chat. You may opt out at any time.
                     From time to time, We will send You updated notifications of relevant business opportunities,
                      as well as information nuggets about MeraTender, site amendments and additional Services.
                       We reserve the right to communicate with You over any available medium. You are hereby 
                       agreeing that all notices, and communications that We provide to You electronically or otherwise,
                        satisfy any legal requirement that such communications be in writing. Users should be aware
                         that unprotected e-mail communication via the Internet is not secure and it is subject to possible 
                         interception, Loss or alteration. MeraTender is not responsible for and will not be liable to the User
                          or anyone else for any damages in connection with any email sent by the User to MeraTender or an e-mail 
                          by MeraTender to the User or anyone else at the Users request. The information contained in this site
                           has been supplied largely by the public/private procurement websites which in turn has been supplied
                            by or on behalf of state/private organizations, pursuant to statutory obligation. MeraTender does not and cannot, vouch for the accuracy of such information. MeraTender shall not be responsible for the consequences of any errors or omissions in the information held on its Database.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
                    User Registration
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
                    As part of the registration process, MeraTender will leverage android ecosystem to fetch Your email ids and OTP from SMS for registering, sending notifications and also sending emails. It is also in alliance with True caller to share user info only for user registration. MeraTender fetches this information only to ease onboarding and show relevant tender recommendations. Passwords or OTP (asked at the time of login) are personal to the User and should not be shared with third parties. The User is responsible for the safekeeping of their password. MeraTender is not responsible for any Loss or damage suffered by a User as a result of other parties accessing the website using their passwords. MeraTender will be indemnified against any Loss incurred by them as a result of such use. The User shall notify MeraTender in writing of any change in the information provided for the MeraTender account. This site or any portion of this site may not be reproduced, duplicated, copied, sold, visited or otherwise exploited for any purpose, commercial or otherwise, without the express written permission of MeraTender. You may not frame or utilize any framing techniques to enclose any trademark, logo or other proprietary information from MeraTender without Our express written permission. Nor You may facilitate a third party to do so. The User acknowledges that records accessed through MeraTender will be as up to date as indicated by the publication data provided on the website of the associated page. The User acknowledges that MeraTender reserves the right to suspend, limit or deny access to the MeraTender website in part or in full, to individual user accounts Your own private use or for the internal purposes or benefit of Your business alone.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
                    Links and Advertisement
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
                    Links to or from web sites and resources may be provided on Our site. These links are provided solely as a convenience to the User of this site and not as an endorsement of the contents of such third-party sites. The information on MeraTender is received from a variety of sources, which include the various public/government authorities and possibly others. All information is hence available as per these sites and therefore governed in turn by the conditions of these organizations. MeraTender has made every reasonable effort to ensure that the information is accurate and authentic however it cannot be held liable for any third-party claims or Losses of any damages. MeraTender makes no warranty, expressed or implied, as to the results obtained from the use of the information. We suggest You read the Terms and Conditions and Privacy Policies of these websites before using or visiting them. No responsibility will be accepted by MeraTender for the Service or advertisement placed or provided through Our website and/or mobile application.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
                    Communication Services and Your Information
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
                    Please note that in accordance with the Information Technology Act, 2000 and its amendment in 2008, and its applicable rules thereunder, in case of non-compliance with applicable law, these Terms of Use and/or the Privacy Policy in relation to the access or usage of Our website and/or mobile application, We have the right to immediately terminate the access or usage rights of any user of Our website and/or mobile application and remove any non-compliant information. Without limiting the generality and effect of the foregoing, You undertake that You shall not host, display, upload, modify, publish, transmit or share any information on the website or mobile application that: belongs to another person and to which You do not have any rights; is grossly harmful, harassing, blasphemous, defamatory, obscene, pornographic, paedophilic, libellous, invasive of another’s privacy, hateful, or racially, ethnically objectionable, disparaging, relating to or encouraging money laundering or gambling, or otherwise unlawful in any manner whatever; harm minors in any way; infringes any patent, trademark, copyright, or other proprietary rights; violates any law for the time being in force; deceives or misleads the addressee about the origin of such messages or communicates an information which is grossly offensive or menacing in nature; impersonate another person; contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource; In order to enable the Company to use Your Information, so that We are not violating any rights You may have in Your Information, You agree to grant Us a non-exclusive, worldwide, perpetual, irrevocable, royalty-free, sub-licensable (through multiple tiers) right to use Your Information, in any media now known or that may come into existence in future.

Without prejudice to Our rights, to the extent required or permitted by applicable law, We may also collect, use and disclose Your information in connection with security-related or law enforcement investigations or in the course of cooperating with authorities or complying with legal requirements.

You shall solely be responsible for any Loss that may be incurred by any person as a consequence of the use of/ reliance on Your Information and You agree and undertake to indemnify and hold harmless, the Company, its employees, officers, affiliates, partners and group companies from all such Losses.

“Loss” for the purposes of these Terms of Use means each Loss, damage, fine, penalty, cost, expense or other liability (including legal and other professional fees) and Losses shall be interpreted accordingly.
					</Typography>
					<b />
					<b />
					<Typography color="primary" gutterBottom variant="body1" className={classes.padding}>
                    Renewals
					</Typography>
					<b />
					<Typography color="textSecondary" className={classes.padding}>
                    We will do Our best to provide constant, uninterrupted access to MeraTender, however, We do not guarantee this and We accept no responsibility for any liability or any interruption or delay.
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
				</Paper>
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
