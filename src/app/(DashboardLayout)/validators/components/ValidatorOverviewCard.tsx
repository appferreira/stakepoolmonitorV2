import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { IconSquareRoundedCheckFilled, IconCube } from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';
import SkeletonMonthlyEarningsTwoCard from '../../../components/dashboards/skeleton/MonthlyEarningsCard';
import { Grid, Box, Stack, Avatar, Typography, Chip, LinearProgress } from '@mui/material';
import { useEffect, useState } from "react";

interface ValidatorOverviewCardProps {
  data: any,
  stakepoolData: any
}

const ValidatorOverviewCard = ({ data, stakepoolData }: ValidatorOverviewCardProps) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.dark;
  const primaryText = theme.palette.primary.contrastText;
  const secondary = theme.palette.secondary.dark;
  const secondaryText = theme.palette.secondary.contrastText;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 280,
    },
    colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '45%',
        distributed: true,
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      categories: data.sixMonthsBlocks !== null ? data.sixMonthsBlocks.map((item: any) => item.monthName) : [],
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        formatter: function(val: any) {
          return parseFloat(val).toLocaleString("en-US");
        }
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };
  const [seriescolumnchart, setSeriescolumnchart] = useState<any>([ { name: '', data: [] } ]);

  useEffect(() => {
    if(data.sixMonthsBlocks !== null && seriescolumnchart[0].data?.sixMonthsBlocks?.length === undefined){
      setSeriescolumnchart([{ name: '', data: data.sixMonthsBlocks.map((item: any) => item.blocks) }]);
    }
  },[data]);

  return (
    <div style={{position: 'relative'}}>
      <div style={
        data.sixMonthsBlocks === null ?
        {position: 'absolute', width: "100%", height: "20px", top: 1}
        : {display: 'none'}
        }>
        <LinearProgress />
      </div>
      <div className={data.sixMonthsBlocks === null ? "loadingDatas" : "loaded"}>
          <DashboardCard
            title="Monthly Validated Blocks"
            subtitle='Last 8 months'
          >
            <>
              <Stack mt={4}>
                <Chart options={optionscolumnchart} series={seriescolumnchart} type="bar" height={280} width={"100%"} />
              </Stack>
              <Stack spacing={3} mt={3}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      variant="rounded"
                      sx={{ bgcolor: primary, color: primaryText, width: 40, height: 40 }}
                    >
                      <IconCube width={18} />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" mb="4px">
                        {
                          data.sixMonthsBlocks !== null ? data.blocksMined.length : 0
                        } Blocks Validated
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        Over the last 24 hours
                      </Typography>
                    </Box>
                  </Stack>
                  <Chip
                    sx={{ bgcolor: (theme) => theme.palette.primary.dark, color: (theme) => theme.palette.primary.contrastText, borderRadius: '8px', }}
                    size="medium"
                    label={"+ " + Number(data.blocksMined?.map((item: any) => item.reward).reduce((prev: any, next: any) => prev + next, 0)).toFixed(2) + " POL"}
                  />
                </Stack>
              </Stack>
              <Stack spacing={3} mt={3}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      variant="rounded"
                      sx={{ bgcolor: secondary, color: secondaryText, width: 40, height: 40 }}
                    >
                      <IconSquareRoundedCheckFilled width={18} />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" mb="4px">
                        {
                          data.checkpointsData !== null ? data.checkpointsData.signedCheckpoints : 0
                        } Checkpoints Signed
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        Over the last 24 hours
                      </Typography>
                    </Box>
                  </Stack>
                  <Chip
                    sx={{ bgcolor: (theme) => theme.palette.secondary.dark, color: (theme) => theme.palette.secondary.contrastText, borderRadius: '8px', }}
                    size="medium"
                    label={"+ " + (stakepoolData != null ? Number(stakepoolData.reward).toFixed(2) : 0.00) + " POL"}
                  />
                </Stack>
              </Stack>
            </>
          </DashboardCard>
      </div>
    </div>
  );
}

export default ValidatorOverviewCard;
