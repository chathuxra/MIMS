import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
// @mui
import { Container, Stack, Typography, Card, MenuItem, TextField, Button } from '@mui/material';
import { IconButton, Box } from '@material-ui/core';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import SearchNotFound from '../SearchNotFound';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes, { func } from 'prop-types'
import { useTheme } from '@mui/material/styles'
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PerfectScrollbar from 'perfect-scrollbar';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink, useNavigate, useHref } from 'react-router-dom';

// ----------------------------------------------------------------------
function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default function DealerAddPage() {
    const navigate = useNavigate();
    const [openFilter, setOpenFilter] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [userId, setUserId] = useState(null);
    const [donationTypeID, setDonationTypeID] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [formData, setFormData] = useState({
        dealerName: '',
        regNo: '',
        contactNo: '',
        address: '',
        email: ''
    });

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem('userId');
        setUserId(userIdFromStorage);
    }, []);

    useEffect(() => {
        if (userId != null) {
            GetDonationTypeID();
        }
    }, [userId]);

    useEffect(() => {
        if (donationTypeID != 0) {
            DonationRequestDetailsGet();
        }
    }, [donationTypeID]);

    const formik = useFormik({
        initialValues: {
            dealerName: formData.categoryName,
            regNo: formData.regNo,
            contactNo: formData.contactNo,
            address: formData.address,
            email: formData.email
        },

        validationSchema: () => {
            return Yup.object().shape({
                dealerName: Yup.string().required("Please fill the dealer name"),
                regNo: Yup.string().required("Please fill the registration No"),
                contactNo: Yup.string().required("Please fill the contact No"),
                address: Yup.string().required("Please fill the address"),
                email: Yup.string().required("Please fill the email"),
            });
        },

        onSubmit: (values) => {
            SubmitForm(values);
        }
    }
    );

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    async function GetDonationTypeID() {
        const result = await axios.get('https://localhost:7211/api/DonationType/GetDonationTypeID', { params: { userID: parseInt(userId) } });
        setDonationTypeID(result.data.data.donationTypeID);
        return;
    }

    async function DonationRequestDetailsGet() {
        const result = await axios.get('https://localhost:7211/api/DonationRequest/DonationRequestDetailsGet', { params: { DonationTypeID: parseInt(donationTypeID) } });
        setTableData(result.data.data);
        return;
    }

    function handleClick() {
        navigate('/dashboard/Dealer');
    }

    async function SubmitForm(values) {
        if (isUpdate) {
            let model = {
                dealerName: values.categoryName,
                regNo: values.regNo,
                contactNo: values.contactNo,
                address: values.address,
                email: values.email,
                createdBy: userId == null ? 0 : parseInt(userId),
            }
            const result = await axios.post('https://localhost:7211/api/Item/ItemCategoryUpdate', model);
            if (result.data.statusCode === "Error") {
                toast.error(result.data.message);
                return;
            }
            else {
                toast.success(result.data.message, {
                    autoClose: 500,
                    onClose: () => navigate('/dashboard/category', { replace: true })
                });
            }
        } else {
            let model = {
                dealerName: values.categoryName,
                regNo: values.regNo,
                contactNo: values.contactNo,
                address: values.address,
                email: values.email,
                createdBy: userId == null ? 0 : parseInt(userId)
            }
            const result = await axios.post('https://localhost:7211/api/Item/ItemCategorySave', model);
            if (result.data.statusCode === "Error") {
                toast.error(result.data.message);
                return;
            }
            else {
                toast.success(result.data.message, {
                    autoClose: 500,
                    onClose: () => navigate('/dashboard/category', { replace: true })
                });
            }
        }
    }

    const { setValues, handleSubmit, getFieldProps, values } = formik;
    console.log("values", formik.values)

    return (
        <Box mt={0}>
            <Card>
                <Helmet>
                    <title>{isUpdate ? "Update Dealer | MIMS" : "Add Dealer | MIMS"}</title>
                </Helmet>
                <Divider />
                <CardContent>
                    <FormikProvider value={formik}>
                        <ToastContainer
                            position="bottom-right"
                            pauseOnHover
                        />
                        <Form
                            autoComplete="off"
                            disabled={!(formik.isValid && formik.dirty)}
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography variant="h6">
                                    {isUpdate ? "Update Dealer" : "Add Dealer"}
                                </Typography>
                                <Button variant="contained"
                                    onClick={handleClick}><ArrowBackIcon /></Button>
                            </Stack>
                            <br />
                            <Grid container spacing={3} style={{ marginTop: '25px' }}>
                                <Grid item md={4} xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Dealer Name *"
                                        value={formik.values.dealerName}
                                        onChange={formik.handleChange}
                                        {...formik.getFieldProps('dealerName')}
                                        error={Boolean(formik.touched.dealerName && formik.errors.dealerName)}
                                        helperText={formik.touched.dealerName && formik.errors.dealerName}
                                        sx={{ flex: 1 }}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Registration No. *"
                                        value={formik.values.regNo}
                                        onChange={formik.handleChange}
                                        {...formik.getFieldProps('regNo')}
                                        error={Boolean(formik.touched.regNo && formik.errors.regNo)}
                                        helperText={formik.touched.regNo && formik.errors.regNo}
                                        sx={{ flex: 1 }}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Contact No. *"
                                        value={formik.values.contactNo}
                                        onChange={formik.handleChange}
                                        {...formik.getFieldProps('contactNo')}
                                        error={Boolean(formik.touched.contactNo && formik.errors.contactNo)}
                                        helperText={formik.touched.contactNo && formik.errors.contactNo}
                                        sx={{ flex: 1 }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item md={4} xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Address *"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        {...formik.getFieldProps('address')}
                                        error={Boolean(formik.touched.address && formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}
                                        sx={{ flex: 1 }}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Email *"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        {...formik.getFieldProps('email')}
                                        error={Boolean(formik.touched.email && formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        sx={{ flex: 1 }}
                                    />
                                </Grid>
                            </Grid>
                            <Box display="flex" justifyContent="flex-end" p={2}>
                                <Button
                                    color="primary"
                                    type='submit'
                                    size='small'
                                    variant="contained"
                                >
                                    {"Save"}
                                </Button>
                            </Box>
                        </Form>
                    </FormikProvider>
                </CardContent>
            </Card>
        </Box>
    );
}
