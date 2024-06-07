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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Link as RouterLink, useNavigate, useHref } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
// import { AESEncryptionParam } from '../helpers/AesEncrypt';
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

export default function CategoryPage() {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);
  const [userId, setUserId] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
  const [tableData, setTableData] = useState([]);
  let encrypted = "";

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    setUserId(userIdFromStorage);
  }, []);

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

  function handleClick() {
    var itemCategoryID = 0
    navigate('/dashboard/categoryAdd/' + itemCategoryID);
  }

  function handleClickEdit(itemCategoryID) {
    navigate('/dashboard/categoryAdd/' + itemCategoryID)
  }

  const formik = useFormik({
    initialValues: {
      categoryName: categoryName,
      categoryCode: categoryCode
    },

    validationSchema: () => {
      return Yup.object().shape({
      });
    },

    onSubmit: (values) => {
      ItemCategoryDetailsGet(values);
    }
  }
  );

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  async function ItemCategoryDetailsGet(values) {
    let model = {
      categoryName: values.categoryName,
      categoryCode: values.categoryCode
    }
    const result = await axios.post('https://localhost:7211/api/Item/GetItemCategoriesforListing', model);
    setTableData(result.data.data);
    return;
  }

  async function handleClickDelete(itemCategoryID) {
    const result = await axios.get('https://localhost:7211/api/Item/DeleteItemCategory', { params: { itemCategoryID: parseInt(itemCategoryID) } });
    if (result.data.statusCode === "Error") {
      toast.error(result.data.message);
      return;
    }
    else {
      toast.success(result.data.message);
      let model = {
        categoryName: formik.values.categoryName,
        categoryCode: formik.values.categoryCode
      }
      ItemCategoryDetailsGet(model)
    }
  }


  function handleClear() {
    setTableData([])
    formik.resetForm()
  }

  return (
    <Box mt={0}>
      <Card>
        <Helmet>
          <title> Category | MIMS </title>
        </Helmet>
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
            <Container>
              <Stack direction="row" alignItems="center" justifyContent="space-between" style={{ marginTop: '10px' }}>
                <Typography variant="h6">
                  Category
                </Typography>
                <Button variant="contained"
                  onClick={handleClick}
                ><AddIcon /></Button>
              </Stack>
              <br />
              <Stack spacing={2} style={{ marginBottom: '20px', justifyContent: 'center' }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={7} style={{ marginBottom: '20px' }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Category Name "
                    value={formik.values.categoryName}
                    onChange={formik.handleChange}
                    {...getFieldProps('categoryName')}
                    error={Boolean(touched.categoryName && errors.categoryName)}
                    helperText={touched.categoryName && errors.categoryName}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Category Code "
                    value={formik.values.categoryCode}
                    onChange={formik.handleChange}
                    {...getFieldProps('categoryCode')}
                    error={Boolean(touched.categoryCode && errors.categoryCode)}
                    helperText={touched.categoryCode && errors.categoryCode}
                  />
                </Stack>

              </Stack>
              <Stack direction="row" alignItems="right" justifyContent="flex-end" mb={5}>
                <Button
                  type="submit"
                  size='small'
                  variant="contained"
                >
                  {"Search"}
                </Button>
                <Button variant="outlined" style={{ marginLeft: '10px', color: 'red' }} onClick={handleClear}> Clear </Button>
              </Stack>
              {tableData.length == 0 ?
                <SearchNotFound searchQuery="Category" />
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
                            <TableCell align="center"><strong>Category Code</strong></TableCell>
                            <TableCell align="center"><strong>Category Name</strong></TableCell>
                            <TableCell align="center"><strong>Status</strong></TableCell>
                            <TableCell align="center"><strong>Action</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {(rowsPerPage > 0
                            ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : tableData
                          )
                            .map((row) => {
                              return (
                                <TableRow key={row.itemCategoryID}>
                                  <TableCell align="center" component="th" scope="row">
                                    {row.categoryCode}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.categoryName}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.isActive == true ? 'Active' : 'Inactive'}
                                  </TableCell>
                                  <TableCell align="center">
                                    <IconButton aria-label="delete" size="small" onClick={() => handleClickEdit(row.itemCategoryID)}>
                                      <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" size="small" onClick={() => handleClickDelete(row.itemCategoryID)}>
                                      <DeleteIcon style={{ color: 'red' }} />
                                    </IconButton>
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
            </Container >
          </Form>
        </FormikProvider>
      </Card>
    </Box>
  );
}
