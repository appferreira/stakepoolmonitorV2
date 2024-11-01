import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { IconSquareRoundedCheckFilled, IconCube } from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';
import SkeletonMonthlyEarningsTwoCard from '../../../components/dashboards/skeleton/MonthlyEarningsCard';
import { Grid, Box, Stack, Avatar, Typography, Chip, LinearProgress } from '@mui/material';
import { useState, useEffect } from "react";

interface ValidatorOverviewCardProps {
  data: any;
}

const ValidatorOverviewCard = ({ data }: ValidatorOverviewCardProps) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.dark;
  const primaryText = theme.palette.primary.contrastText;
  const secondary = theme.palette.secondary.dark;
  const secondaryText = theme.palette.secondary.contrastText;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
      categories: data !== null ? data.map((item: any) => months[item.month-1] + " " + item.year) : [],
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
      if(data !== null && seriescolumnchart[0].data?.length === 0){
        setSeriescolumnchart([{ name: '', data: data.map((item: any) => item.delegators) }]);
      }
    },[data]);
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
            title="Total Delegators"
            subtitle='Last 12 months'
          >
            <>
              <Chart options={optionscolumnchart} series={seriescolumnchart} type="bar" height="705vh" width={"100%"} />
            </>
          </DashboardCard>
        </div>
      </div>
  );
}

export default ValidatorOverviewCard;
