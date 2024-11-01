import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, LinearProgress } from '@mui/material';

import DashboardCard from '../../../components/shared/DashboardCard';
import SkeletonMonthlyEarningsTwoCard from '../../../components/dashboards/skeleton/MonthlyEarningsCard';
import { useState, useEffect } from "react";

interface ValidatorOverviewCardProps {
  data: any,
  delegatorData: any,
}

const ValidatorOverviewCard = ({ data, delegatorData }: ValidatorOverviewCardProps) => {
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
    colors: ['#5C87FF','#5C72FF','#5C5CFF','#725CFF','#875CFF','#9D5CFF','#B35CFF','#C95CFF','#DE5CFF','#F45CFF','#FF5CF4','#FF5CDE','#FF5CC9','#FF5CB3','#FF5C9D','#FF5C87','#FF5C72','#FF5C5C','#FF6F5C','#FF855C','#FF9A5C','#FFB05C','#FFC65C','#FFDC5C'],
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
    // labels
    labels: data.map((item: any) => { return item.validator ? item.validator.name != "" ? item.validator.name : item.validator.signer : '' }),
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
      custom: function({series, seriesIndex, dataPointIndex, w}: any) {
        return '<div class="arrow_box" style="padding: 5px;">' +
          '<span><b>' + w.globals.labels[seriesIndex] + ' Delegated POL: </b>' + (series[seriesIndex]).toLocaleString("en-US") + '</span>' +
          '</div>'
      }    
    },
    stroke: {
      show: true,
      colors: ['#FFFFFF'],
      width: 0.5,
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

  const [seriescolumnchart, setSeriescolumnchart] = useState<any>([]);

  useEffect(() => {
    if(data.length !== 0 && seriescolumnchart.length === 0){
      setSeriescolumnchart(data.map((item: any) => item.stake));
    }
  },[data]);

  return (
    <div style={{position: 'relative'}}>
      <div style={
        delegatorData === null ?
        {position: 'absolute', width: "100%", height: "20px", top: 1}
        : {display: 'none'}
        }>
        <LinearProgress />
      </div>
      <div className={delegatorData === null ? "loadingDatas" : "loaded"}>
          <DashboardCard
            title="Delegation Distribution"
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
