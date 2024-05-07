// import { styled } from '@mui/material/styles';
// import { useTranslation } from 'react-i18next';
// import FusePageSimple from '@fuse/core/FusePageSimple';


// const Root = styled(FusePageSimple)(({ theme }) => ({
//   '& .FusePageSimple-header': {
//     backgroundColor: theme.palette.background.paper,
//     borderBottomWidth: 1,
//     borderStyle: 'solid',
//     borderColor: theme.palette.divider,
//   },
//   '& .FusePageSimple-toolbar': {},
//   '& .FusePageSimple-content': {},
//   '& .FusePageSimple-sidebarHeader': {},
//   '& .FusePageSimple-sidebarContent': {},
// }));

// function DashboardPage(props) {
//   const { t } = useTranslation('examplePage');

//   return (
//    <Grid></Grid>
//   );
// }

// export default DashboardPage;


import * as React from 'react';
import { Grid } from '@mui/material';



export default function CustomizedTables({ children }) {
  return (

    <Grid component={'div'} className='w-full'>
      {children}
    </Grid>
  );
}
