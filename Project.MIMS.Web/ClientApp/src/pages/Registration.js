import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Iconify from '../components/iconify';
// sections
import { RegistrationForm } from '../sections/auth/Registration';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Registration() {
    const navigate = useNavigate();
    const mdUp = useResponsive('up', 'md');

    const handleDirect = () => {
        navigate('/login', { replace: true });
    };

    return (
        <>
            <Helmet>
                <title> Registration | MIMS </title>
            </Helmet>

            <StyledRoot>

                {mdUp && (
                    <StyledSection>
                        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            Be A Part Of The Kind Society
                        </Typography>
                        <img src="/assets/illustrations/donation-money-vector-flat-illustration.jpg" alt="login" />
                    </StyledSection>
                )}

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" gutterBottom>
                            Sign up to MIMS
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 5 }}>
                            Already Have An Account? {''}
                            <Link variant="subtitle2" onClick={handleDirect}>Login Here</Link>
                        </Typography>
                        <RegistrationForm />
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}