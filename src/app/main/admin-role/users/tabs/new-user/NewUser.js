import { useState } from 'react'; // Import useState hook
import { useTranslation } from 'react-i18next';
import { Grid, Typography, TextField, Paper, Button, Box } from '@mui/material';
import * as Yup from "yup";
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { createCategory } from 'app/store/admin/CategorySlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import { addUser } from 'app/store/admin/usersSlice';

function NewCategoryPage(props) {
    const { t } = useTranslation('categoryPage');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCreateUser = (data) => {
        dispatch(addUser(data)).then((res) => {
            if (res?.payload?.success) {
                dispatch(showMessage({ message: "User Created Successfully", variant: 'success' }));
                navigate('/admin/user/userList');
            } else {
                if (res.payload.error) {
                    const msg = Object.values(res.payload.error)
                    dispatch(showMessage({ message: msg[0], variant: 'error' }));
                } else {
                    dispatch(showMessage({ message: "Something went wrong", variant: 'error' }));
                }
            }
        })
    };
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email().required('Required'),
        password: Yup.string().required('Required'),
        image: Yup.mixed().nullable(),
    });
    return (
        <div className="p-24">
            <Box sx={{ width: '100%', background: '#fff', borderRadius: 4 }}>
                <Grid container display={'flex'} justifyContent={'space-between'}>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            const data = {
                                firstName: values.firstName,
                                lastName: values.lastName,
                                email: values.email,
                                password: values.password,
                            };
                            handleCreateUser(data);
                        }}
                    >
                        {(formik) => (
                            <Form>
                                <Grid className='p-36' spacing={3} rowSpacing={4} container item>
                                    <Grid item container xs={12} justifyContent={'space-between'} alignItems={'center'}>
                                        <Grid item xs={4}><Typography fontSize={{ lg: 24, md: 22, sm: 20, xs: 16 }} fontWeight={500}>First Name</Typography></Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                name='firstName'
                                                varient='contained'
                                                type='text'
                                                value={formik.values.firstName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder='First Name'
                                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                                helperText={formik.touched.firstName && formik.errors.firstName}
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                    
                                    <Grid item container xs={12} justifyContent={'space-between'} alignItems={'center'}>
                                        <Grid item xs={4}><Typography fontSize={{ lg: 24, md: 22, sm: 20, xs: 16 }} fontWeight={500}>Last Name</Typography></Grid>
                                        <Grid item xs={6}><TextField
                                            name='lastName'
                                            varient='contained'
                                            type='text'
                                            placeholder='Last Name'
                                            value={formik.values.lastName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                            helperText={formik.touched.lastName && formik.errors.lastName}
                                            fullWidth
                                            required
                                        /></Grid>
                                    </Grid>
                                    {/* EMAIL */}
                                    <Grid item container xs={12} justifyContent={'space-between'} alignItems={'center'}>
                                        <Grid item xs={4}><Typography fontSize={{ lg: 24, md: 22, sm: 20, xs: 16 }} fontWeight={500}>Email</Typography></Grid>
                                        <Grid item xs={6}><TextField
                                            name='email'
                                            varient='contained'
                                            type='email'
                                            placeholder='Email'
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && formik.errors.email}
                                            fullWidth
                                            required
                                        /></Grid>
                                    </Grid>
                                    {/* PASSWORD */}
                                    <Grid item container xs={12} justifyContent={'space-between'} alignItems={'center'}>
                                        <Grid item xs={4}><Typography fontSize={{ lg: 24, md: 22, sm: 20, xs: 16 }} fontWeight={500}>Password</Typography></Grid>
                                        <Grid item xs={6}><TextField
                                            name='password'
                                            varient='contained'
                                            type='password'
                                            placeholder='Password'
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                            helperText={formik.touched.password && formik.errors.password}
                                            fullWidth
                                            required
                                        /></Grid>
                                    </Grid>

                                    {/* <Grid item container xs={12} justifyContent={'space-between'} alignItems={'center'}>
                                        <Grid item xs={4}><Typography fontSize={{ lg: 24, md: 22, sm: 20, xs: 16 }} fontWeight={500}>{t('UPLOAD_IMAGE')}</Typography></Grid>
                                        <Grid item xs={6}>
                                            <Field
                                                name="image"
                                                render={({ field }) => (
                                                    <TextField
                                                        varient='contained'
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(event) => {
                                                            formik.setFieldValue("image", event.currentTarget.files[0]);
                                                        }}
                                                        fullWidth
                                                        required
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    </Grid> */}
                                    <Grid item container alignItems={'center'} className='mt-20' justifyContent={'center'}>
                                        <Button type='submit' disabled={formik?.isSubmitting} variant='outlined' color='primary' sx={{
                                            width: '210px', paddingBlock: 3, borderRadius: "14px", borderColor: "#818CF8", color: '#fff', backgroundColor: '#818CF8', '&:hover': {
                                                backgroundColor: '#fff', // Change this to the desired hover background color
                                                color: '#818CF8', borderColor: "#818CF8" // Change this to the desired hover text color
                                            },
                                        }}>Create User</Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Box>
        </div >
    );
}

export default NewCategoryPage;
// import React from 'react'

// const NewUser = () => {
//   return (
//     <div>NewUser</div>
//   )
// }

// export default NewUser