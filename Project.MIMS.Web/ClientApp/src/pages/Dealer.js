import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
// @mui
import { Container, Stack, Typography, Card, CardContent, MenuItem, TextField, Button, Tooltip } from '@mui/material';
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
import SettingsIcon from '@mui/icons-material/Settings';

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
    const [dealers, setDealers] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [formData, setFormData] = useState({
        dealerID: 0,
        regNo: "",
        contactNo: ""
    });
    const formik = useFormik({
        initialValues: {
            dealerID: formData.dealerID,
            regNo: formData.regNo,
            contactNo: formData.contactNo
        },

        validationSchema: () => {
            return Yup.object().shape({
                // dealerID: Yup.number().required("Please fill the dealer name"),
                // regNo: Yup.string().required("Please fill the registration No"),
                // contactNo: Yup.string().required("Please fill the contact No")
            });
        },

        onSubmit: () => {
            getTableData();
        }
    }
    );

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem('userId');
        setUserId(userIdFromStorage);
        GetDealersForDropdown();
    }, []);

    // useEffect(() => {
    //     if (userId != null) {
    //         GetDonationTypeID();
    //     }
    // }, [userId]);

    // useEffect(() => {
    //     if (donationTypeID != 0) {
    //         getTableData();
    //     }
    // }, [donationTypeID]);

    useEffect(() => {
        if (formData.dealerID != null) {
            findOtherFieldsWithDealerID();
        }
    }, [formData.dealerID]);

    useEffect(() => {
        if (formData.regNo != '') {
            findOtherFieldsWithregNo();
        }
    }, [formData.regNo]);

    useEffect(() => {
        if (formData.contactNo != '') {
            findOtherFieldsWithContactNo();
        }
    }, [formData.contactNo]);

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

    function handleClickEdit(dealerID) {
        navigate('/dashboard/DealerAdd/' + dealerID)
    }

    async function getTableData() {
        let model = {
            dealerID: parseInt(formData.dealerID),
            regNo: formData.regNo,
            contactNo: formData.contactNo,
        }
        const result = await axios.post('https://localhost:7211/api/Dealer/GetDealerDetails', model);
        setTableData(result.data.data);
        return;
    }

    async function GetDealersForDropdown() {
        var dealerArray = [];
        const response = await axios.get('https://localhost:7211/api/Dealer/GetAllDealersForDropdown');
        // for (let item of Object.entries(response.data.data)) {
        //     dealerArray[item[1]["dealerID"]] = item[1]["dealerName"]
        // }
        setDealers(response.data.data);
    }

    function generateDonationTypeDropDownMenu(data) {
        let items = []
        if (data != null) {
            data.forEach(x => {
                items.push(<MenuItem key={x.dealerID} value={x.dealerID}>{x.dealerName}</MenuItem>)
            });
        }
        return items
    }

    function findOtherFieldsWithDealerID() {
        clear();
        let x = dealers.find(x => x.dealerID === formData.dealerID)
        if (x != undefined) {
            setFormData({
                ...formData,
                regNo: x.regNo,
                contactNo: x.contactNo
            })
        } else {
            setFormData({
                ...formData,
                regNo: '',
                contactNo: ''
            })
        }
    }

    function findOtherFieldsWithregNo() {
        clear();
        let x = dealers.find(x => x.regNo === formData.regNo)
        if (x != undefined) {
            setFormData({
                ...formData,
                dealerID: x.dealerID,
                contactNo: x.contactNo
            })
        } else {
            setFormData({
                ...formData,
                dealerID: null,
                contactNo: ''
            })
        }
    }

    function findOtherFieldsWithContactNo() {
        clear();
        let x = dealers.find(x => x.contactNo === formData.contactNo)
        if (x != undefined) {
            setFormData({
                ...formData,
                dealerID: x.dealerID,
                regNo: x.regNo
            })
        } else {
            setFormData({
                ...formData,
                dealerID: null,
                regNo: ''
            })
        }
    }

    function handleChangeFormData(e) {
        const target = e.target;
        const value = target.value
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    }

    function clear() {
        setFormData({
            ...formData,
            dealerID: null,
            regNo: '',
            contactNo: ''
        });
        setTableData([]);
    }

    function handleClick() {
        var dealerID = 0
        navigate('/dashboard/DealerAdd/' + dealerID);
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
                            <CardContent>
                                <Grid>
                                    <Grid container spacing={3} style={{ marginTop: '25px' }}>
                                        <Grid item md={4} xs={12}>
                                            <TextField
                                                select
                                                fullWidth
                                                size="small"
                                                label="Dealer Name"
                                                name='dealerID'
                                                value={formData.dealerID}
                                                onChange={(e) => { handleChangeFormData(e) }}
                                                //{...getFieldProps('dealerID')}
                                                error={Boolean(formik.touched.dealerID && formik.errors.dealerID)}
                                                helperText={formik.touched.dealerID && formik.errors.dealerID}
                                                sx={{ flex: 1 }}
                                            >
                                                <MenuItem key={0} value={0}> All </MenuItem>
                                                {generateDonationTypeDropDownMenu(dealers)}
                                            </TextField>
                                        </Grid>
                                        <Grid item md={4} xs={12}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label="Registration No."
                                                name='regNo'
                                                value={formData.regNo}
                                                onChange={(e) => { handleChangeFormData(e) }}
                                                //{...formik.getFieldProps('regNo')}
                                                error={Boolean(formik.touched.regNo && formik.errors.regNo)}
                                                helperText={formik.touched.regNo && formik.errors.regNo}
                                                sx={{ flex: 1 }}
                                            />
                                        </Grid>
                                        <Grid item md={4} xs={12}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                label="Contact No."
                                                name='contactNo'
                                                value={formData.contactNo}
                                                onChange={(e) => { handleChangeFormData(e) }}
                                                //{...formik.getFieldProps('contactNo')}
                                                error={Boolean(formik.touched.contactNo && formik.errors.contactNo)}
                                                helperText={formik.touched.contactNo && formik.errors.contactNo}
                                                sx={{ flex: 1 }}
                                            />
                                        </Grid>
                                    </Grid>
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
                                            onClick={() => clear()}
                                            style={{ marginLeft: '10px', color: 'red' }}
                                        >
                                            Clear
                                        </Button>
                                    </Box>
                                </Grid>
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
                                                            <TableCell align="center"><b>Registration No.</b></TableCell>
                                                            <TableCell align="center"><b>Dealer Name</b></TableCell>
                                                            <TableCell align="center"><b>Contact No.</b></TableCell>
                                                            <TableCell align="center"><b>Address</b></TableCell>
                                                            <TableCell align="center"><b>e-mail</b></TableCell>
                                                            <TableCell align="center"><b>Action</b></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {tableData.map((data, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell align="center">{data.regNo}</TableCell>
                                                                <TableCell align="center">{data.dealerName}</TableCell>
                                                                <TableCell align="center">{data.contactNo}</TableCell>
                                                                <TableCell align="center">{data.address}</TableCell>
                                                                <TableCell align="center">{data.email}</TableCell>
                                                                <TableCell align="center">
                                                                    <Tooltip title="Edit Dealer">
                                                                        <IconButton>
                                                                            <SettingsIcon
                                                                                onClick={() => handleClickEdit(data.dealerID)}
                                                                            />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Card>
                                    </Box>
                                }

                            </CardContent>
                        </Form>
                    </FormikProvider>
                </Container >
            </Card>
        </Box>
    );
}
