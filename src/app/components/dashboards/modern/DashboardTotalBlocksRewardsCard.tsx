import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Typography, Fab, LinearProgress } from '@mui/material';
import { Box } from "@mui/material";

import DashboardCard from '../../shared/DashboardCard';
import SkeletonMonthlyEarningsTwoCard from "../skeleton/MonthlyEarningsTwoCard";
import Image from "next/image";
import { useEffect, useState } from "react";

interface TotalBlocksRewardsProps {
  data: any;
}

const TotalBlocksRewards = ({ data }: TotalBlocksRewardsProps) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.dark;
  const secondary = theme.palette.secondary.dark;

  // chart
  const optionscolumnchart: any = {
    chart: {
      defaultLocale: 'en',
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 280,
    },
    colors: [primary, secondary],
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
      categories: [['Validated Blocks'], ['POL Rewards']],
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

  const [seriescolumnchart, setSeriescolumnchart] = useState<any>([
    {
      name: '',
      data: [0, 0],
    },
  ]);

  useEffect(() => {
    if (data !== null) {
      setSeriescolumnchart([
        {
          name: '',
          data: [data.blocks.toFixed(0), data.rewards.toFixed(0)],
        },
      ]);
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
            title="Polygon Total Blocks / Rewards"
            subtitle='over the last 24h'
          >
            <Box height="295px">
              <Chart options={optionscolumnchart} series={seriescolumnchart} type="bar" height={280} width={"100%"} />
            </Box>
          </DashboardCard>
      </div>
    </div>
  );
};

export default TotalBlocksRewards;
