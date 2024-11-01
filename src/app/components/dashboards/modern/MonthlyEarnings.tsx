import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';

import DashboardCard from '../../shared/DashboardCard';
import SkeletonMonthlyEarningsTwoCard from "../skeleton/MonthlyEarningsTwoCard";
import Image from "next/image";

interface MonthlyearningsCardProps {
  isLoading: boolean;
}

const MonthlyEarnings = ({ isLoading }: MonthlyearningsCardProps) => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = theme.palette.secondary.light;
  const errorlight = theme.palette.error.light;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
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
    },
  };
  const seriescolumnchart = [
    {
      name: '',
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  return (
    <>
      {
        isLoading ? (
          <SkeletonMonthlyEarningsTwoCard />
        ) : (
          <DashboardCard
            title="Polygon Network"
            action={
              <Fab color="info" size="medium" disabled={true}>
                <Image
                  src="/images/logos/polygon-logo-2.png"
                  alt="polygon logo"
                  height={45}
                  width={45}
                  priority
                />
              </Fab>
            }
          >
            <>
              <Typography variant="body1" fontWeight="100">
                Polygon  is a blockchain Layer 2 Scaling Solution for Ethereum, able to execute faster and secure transactions, enabling new blockchain DApps, NFTs and DeFi services in general.
                <br />
                To see more about Polygon eco-system, please visit https://wiki.polygon.technology
              </Typography>
            </>
          </DashboardCard>
        )}
    </>
  );
};

export default MonthlyEarnings;
