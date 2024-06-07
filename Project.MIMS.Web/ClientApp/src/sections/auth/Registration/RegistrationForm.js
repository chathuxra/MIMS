import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useFormik, Form, FormikProvider } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import MenuItem from '@material-ui/core/MenuItem';
import ImageUploader from 'react-images-upload';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

// ----------------------------------------------------------------------

export default function RegistrationForm() {
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];
    const [ImageObject, setImageObject] = useState();
    const [ImageHide, setImageHide] = useState(true);
    const [donationTypes, setDonationTypes] = useState([]);
    const [registrationData, setRegistrationData] = useState({
        nic: "",
        password: "",
        firstName: "",
        lastName: "",
        gender: 0,
        dob: today,
        address: "",
        image: "",
        donationTypeID: 0,
        userTypeID: 0,
        confirmPassword: "",
        email: "",
        contactNumber: ""
    });
    useEffect(() => {
        getDonationTypesForTheDropDown();
    }, []);
    const RegistrationSchema = Yup.object().shape({
        nic: Yup.string().required('NIC is required'),
        firstName: Yup.string().required('First Name is required'),
        userTypeID: Yup.number().min(1, 'User Type required').required('User Type required'),
        password: Yup.string()
            .required('required')
            .min(8, 'Must be at least 8 characters')
            .max(20, 'Must be at most 20 characters'),
        confirmPassword: Yup.string()
            .required('required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        contactNumber: Yup.string().required('Contact Number is required')
    });

    async function registration(values, image) {
        let model = {
            nic: values.nic,
            password: values.password,
            firstName: values.firstName,
            userTypeID: values.userTypeID,
            lastName: values.lastName,
            dob: values.dob,
            gender: values.gender,
            address: values.address,
            image: values.image,
            donationTypeID: values.donationTypeID,
            confirmPassword: values.confirmPassword,
            email: values.email,
            contactNumber: values.contactNumber,
            image: image
        }
        const result = await axios.post('https://localhost:7211/api/User/Registration', model);
        if (result.data.statusCode === "Error") {
            toast.error("Error Occured in Registration");
            return;
        }
        else {
            toast.success("Successfully Registered", {
                onClose: () => navigate('/login', { replace: true })
            });
        }
    }

    async function getDonationTypesForTheDropDown() {
        const result = await axios.get('https://localhost:7211/api/DonationType/GetDonationTypesForTheDropDown');
        setDonationTypes(result.data.data);
    }

    const formik = useFormik({
        initialValues: {
            nic: registrationData.nic,
            password: registrationData.password,
            firstName: registrationData.firstName,
            userTypeID: registrationData.userTypeID,
            lastName: registrationData.lastName,
            dob: registrationData.dob,
            gender: registrationData.gender,
            address: registrationData.address,
            image: registrationData.image,
            donationTypeID: registrationData.donationTypeID,
            confirmPassword: registrationData.confirmPassword,
            email: registrationData.email,
            contactNumber: registrationData.contactNumber
        },
        validationSchema: RegistrationSchema,
        onSubmit: (values) => {
            registration(values, ImageObject);
        }
    });

    function onDrop(picture, imageUrl) {
        if (imageUrl.length === 0) {
            setImageHide(true)
            return
        }
        else {
            var convertedString = imageUrl[0];
            var fields = convertedString.split(",");
            setImageObject(fields[1]);
            setImageHide(false)
            setRegistrationData({
                ...registrationData,
                image: fields[1]
            });
        }
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

    const { errors, touched, handleSubmit, getFieldProps } = formik;
    return (
        <>
            <FormikProvider value={formik}>
                <ToastContainer
                    position="bottom-right"
                    pauseOnHover
                />
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} style={{ marginTop: '25px' }} spacing={3}>
                        <TextField
                            fullWidth
                            size="small"
                            label="NIC *"
                            value={formik.values.nic}
                            onChange={formik.handleChange}
                            {...getFieldProps('nic')}
                            error={Boolean(touched.nic && errors.nic)}
                            helperText={touched.nic && errors.nic}
                        />
                        <TextField select
                            fullWidth
                            size="small"
                            label="User Type *"
                            value={formik.values.userTypeID}
                            onChange={formik.handleChange}
                            {...getFieldProps('userTypeID')}
                            error={Boolean(touched.userTypeID && errors.userTypeID)}
                            helperText={touched.userTypeID && errors.userTypeID}
                        >
                            <MenuItem key={0} value={0}> Select User Type</MenuItem>
                            <MenuItem value={2}> Donor</MenuItem>
                            <MenuItem value={3}> Seeker</MenuItem>
                        </TextField>
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} style={{ marginTop: '25px' }} spacing={3}>
                        <TextField
                            fullWidth
                            size="small"
                            label="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            {...getFieldProps('firstName')}
                            error={Boolean(touched.firstName && errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                        />
                        <TextField
                            fullWidth
                            size="small"
                            label="Last Name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            {...getFieldProps('lastName')}
                            error={Boolean(touched.lastName && errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                        />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} style={{ marginTop: '25px' }} spacing={3}>
                        <TextField
                            fullWidth
                            id="outlined-name"
                            size="small"
                            type="date"
                            label="DOB"
                            value={formik.values.dob}
                            onChange={formik.handleChange}
                            {...getFieldProps('dob')}
                            InputLabelProps={{ shrink: true }}
                            error={Boolean(touched.dob && errors.dob)}
                            helperText={touched.dob && errors.dob}
                        />
                        <TextField
                            select
                            fullWidth
                            size="small"
                            label="Donation Type "
                            value={formik.values.donationTypeID}
                            onChange={formik.handleChange}
                            {...getFieldProps('donationTypeID')}
                            error={Boolean(touched.donationTypeID && errors.donationTypeID)}
                            helperText={touched.donationTypeID && errors.donationTypeID}
                        >
                            <MenuItem key={0} value={0}> Select Donation Type</MenuItem>
                            {generateDonationTypeDropDownMenu(donationTypes)}
                        </TextField>
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} style={{ marginTop: '25px', marginBottom: '25px' }} spacing={3}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Contact Number *"
                            value={formik.values.contactNumber}
                            onChange={formik.handleChange}
                            {...getFieldProps('contactNumber')}
                            error={Boolean(touched.contactNumber && errors.contactNumber)}
                            helperText={touched.contactNumber && errors.contactNumber}
                        />
                        <TextField
                            select
                            fullWidth
                            size="small"
                            label="Gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            {...getFieldProps('gender')}
                            error={Boolean(touched.gender && errors.gender)}
                            helperText={touched.gender && errors.gender}
                        >
                            <MenuItem key={0} value={0}> Select Gender</MenuItem>
                            <MenuItem value={1}> Male</MenuItem>
                            <MenuItem value={2}> Female</MenuItem>
                        </TextField>

                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} style={{ marginTop: '25px' }} spacing={3}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Password *"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            {...getFieldProps('password')}
                            type="password"
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                        />
                        <TextField
                            fullWidth
                            size="small"
                            label="Confirm Password *"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            {...getFieldProps('confirmPassword')}
                            type="password"
                            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                            helperText={touched.confirmPassword && errors.confirmPassword}
                        />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} style={{ marginTop: '25px', marginBottom: '25px' }} spacing={3}>

                        <TextField
                            fullWidth
                            size="small"
                            label="Address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            {...getFieldProps('address')}
                            error={Boolean(touched.address && errors.address)}
                            helperText={touched.address && errors.address}
                        />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} style={{ marginTop: '25px', marginBottom: '25px' }} spacing={3}>

                        <TextField
                            fullWidth
                            size="small"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            {...getFieldProps('email')}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Card sx={{ maxWidth: 200 }}>
                            <Card hidden={ImageHide}>
                                <CardMedia
                                    component="img"
                                    height="80"
                                    image={`data:image/jpeg;base64,${ImageObject}`}
                                    {...getFieldProps('image')}
                                    error={Boolean(touched.image && errors.image)}
                                    helperText={touched.image && errors.image}
                                />
                            </Card>
                            <ImageUploader
                                withIcon={false}
                                singleImage={true}
                                withPreview={true}
                                buttonText='Upload Your Image'
                                onChange={onDrop}
                                image={formik.values.image}
                                imgExtension={['.jpg', '.png']}
                                maxFileSize={5242880}
                            />
                        </Card>
                    </Stack>
                    <LoadingButton fullWidth size="large" type="submit" variant="contained">
                        Register
                    </LoadingButton>
                </Form>
            </FormikProvider>
        </>
    );
}