import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { Stack, TextField, Box } from '@mui/material';
import MenuItem from '@material-ui/core/MenuItem';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { InputAdornment, Button } from '@material-ui/core';

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

export default function DonationRequestAdd() {
    const [userId, setUserId] = useState(null);
    const [seekerID, setSeekerID] = useState(0);
    const [donationTypes, setDonationTypes] = useState([]);
    const [date, setDate] = useState(new Date());
    const [formData, setFormData] = useState({
        seekerID: "0",
        donationTypeID: 0,
        description: "",
        requiredBefore: new Date().toISOString().split('T', 1),
        amount: "",
        bloodType: 0
    });

    const DonationRequestSchema = Yup.object().shape({
        donationTypeID: Yup.number().min(1, 'Please Select DonationType').required('DonationType Required'),
        description: Yup.string().required('Description Required'),
        requiredBefore: Yup.string().required('Required Before Required'),
        bloodType: Yup.string().when('donationTypeID', {
            is: (val) => val === 1 || val === 2,
            then: Yup.string().required('Blood Type Required'),
        }),
    });

    const formik = useFormik({
        initialValues: {
            seekerID: seekerID,
            donationTypeID: formData.donationTypeID,
            description: formData.description,
            requiredBefore: date.toISOString().split('T')[0],
            amount: formData.amount,
            bloodType: formData.bloodType
        },
        validationSchema: DonationRequestSchema,
        onSubmit: (values) => {
            SaveDonationRequest(values);
        },
    });

    const { errors, setValues, touched, handleSubmit, isSubmitting, getFieldProps, values } = formik;

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem('userId');
        setUserId(userIdFromStorage);
    }, []);

    useEffect(() => {
        if (userId != null) {
            GetCurrentSeekerID();
        }
    }, [userId]);

    useEffect(() => {
        getDonationTypesForTheDropDown();
    }, []);

    async function GetCurrentSeekerID() {
        const result = await axios.get('https://localhost:7211/api/Seeker/GetCurrentSeekerID', { params: { userId: parseInt(userId) } });
        setSeekerID(result.data.data.seekerID);
        return;
    }

    async function SaveDonationRequest(values) {
        let model = {
            seekerID: parseInt(seekerID),
            donationTypeID: parseInt(values.donationTypeID),
            description: values.description,
            requiredBefore: values.requiredBefore,
            amount: values.amount,
            bloodType: parseInt(values.bloodType)
        }
        console.log(model)
        const result = await axios.post('https://localhost:7211/api/DonationRequest/SaveDonationRequest', model);
        if (result.data.statusCode === "Error") {
            toast.error(result.data.message);
            return;
        }
        else {
            toast.success(result.data.message);
            ClearAllGrids();

        }
        return;
    }


    async function getDonationTypesForTheDropDown() {
        const result = await axios.get('https://localhost:7211/api/DonationType/GetDonationTypesForTheDropDown');
        setDonationTypes(result.data.data);
    }

    function generateDonationTypeDropDownMenu(data) {
        let items = []
        if (data != null) {
            data.forEach(x => {
                items.push(x.isActive == true ? <MenuItem key={x.donationTypeID} value={x.donationTypeID}>{x.donationTypeName}</MenuItem> : null)
            });
        }
        return items
    }

    function ClearAllGrids() {
        setValues({
            ...values,
            donationTypeID: 0,
            description: "",
            amount: "",
            bloodType: 0

        })
    }

    console.log("formik", formik.values)

    return (
        <Box>
            <Helmet>
                <title> DonationRequest | MIMS </title>
            </Helmet>
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Donation Request
                </Typography>
                <FormikProvider value={formik}>
                    <ToastContainer
                        position="bottom-right"
                        pauseOnHover
                    />
                    <Form autoComplete="off"
                        disabled={!(formik.isValid && formik.dirty)}
                        noValidate onSubmit={handleSubmit}
                    >
                        <Stack spacing={2}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    label="Donation Type *"
                                    value={formik.values.donationTypeID}
                                    onChange={formik.handleChange}
                                    {...getFieldProps('donationTypeID')}
                                    error={Boolean(touched.donationTypeID && errors.donationTypeID)}
                                    helperText={touched.donationTypeID && errors.donationTypeID}
                                >
                                    <MenuItem key={0} value={0}> Select Donation Type</MenuItem>
                                    {generateDonationTypeDropDownMenu(donationTypes)}
                                </TextField>
                                {formik.values.donationTypeID == 1 || formik.values.donationTypeID == 2 ?
                                    <TextField
                                        select
                                        fullWidth
                                        size="small"
                                        label="Blood Type *"
                                        value={formik.values.bloodType}
                                        onChange={formik.handleChange}
                                        {...getFieldProps('bloodType')}
                                        error={Boolean(touched.bloodType && errors.bloodType)}
                                        helperText={touched.bloodType && errors.bloodType}
                                    >
                                        <MenuItem key={0} value={0}> Select Blood Type</MenuItem>
                                        <MenuItem value={1}> A+</MenuItem>
                                        <MenuItem value={2}> A-</MenuItem>
                                        <MenuItem value={3}> B+</MenuItem>
                                        <MenuItem value={4}> B-</MenuItem>
                                        <MenuItem value={5}> O+</MenuItem>
                                        <MenuItem value={6}> O-</MenuItem>
                                        <MenuItem value={7}> AB+</MenuItem>
                                        <MenuItem value={8}> AB-</MenuItem>
                                    </TextField> : null}
                                {formik.values.donationTypeID == 3 ?
                                    < TextField
                                        fullWidth
                                        size="small"
                                        label="Amount"
                                        value={formik.values.amount}
                                        onChange={formik.handleChange}
                                        {...getFieldProps('amount')}
                                        error={Boolean(touched.amount && errors.amount)}
                                        helperText={touched.amount && errors.amount}
                                    /> : null}
                                <TextField
                                    fullWidth
                                    size="small"
                                    id="date"
                                    label=" Required Before*"
                                    type="date"
                                    value={formik.values.requiredBefore}
                                    onChange={formik.handleChange}
                                    {...getFieldProps('requiredBefore')}
                                    error={Boolean(touched.requiredBefore && errors.requiredBefore)}
                                    helperText={touched.requiredBefore && errors.requiredBefore}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"></InputAdornment>
                                    }}
                                />
                            </Stack>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <StyledTextarea
                                    name="description"
                                    label="Request Description"
                                    aria-label="Request Description"
                                    minRows={3}
                                    placeholder="Request Description"
                                    style={{ width: '100%' }}
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                        </Stack>
                        <br />
                        {/* <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="right" spacing={2}>
                            <Button type="submit" color="secondary" variant="contained">
                                Request
                            </Button>
                        </Stack> */}
                    </Form>
                </FormikProvider>
            </Container>
        </Box>
    );
}