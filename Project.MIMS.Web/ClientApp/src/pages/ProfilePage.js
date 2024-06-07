import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Helmet } from 'react-helmet-async';
import Chip from '@mui/material/Chip';
import QRCode from 'react-qr-code';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    avatar: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: theme.spacing(1),
    },
    name: {
        fontWeight: 'bold',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    subtitle: {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(1),
    },
    content: {
        marginTop: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
}));

export default function ProfilePage() {
    const classes = useStyles();
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState({
        userName: "",
        email: "",
        userType: 0
    });
    const [profileData, setProfileData] = useState([]);
    const [imageData, setImageData] = useState([]);

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem('userId');
        setUserId(userIdFromStorage);
    }, []);

    useEffect(() => {
        if (userId != 0) {
            GetUserDetailsByUserID();
        }

    }, [userId]);

    useEffect(() => {
        if (userData.userType != 0) {
            GetUserProfileDetailsByUserID();
            GetUserImageData();
        }
    }, [userData.userType]);

    async function GetUserDetailsByUserID() {
        const result = await axios.get('https://localhost:7211/api/User/GetUserDetailsByUserID', {
            params: {
                userId: userId
            }
        });

        setUserData({
            userName: result.data.data.userName,
            email: result.data.data.email,
            userType: result.data.data.userType
        });
    }

    async function GetUserImageData() {
        if (userId !== 0) {
            const result = await axios.get('https://localhost:7211/api/User/GetUserImageByUserID', {
                params: {
                    userId: userId
                }
            });

            setImageData(result.data.data)
        }
    }

    async function GetUserProfileDetailsByUserID() {
        let model = {
            userID: parseInt(userId),
            userType: userData.userType
        }
        const result = await axios.post('https://localhost:7211/api/Mobile/GetUserDetailsForProfile', model);
        setProfileData(result.data.data);
        return;
    }


    return (
        <div className={classes.root}>
            <Helmet>
                <title> Profile | MIMS </title>
            </Helmet>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4} align="center">
                    <Avatar
                        alt="Profile Picture"
                        src={`data:image/jpeg;base64, ${imageData.image}`}
                        className={classes.avatar}
                    />

                    <Typography variant="h5" component="h1" className={classes.name}>
                        {profileData.name}
                    </Typography>
                    <Typography variant="subtitle1" className={classes.subtitle}>
                        {profileData.userType}
                    </Typography>
                    <Typography variant="subtitle1" className={classes.subtitle}>
                        {profileData.verifyStatus == 2 ?
                            <Chip label="Verified" color="success" />
                            : <Chip label="Not Verified" color="error" />}
                    </Typography>
                    <br />
                    {profileData.verifyStatus == 1 ?
                        <Typography variant="subtitle1" className={classes.subtitle}>
                            <QRCode value={profileData.qrTagNumber} size={100} />
                        </Typography> : null}
                    <Typography variant="subtitle1" className={classes.subtitle}>
                        {"Scan the QR to Verify"}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" component="h2" align="center">
                            About Me
                        </Typography>
                        <div className={classes.content}>
                            <Typography variant="body1">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nulla sed lectus sit amet ipsum volutpat sodales.
                                Vestibulum bibendum tortor eu est rhoncus tincidunt.
                                Fusce congue ex eu risus consequat auctor.
                            </Typography>
                        </div>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" component="h2" align="center">
                            Skills
                        </Typography>
                        <div className={classes.content}>
                            <Typography variant="body1">
                                - Graphic Design <br />
                                - Web Design <br />
                                - UI/UX Design <br />
                                - Photography
                            </Typography>
                        </div>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" component="h2" align="center">
                            Experience
                        </Typography>
                        <div className={classes.content}>
                            <Typography variant="body1">
                                2020 - Present: Freelance Designer <br />
                                2018 - 2020: Design Intern at XYZ Company <br />
                                2017 - 2018: Graphic Designer at ABC Agency
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

