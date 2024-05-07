import FuseLoading from '@fuse/core/FuseLoading';
import {  Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { deleteUser } from 'app/store/admin/usersSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { get } from 'lodash';
import useDialogState from 'src/app/utils/hooks/useDialogState';
import { showMessage } from 'app/store/fuse/messageSlice';
import InfoIcon from '@mui/icons-material/Info';
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
  const { dialogState: deleteUserDialog, handleOpen: handleDeleteUserDialogOpen, handleClose: handleDeleteUserDialogClose } = useDialogState()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(deleteUserDialog?.data)).then((res) => {
      if (res?.payload?.error) {
        handleDeleteUserDialogClose()
        dispatch(showMessage({ message: "Something went wrong", variant: 'error' }));
      }
      else {
        handleDeleteUserDialogClose()
        dispatch(showMessage({ message: "User Deleted Successfully", variant: 'success' }));
        dispatch(getUsers())
      }
    })
  }


  useEffect(() => {
    dispatch(getUsers()).then(() => {
 
    })
  }, [])


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
                  <StyledTableCell align="left">Action</StyledTableCell>
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
                      <TableCell sx={{ fontSize: 16, padding: '16px 24px' }} align="left">{row?.firstName}</TableCell>
                      <TableCell sx={{ fontSize: 16, padding: '16px 24px' }} align="left">{row?.lastName}</TableCell>
                      <TableCell sx={{ fontSize: 16, padding: '16px 24px' }} align="left">{row?.email}</TableCell>
                      <TableCell sx={{ fontSize: 16, padding: '16px 24px' }} align="left">{row?.role}</TableCell>
                      <TableCell sx={{ fontSize: 16, padding: '16px 24px' }} align="center" >
                        <IconButton onClick={() => handleDeleteUserDialogOpen(row?._id)}>
                            <DeleteIcon fontSize='small' sx={{ color: "red", cursor: 'pointer' }} />
                                </IconButton>
                       </TableCell>
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
                <Typography fontSize={18} fontWeight={600}>No Sub-categories are there!!</Typography>
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
     

      {/* USER DELETE DIALOG */}
      <Dialog open={deleteUserDialog.isOpen} onClose={handleDeleteUserDialogClose}>
        <DialogTitle>Delete User</DialogTitle>
        <Divider variant="middle" />
        <DialogContent>
          <Typography fontSize={16} fontWeight={500} className='pb-5'>Do you really want to delete this user?</Typography>
        </DialogContent>
        <DialogActions className='p-10'>
          <Button onClick={handleDeleteUserDialogClose} variant="contained" sx={{
            backgroundColor: "lightgrey", borderRadius: 2, color: "black", "&:hover": {
              backgroundColor: "gray", color: '#fff'
            }
          }} >Cancel</Button>
          <Button type="submit" variant="contained" sx={{
            border: '1px solid #818CF8', borderRadius: 2, color: '#fff', backgroundColor: '#818CF8', '&:hover': {
              backgroundColor: '#fff', color: '#818CF8'
            },
          }} onClick={() => handleDeleteUser()}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserListTable