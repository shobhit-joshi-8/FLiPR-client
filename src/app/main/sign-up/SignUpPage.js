import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import jwtService from '../../auth/services/jwtService';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch } from "react-redux";
import { Grid } from '@mui/material';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  firstName: yup.string().required('You must enter first name'),
  lastName: yup.string().required('You must enter last name'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  acceptTermsConditions: yup.boolean().oneOf([true], 'The terms and conditions must be accepted.'),
});

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

function SignUpPage() {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  const dispatch = useDispatch()

  function onSubmit({ firstName, lastName, password, email }) {
    jwtService
      .createUser({
        firstName,
        lastName,
        email,
        password,
        // role: 'user',
      })
      .then((user) => {
      })
      .catch((_errors) => {
        console.log("🚀 ~ file: SignInPage.js:60 ~ onSubmit ~ _errors:", _errors)
        dispatch(showMessage({ message: "Email Already Exist", variant: 'error' }));
      });
  }

  return (
    <div className="flex justify-center h-screen items-center w-full">
      <div className="flex justify-center items-center w-full h-1/2">
        <Paper sx={{ width: { xs: '95%', sm: '80%', md: '80%', lg: '60%' } }} className="flex justify-center items-center">
          <Grid item container xs={12} sm={12} md={6} lg={6} className="flex flex-col justify-center items-center p-32  mx-auto sm:mx-0">
            <Typography sx={{ fontSize: { xs: '20px', sm: '24px' } }} className='text-red-500 font-bold h-36'>FLiPR Website</Typography>

            <Typography sx={{ fontSize: { xs: '17px', sm: '20px' } }} className="mt-12 tracking-tight leading-tight">
              Sign up
            </Typography>

            <form
              name="registerForm"
              noValidate
              className="flex flex-col justify-center w-full  p-32"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* FIRST NAME */}
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="First Name"
                    type="text"
                    error={!!errors.firstName}
                    helperText={errors?.firstName?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
              {/* LAST NAME */}
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Last name"
                    type="text"
                    error={!!errors.lastName}
                    helperText={errors?.lastName?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              {/* EMAIL */}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Email"
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              {/* PASSWORD */}
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Controller
                name="passwordConfirm"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="Password (Confirm)"
                    type="password"
                    error={!!errors.passwordConfirm}
                    helperText={errors?.passwordConfirm?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />
              <Button
                variant="contained"
                color="secondary"
                className="w-full mt-24"
                aria-label="Register"
                sx={{ color: 'white' }}
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
              >
                Create your free account
              </Button>
              <div className="flex justify-center items-center mt-10 font-medium">
                <Typography>Already have an account?</Typography>
                <Link className="ml-4" to="/sign-in">
                  Sign in
                </Link>
              </div>
            </form>
          </Grid>
          <Grid item container xs={6} sx={{ display: { xs: 'none !important', sm: 'none !important', md: 'flex !important', lg: 'flex !important' } }} className='flex justify-center items-center' >
            <img className="max-w-320" src="assets/images/signup/user_logo.png" alt="logo" />
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

export default SignUpPage;