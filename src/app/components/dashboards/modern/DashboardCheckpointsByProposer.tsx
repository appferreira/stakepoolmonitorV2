import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, LinearProgress } from '@mui/material';

import DashboardCard from '../../shared/DashboardCard';
import SkeletonYearlyBreakupCard from "../skeleton/YearlyBreakupCard";
import { format } from "path";
import { useEffect, useState } from "react";

interface BlocksByValidatorProps {
  data: any;
}

const BlocksByValidator = ({ data }: BlocksByValidatorProps) => {
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
    series: [
        {
            data: data !== null ? data.map((item: any) => item.count ) : []
        }
    ],
    // labels
    labels: data !== null ? data.map((item: any) => item.name) : [],
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
      custom: function({series, seriesIndex, dataPointIndex, w}: any) {
        return '<div class="arrow_box" style="padding: 5px;">' +
          '<span><b>' + w.globals.labels[seriesIndex] + '</b><br />Proposed Checkpoints: ' + (series[seriesIndex]).toLocaleString("en-US") + '</span>' +
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
    if(data !== null && seriescolumnchart.length === 0){
      setSeriescolumnchart(data.map((item: any) => item.count))
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
            title="Checkpoints by Proposer"
            subtitle='over the last 24h'
          >
            <Grid container spacing={3} height={"20vw"} style={{minHeight: '200px'}}>
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

export default BlocksByValidator;
