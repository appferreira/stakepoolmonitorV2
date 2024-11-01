import { Typography, Fab } from '@mui/material';

import DashboardCard from '../../shared/DashboardCard';
import SkeletonMonthlyEarningsTwoCard from "../skeleton/MonthlyEarningsTwoCard";
import Image from "next/image";

interface PolygonCardProps {
  isLoading: boolean;
}

const PolygonCard = ({ isLoading }: PolygonCardProps) => {
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

export default PolygonCard;
