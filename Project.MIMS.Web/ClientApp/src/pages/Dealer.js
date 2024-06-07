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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Link as RouterLink, useNavigate, useHref } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { ToastContainer, toast } from 'react-toastify';

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

export default function DealerPage() {
    const navigate = useNavigate();
    const [openFilter, setOpenFilter] = useState(false);
    const [userId, setUserId] = useState(null);
    const [donationTypeID, setDonationTypeID] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [formData, setFormData] = useState({
        dealerName: '',
        regNo: '',
        contactNo: ''
    });

    const formik = useFormik({
        initialValues: {
            dealerName: formData.categoryName,
            regNo: formData.regNo,
            contactNo: formData.contactNo
        },

        validationSchema: () => {
            return Yup.object().shape({
                dealerName: Yup.string().required("Please fill the dealer name"),
                regNo: Yup.string().required("Please fill the registration No"),
                contactNo: Yup.string().required("Please fill the contact No")
            });
        },

        onSubmit: (values) => {
            //SubmitForm(values);
        }
    }
    );

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
        navigate('/dashboard/DealerAdd');
    }

    const { setValues, handleSubmit, getFieldProps, values } = formik;

    return (
        <Box mt={0}>
            <Card>
                <Helmet>
                    <title> Dealer | MIMS </title>
                </Helmet>
                <Container>
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
                            <Stack direction="row" alignItems="center" justifyContent="space-between" style={{ marginTop: '10px' }}>
                                <Typography variant="h6">
                                    Dealer
                                </Typography>
                                <Button variant="contained"
                                    onClick={handleClick}
                                ><AddIcon /></Button>
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
                            {/* <Grid container spacing={3}> */}
                            <Box display="flex" justifyContent="flex-end" p={2} right={0}>
                                <Button
                                    variant="contained"
                                    type='submit'
                                    size='small'
                                >
                                    Search
                                </Button>
                                <Button
                                    variant="outlined"
                                    size='small'
                                    style={{ marginLeft: '10px', color: 'red' }}
                                >
                                    Clear
                                </Button>
                            </Box>
                            {/* </Grid> */}

                            {tableData.length == 0 ?
                                <SearchNotFound searchQuery="Dealers" />
                                :
                                <Box
                                    display="flex"
                                    flexDirection={{ xs: 'column', sm: 'row' }}
                                    alignItems="center"
                                    justifyContent="center"
                                    spacing={1}
                                >
                                    <Card style={{ justifycontent: 'center', width: '85rem' }} >
                                        <TableContainer >
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center">Suplier/ Dealer Name</TableCell>
                                                        <TableCell align="center">Contact No.</TableCell>
                                                        {tableData.some((row) => row.bloodTypeName !== " ") && (
                                                            <TableCell align="center">Address</TableCell>
                                                        )}
                                                        <TableCell align="center">Sub Category Code</TableCell>
                                                        {tableData.some((row) => row.amount !== 0.00) && (
                                                            <TableCell align="center">Status</TableCell>
                                                        )}
                                                        {/* <TableCell align="center">Request Before</TableCell> */}
                                                        <TableCell align="center">Action</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {(rowsPerPage > 0
                                                        ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        : tableData
                                                    )
                                                        .map((row) => {
                                                            const dateParts = row.requestBefore.split('T')[0];
                                                            const formattedDate = new Date(dateParts).toLocaleDateString();

                                                            return (
                                                                <TableRow key={row.donationRequestID}>
                                                                    <TableCell align="center" component="th" scope="row">
                                                                        {row.donationTypeName}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {row.name}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {row.contactNumber}
                                                                    </TableCell>
                                                                    {row.bloodTypeName !== "" && (
                                                                        <TableCell align="center">
                                                                            {row.bloodTypeName}
                                                                        </TableCell>
                                                                    )}
                                                                    {row.amount !== 0.00 && (
                                                                        <TableCell align="center">
                                                                            {row.amount.toFixed(2)}
                                                                        </TableCell>
                                                                    )}
                                                                    <TableCell align="center">
                                                                        {formattedDate}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        <VolunteerActivismIcon />
                                                                        {/* <IconButton aria-label="delete" size="small" onClick={() => handleClick(row)}>
                                <VolunteerActivismIcon />
                              </IconButton> */}
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                </TableBody>
                                                {/* <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={6}
                        count={tableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            'aria-label': 'rows per page',
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter> */}
                                            </Table>
                                        </TableContainer>
                                    </Card>
                                </Box>
                            }
                        </Form>
                    </FormikProvider>
                </Container >
            </Card>
        </Box>
    );
}
