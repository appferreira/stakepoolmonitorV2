import DashboardCard from '../../../components/shared/DashboardCard';
import SkeletonMonthlyEarningsTwoCard from '../../../components/dashboards/skeleton/MonthlyEarningsCard';
import { Avatar, Box, Chip, Grid, LinearProgress, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

interface ValidatorDetailsCardProps {
  data: any,
  stakepoolData: any
}

const ValidatorDetailsCard = ({ data, stakepoolData }: ValidatorDetailsCardProps) => {
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
            title="Validator Details"
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} lg={12}>
                <Stack direction="row" spacing={2}>
                  { data !== null ?
                    <Avatar src={data.logoUrl} alt="Validator Name" sx={{ width: 40, height: 40 }} /> : null }
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {data !== null ? data.name : ''}
                    </Typography>
                    <Typography color="textSecondary" fontSize="12px" variant="subtitle2">
                      {data !== null ? data.signer.slice(0, 5) + "..." + data.signer.slice(38, 42) : ''}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>

                <TableContainer>
                  <Table
                    aria-label="simple table"
                  >
                    <TableBody>
                      <TableRow key="1">
                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                            Signer Address:
                          </Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {data !== null ? data.signer.slice(0, 5) + "..." + data.signer.slice(38, 42) : ''}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow key="2">
                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                            Uptime:
                          </Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <Chip
                            sx={{ bgcolor: (theme) => theme.palette.secondary.light, color: (theme) => theme.palette.secondary.main, borderRadius: '8px' }}
                            size="small"
                            label={data !== null ? Number(data.uptimePercent).toFixed(2) + "%" : 0 + "%"}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow key="3">
                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                            Status:
                          </Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {data !== null ? data.currentState : ''}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow key="4">
                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                            Delegators:
                          </Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {data !== null ? data.delegatorCount : 0}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow key="5">
                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                            Checkpoints Proposed (last 24h):
                          </Typography>
                        </TableCell>
                        <TableCell align='right'>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {stakepoolData !== null ? stakepoolData.count_to_propose : 0}
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

export default ValidatorDetailsCard;
