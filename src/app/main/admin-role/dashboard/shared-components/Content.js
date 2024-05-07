import Card from './Card'
import { Grid, Box } from '@mui/material';
import Table from './Table'

function DashboardPage(props) {

  return (
    <Grid component={'div'} className='w-full'>
      <Card />
      <Box sx={{ margin: 4 }}>
        <Grid container>
          {/* <Table /> */}
         
        </Grid>
      </Box>
    </Grid>
  );
}

export default DashboardPage;


