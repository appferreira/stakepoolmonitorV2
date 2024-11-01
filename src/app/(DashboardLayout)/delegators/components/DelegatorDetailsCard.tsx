import DashboardCard from '../../../components/shared/DashboardCard';
import SkeletonMonthlyEarningsTwoCard from '../../../components/dashboards/skeleton/MonthlyEarningsCard';
import { Avatar, Box, Chip, Grid, LinearProgress, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

interface DelegatorDetailsCardProps {
  data: any;
}

const DelegatorDetailsCard = ({ data }: DelegatorDetailsCardProps) => {
  return (
    <div style={{position: 'relative'}}>
      <div style={
        data === null ?
        {position: 'absolute', width: "100%", height: "20px", top: 1}
        : {display: 'none'}
        }>
        <LinearProgress />
      </div>
      <div className={data === null ? "loadingDatas" : "loaded"}>
          <DashboardCard
            title="Delegator Details"
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={12}>

                <TableContainer>
                  <Table
                    aria-label="simple table"
                  >
                    <TableBody>
                    <TableRow key="1">
                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                            Current APR: 
                          </Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <Chip
                            sx={{ bgcolor: (theme) => theme.palette.secondary.light, color: (theme) => theme.palette.secondary.main, borderRadius: '8px' }}
                            size="small"
                            label={data !== null ? data.apr + "%" : "0%"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow key="1">
                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                            Delegator Address: 
                          </Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {data !== null ? data.address?.slice(0, 10) + "..." + data.address?.slice(32, 42) : ''}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow key="2">
                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                            Total Staked: 
                          </Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {data !== null ? Number(data.totalStaked).toLocaleString("en-US") : ''} POL
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow key="3">
                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                            Available Rewards: 
                          </Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {data !== null ? Number(data.unclaimedRewards).toLocaleString("en-US") : ''} POL
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow key="4">
                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                            Total Balance: 
                          </Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {data !== null ? Number(Number(Number(data.totalStaked) + Number(data.unclaimedRewards)).toFixed(2)).toLocaleString("en-US") : ''} POL
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>


              </Grid>
            </Grid>
          </DashboardCard>
      </div>
    </div>
  );
};

export default DelegatorDetailsCard;
