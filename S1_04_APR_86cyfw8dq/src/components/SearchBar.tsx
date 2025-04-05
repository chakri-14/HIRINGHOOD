import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, styled, useTheme } from '@mui/material';
import { useWeather } from '../hooks/useWeather';

const SearchContainer = styled('form')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  marginBottom: '30px',
  justifyContent: 'center',
  padding: '10px',
  backgroundColor: theme.palette.mode === 'dark' ? '#2b2b2b' : '#f9f9f9',
  borderRadius: '12px',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 0 10px rgba(255, 255, 255, 0.05)'
    : '0 0 10px rgba(0, 0, 0, 0.05)',
}));

const SearchBar = () => {
  const { fetchWeatherByCity } = useWeather();
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      city: '',
    },
    validationSchema: Yup.object({
      city: Yup.string().required('City name is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      fetchWeatherByCity(values.city);
      resetForm();
    },
  });

  return (
    <SearchContainer onSubmit={formik.handleSubmit}>
      <TextField
        label="Enter city"
        name="city"
        value={formik.values.city}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.city && Boolean(formik.errors.city)}
        helperText={formik.touched.city && formik.errors.city}
        variant="outlined"
        size="small"
        sx={{
          minWidth: '250px',
          backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#fff',
          borderRadius: '6px',
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          minWidth: '100px',
          fontWeight: 'bold',
          borderRadius: '6px',
        }}
      >
        Search
      </Button>
    </SearchContainer>
  );
};

export default SearchBar;
