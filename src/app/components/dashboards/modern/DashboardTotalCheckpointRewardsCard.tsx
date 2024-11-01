import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Typography, Fab, Stack, Avatar, LinearProgress } from '@mui/material';
import { Box } from "@mui/material";

import DashboardCard from '../../shared/DashboardCard';
import SkeletonMonthlyEarningsTwoCard from "../skeleton/MonthlyEarningsTwoCard";
import Image from "next/image";
import { IconArrowUpLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface TotalCheckpointRewardsProps {
  data: any,
  stakepoolData: any
}

const TotalCheckpointRewards = ({ data, stakepoolData }: TotalCheckpointRewardsProps) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.dark;
  const successlight = theme.palette.success.light;

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
    colors: [primary],
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
      categories: [['POL Rewards']],
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
  const [seriescolumnchart, setSeriescolumnchart] = useState([{
    name: '',
    data: [0],
  },]);
  
  useEffect(() => {
    if (data !== null && stakepoolData !== null) {
      setSeriescolumnchart([{
        name: '',
        data: [Math.floor(Number(stakepoolData.ten_percent_Validators)).toFixed(2)],
      }]);
    }
  }, [data]);
    
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
            title="Polygon Total Checkpoint Rewards"
            subtitle='over the last 24h'
            >
              <div style={{position: "relative"}}>
              <Stack direction="row" spacing={1} my={1} alignItems="right" style={{position: "absolute", right: 10, top: "-20px"}}>
                <Typography variant="subtitle2" color="textSecondary">
                  Proposed Checkpoints:
                </Typography>
                <Typography variant="subtitle2" fontWeight="600">
                  {data !== null ? data.checkpoints : 0}
                </Typography>
              </Stack>
              <Box height="295px">
                <Chart options={optionscolumnchart} series={seriescolumnchart} type="bar" height={280} width={"100%"} />
              </Box>
            </div>
          </DashboardCard>
      </div>
    </div>
  );
};

export default TotalCheckpointRewards;
