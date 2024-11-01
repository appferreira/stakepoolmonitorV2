import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, LinearProgress } from '@mui/material';

import DashboardCard from '../../../components/shared/DashboardCard';
import SkeletonMonthlyEarningsTwoCard from '../../../components/dashboards/skeleton/MonthlyEarningsCard';

interface ValidatorOverviewCardProps {
  data: any;
}

const ValidatorOverviewCard = ({ data }: ValidatorOverviewCardProps) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const successlight = theme.palette.success.light;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    series: [
        {
            data: [90, 10]
        }
    ],
    // labels
    labels: ['Signed', 'Missed'],
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
      custom: function({series, seriesIndex, dataPointIndex, w}: any) {
        return '<div class="arrow_box" style="padding: 5px;">' +
          '<span><b>' + w.globals.labels[seriesIndex] + ' Checkpoints: </b>' + series[seriesIndex] + '</span>' +
          '</div>'
      }    
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 300,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart = [(data?.performanceIndex > 0 ? data?.performanceIndex : 0), (data?.performanceIndex > 0 ? 100 - data?.performanceIndex : 100)];

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
            title="Performance Benchmark"
            subtitle='Last 700 checkpoints'
          >
            <Grid container spacing={3} style={{height: '360px'}}>
              {/* column */}
              {/* column */}
              <Grid item xs={12} sm={12}>
                <Chart
                  options={optionscolumnchart}
                  series={seriescolumnchart}
                  type="donut"
                  height={"100%"}
                  width={"100%"}
                />
              </Grid>
            </Grid>
          </DashboardCard>
      </div>
    </div>
  );
};

export default ValidatorOverviewCard;
