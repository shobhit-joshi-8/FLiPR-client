import FuseLoading from '@fuse/core/FuseLoading';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
// import { deleteSubCategory, getSubCategories, updateSubCategory } from 'app/store/admin/SubCategorySlice'
import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import { getCategory } from 'app/store/admin/CategorySlice';
import { get } from 'lodash';
import useDialogState from 'src/app/utils/hooks/useDialogState';
import { showMessage } from 'app/store/fuse/messageSlice';
import InfoIcon from '@mui/icons-material/Info';
import * as Yup from "yup";
import { useTranslation } from 'react-i18next';
import { getUsers } from 'app/store/admin/usersSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F2F7FB',
    color: theme.palette.common.black,
    fontSize: 16,
    fontWeight: 600,
    padding: '16px 24px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    padding: '16px 24px'
  },
}));

const UserListTable = () => {
  const dispatch = useDispatch()
  const { loading, users } = useSelector(state => state.admin.usersSlice)
//   const { category } = useSelector((state) => state.admin.CategorySlice)
//   const { dialogState: deleteSubCategoryDialog, handleOpen: handleDeleteSubCategoryDialogOpen, handleClose: handleDeleteSubCategoryDialogClose } = useDialogState()
//   const { dialogState: updateSubCategoryDialog, handleOpen: handleUpdateSubCategoryDialogOpen, handleClose: handleUpdateSubCategoryDialogClose } = useDialogState()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("REQUIRED"),
    description: Yup.string().required("REQUIRED"),
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteSubCategory = () => {
    dispatch(deleteSubCategory(deleteSubCategoryDialog?.data)).then((res) => {
      if (res?.payload?.error) {
        handleDeleteSubCategoryDialogClose()
        dispatch(showMessage({ message: "Something went wrong", variant: 'error' }));
      }
      else {
        handleDeleteSubCategoryDialogClose()
        dispatch(showMessage({ message: "Sub-Category Deleted Successfully", variant: 'success' }));
        dispatch(getusers())
      }
    })
  }

  const handleUpdateSubCategory = ({ data, id }) => {
    dispatch(updateSubCategory({ data, id })).then((res) => {
      if (res?.payload?.error) {
        handleUpdateSubCategoryDialogClose()
        dispatch(showMessage({ message: "Something went wrong", variant: 'error' }));
      } else {
        handleUpdateSubCategoryDialogClose()
        dispatch(showMessage({ message: "Sub-Category Updated Successfully", variant: 'success' }));
      }
    })
  }

  useEffect(() => {
    dispatch(getUsers()).then(() => {
      // dispatch(getSubCategories())
    })
  }, [])


  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const subCategories = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  return (
    <>
      <Box sx={{ width: '100%', background: '#fff', borderRadius: 4 }}>
        <Grid className='px-24 pt-32' container xs={12} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Grid item>
            <Typography
              variant="h6"
              id="tableTitle"
            >
              User List
            </Typography>
          </Grid>
          <Grid item>
            <Link to="/admin/user/newUser">
              <Button variant='outlined' color='primary' sx={{
                width: '210px', paddingBlock: 3, borderRadius: "14px", borderColor: "#818CF8", color: '#fff', backgroundColor: '#818CF8', '&:hover': {
                  backgroundColor: '#fff', // Change this to the desired hover background color
                  color: '#818CF8', borderColor: "#818CF8" // Change this to the desired hover text color
                },
              }}>Create User</Button>
            </Link>
          </Grid>


        </Grid>
        <Grid container className='p-24'>
          <TableContainer className='justify-between'>
            <Table
              sx={{ width: "100%" }}
              aria-labelledby="tableTitle"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>S No.</StyledTableCell>
                  <StyledTableCell align="left">First Name</StyledTableCell>
                  <StyledTableCell align="left">Last Name</StyledTableCell>
                  <StyledTableCell align="left">Email</StyledTableCell>
                  <StyledTableCell align="left">Role</StyledTableCell>
                </TableRow>
              </TableHead>
              {
              (users?.length > 0
                 && !loading.usersLoading
                 ) &&
                  <TableBody>
                {users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return (
                    <TableRow
                      className={`${index % 2 !== 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-[#F2F7FB] transition duration-300 ease-in-out`}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      sx={{ marginInline: 4 }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align='left'
                        sx={{ padding: '16px 24px' }}
                      >
                       {index + 1}
                      </TableCell>
                      {/* <TableCell sx={{ fontSize: 16, padding: '16px 24px' }} align="left">{category?.find(({ id }) => id == row?.category)?.name}</TableCell> */}
                      <TableCell sx={{ fontSize: 16, padding: '16px 24px' }} align="left">{row?.firstName}</TableCell>
                      <TableCell sx={{ fontSize: 16, padding: '16px 24px' }} align="left">{row?.lastName}</TableCell>
                      <TableCell sx={{ fontSize: 16, padding: '16px 24px' }} align="left">{row?.email}</TableCell>
                      <TableCell sx={{ fontSize: 16, padding: '16px 24px' }} align="left">{row?.role}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>}
            </Table>
            {
            loading.usersLoading &&
             <Grid item container xs={12} spacing={2} sx={{ height: '500px' }} justifyContent={'center'} alignItems={'center'}>
              <Grid item><FuseLoading /></Grid>
            </Grid>}
            {(users?.length <= 0 && !loading.usersLoading) && <Grid item container xs={12} spacing={2} sx={{ height: '500px' }} justifyContent={'center'} alignItems={'center'}>
              <Grid item>
                <InfoIcon sx={{ color: '#818CF8', fontSize: 40 }} />
              </Grid>
              <Grid item>
                <Typography fontSize={18} fontWeight={600}>No Users are there!!</Typography>
              </Grid>
            </Grid>}
          </TableContainer>
        </Grid>
        {users?.length > 0 && <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={users?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />}
      </Box >
      {/* CATEGORY EDIT DIALOG */}
      {/* <Dialog open={updateSubCategoryDialog.isOpen} onClose={handleUpdateSubCategoryDialogClose} >
        <Formik
          initialValues={{
            name: updateSubCategoryDialog?.data ? updateSubCategoryDialog?.data?.name : "",
            description: updateSubCategoryDialog?.data ? updateSubCategoryDialog?.data?.description : "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const data = {
              name: values.name,
              description: values.description,
            };
            handleUpdateSubCategory({ data, id: updateSubCategoryDialog?.data?.id });
          }}
        >
          {(formik) => (
            <Form >
              <DialogTitle>{`${t('EDIT')} ${t('SUB_CATEGORY')}`}</DialogTitle>
              <Divider variant="middle" />
              <DialogContent>
                <TextField
                  name='name'
                  varient='contained'
                  label={t("NAME")}
                  type='text'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='name'
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  sx={{ marginBottom: '20px' }}
                  fullWidth
                  required
                />
                <TextField
                  name='description'
                  varient='contained'
                  label={t("DESCRIPTION")}
                  type='text'
                  placeholder='description'
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  fullWidth
                  required
                />

              </DialogContent>
              <DialogActions className='pr-24 pb-12'>
                <Button onClick={handleUpdateSubCategoryDialogClose} variant="contained" sx={{
                  backgroundColor: "lightgrey", borderRadius: 2, color: "black", "&:hover": {
                    backgroundColor: "gray", color: '#fff'
                  }
                }} >{t("CANCEL")}</Button>
                <Button type="submit" variant="contained" sx={{
                  border: '1px solid #818CF8', borderRadius: 2, color: '#fff', backgroundColor: '#818CF8', '&:hover': {
                    backgroundColor: '#fff', color: '#818CF8'
                  },
                }} disabled={formik.isSubmitting}>{t("EDIT")}</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog> */}

      {/* CATEGORY DELETE DIALOG */}
      {/* <Dialog open={deleteSubCategoryDialog.isOpen} onClose={handleDeleteSubCategoryDialogClose}>
        <DialogTitle>{`${t("DELETE")} ${t("SUB_CATEGORY")}`}</DialogTitle>
        <Divider variant="middle" />
        <DialogContent>
          <Typography fontSize={16} fontWeight={500} className='pb-5'>{t("DO_YOU_REALLY_WANT_TO_DELETE_THIS_SUB_CATEGORY")}</Typography>
        </DialogContent>
        <DialogActions className='p-10'>
          <Button onClick={handleDeleteSubCategoryDialogClose} variant="contained" sx={{
            backgroundColor: "lightgrey", borderRadius: 2, color: "black", "&:hover": {
              backgroundColor: "gray", color: '#fff'
            }
          }} >{t("CANCEL")}</Button>
          <Button type="submit" variant="contained" sx={{
            border: '1px solid #818CF8', borderRadius: 2, color: '#fff', backgroundColor: '#818CF8', '&:hover': {
              backgroundColor: '#fff', color: '#818CF8'
            },
          }} onClick={() => handleDeleteSubCategory()}>{t("DELETE")}</Button>
        </DialogActions>
      </Dialog> */}
    </>
  )
}

export default UserListTable