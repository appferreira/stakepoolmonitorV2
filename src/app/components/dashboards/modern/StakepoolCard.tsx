import { Typography, Fab, Box, Divider } from '@mui/material';

import DashboardCard from '../../shared/DashboardCard';
import SkeletonMonthlyEarningsTwoCard from "../skeleton/MonthlyEarningsTwoCard";
import Image from "next/image";

interface StakepoolCardProps {
  isLoading: boolean;
}

const StakepoolCard = ({ isLoading }: StakepoolCardProps) => {
  return (
    <>
      {
        isLoading ? (
          <SkeletonMonthlyEarningsTwoCard />
        ) : (
          <DashboardCard
            title="Stakepool"
            action={
              <Fab color="info" size="medium" disabled={true}>
                <Image
                  src="/images/logos/dark-logo.png"
                  alt="stakepool logo"
                  height={45}
                  width={45}
                  priority
                />
              </Fab>
            }
          >
            <>
              <Typography variant="body1" fontWeight="100">
                StakePool is a public blockchain infrastructure operator headquartered in Brazil. It offers non-custodial delegation services with high levels of reliability and availability.
                <Box my={2}>
                  <Divider />
                </Box>
                StakePool takes advantage of performance management tools and security monitoring to ensure 24-hour coverage for validator nodes.
                <br /><br />
                When it comes to development, StakePool and its team play an important role filling in the gaps for important required information gathering and data presentation to optimize data analysis and overall processes to all Polygon Validators.
                <br /><br />
                Made with love ❤️ by the StakePool team to all of us, ♾️ Polygon Community.
                <br /><br />
                If you want to support us allowing us to improve our products and keep developing new ideas, delegate with us
                <br /><br />
                Delegate your stake with StakePool
              </Typography>
            </>
          </DashboardCard>
        )}
    </>
  );
};

export default StakepoolCard;
