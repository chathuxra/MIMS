import PropTypes from 'prop-types';
// material
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box component="img" src={process.env.PUBLIC_URL + "/assets/LogoX.png"} sx={{ width: 200, height: 170, ...sx }} />;
}