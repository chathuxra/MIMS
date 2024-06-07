import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { useFormik, Form, FormikProvider } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../pages/Loader';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setloginData] = useState({
    username: "",
    password: ""
  });

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('User Name is required'),
    password: Yup.string().required('Password is required')
  });

  async function login(values) {
    const result = await axios.post('https://localhost:7211/api/User/Login', values);
    if (result.data.statusCode === "Error") {
      toast.error("Invalid User Name Or Password");
      setloginData({
        username: "",
        password: ""
      })
      return;
    }
    toast.success("Successfully Logged In", {
      autoClose: 1000,
      onClose: () => {
        const userId = result.data.data[0].userID;
        localStorage.setItem('userId', userId);
        navigate('/loader');
      }
    });
  }

  const formik = useFormik({
    initialValues: {
      username: loginData.username,
      password: loginData.password,
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      login(values);
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <>
      <FormikProvider value={formik}>
        <ToastContainer
          position="bottom-right"
          pauseOnHover
        />
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="User Name"
              onChange={formik.handleChange}
              value={formik.values.username}
              size='small'
              {...getFieldProps('username')}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              size='small'
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <Link variant="subtitle2" underline="hover">
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained">
            Login
          </LoadingButton>
        </Form>
      </FormikProvider>
    </>
  );
}
