import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Box, LinearProgress } from '@mui/material';
import { IconArrowDownRight, IconArrowUpLeft, IconEqual } from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';
import SkeletonMonthlyEarningsTwoCard from '../../../components/dashboards/skeleton/MonthlyEarningsCard';
import { Grid, MenuItem } from '@mui/material';
import CustomSelect from '../../../components/forms/theme-elements/CustomSelect';
import { useEffect, useState } from 'react';

interface ValidatorOverviewCardProps {
  data: any;
}

const percentageChange = (a: number, b: number) => (( b / a * 100 ) - 100).toFixed(0);

const ValidatorOverviewCard = ({ data }: ValidatorOverviewCardProps) => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = theme.palette.secondary.light;
  const errorlight = theme.palette.error.light;
  const successlight = theme.palette.success.light;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 80,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    xaxis: {
      categories: data !== null ? data.map((item: any) => months[item.month-1] + " " + item.year) : [],
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
        formatter: function(val: any) {
          return parseFloat(val).toLocaleString("en-US");
        }
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      x: {
        show: true,
      },
    },
  };

  const [seriescolumnchart, setSeriescolumnchart] = useState<any>([ { name: '', color: secondary, data: [] } ]);
  useEffect(() => {
    if(data !== null && seriescolumnchart[0].data?.length === 0){
      setSeriescolumnchart([{ name: '', color: secondary, data: data.map((item: any) => item.delegators) }]);
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
                footer={
                  <>
                    <Box height="200px">
                      <Chart
                        options={optionscolumnchart}
                        series={seriescolumnchart}
                        type="area"
                        height={200}
                        width={"100%"}
                      />
                    </Box>
                  </>
                }
              >
            <>
            <Typography variant="subtitle2" color="textSecondary">
                Total Delegators
              </Typography>
              <Typography variant="h4">
                {data !== null ? data[data.length-1].delegators : 0}
              </Typography>
              <Stack direction="row" spacing={1} mt={1} alignItems="center">
                <Avatar sx={
                    // percentage difference from previous month
                    data !== null ? (
                      data[data.length-1].delegators > data[data.length-2].delegators ? { bgcolor: successlight, width: 24, height: 24 } : 
                      data[data.length-1].delegators < data[data.length-2].delegators ? { bgcolor: errorlight, width: 24, height: 24 } : { bgcolor: successlight, width: 24, height: 24 }
                    ) : { bgcolor: successlight, width: 24, height: 24 }
                  }>
                  {
                    // percentage difference from previous month
                    data !== null ? (
                      data[data.length-1].delegators > data[data.length-2].delegators ? <IconArrowUpLeft width={18} color="#39B69A" /> : 
                      data[data.length-1].delegators < data[data.length-2].delegators ? <IconArrowDownRight width={18} color="#FA896B" /> : <IconEqual width={18} color="#39B69A" />
                    ) : <IconEqual width={18} color="#39B69A" />
                  }
                  
                </Avatar>
                <Typography variant="subtitle2" fontWeight="600">
                  {
                    // percentage difference from previous month
                    data !== null ? Number(percentageChange(data[data.length-2].delegators, data[data.length-1].delegators)) > 0 ? "+ " + percentageChange(data[data.length-2].delegators, data[data.length-1].delegators) : percentageChange(data[data.length-2].delegators, data[data.length-1].delegators) : 0
                  }%
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  from last month
                </Typography>
              </Stack>
            </>
          </DashboardCard>
        </div>
      </div>
  );
};

export default ValidatorOverviewCard;
