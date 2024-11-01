import Image from "next/image";
import { Box, CardContent, Grid, LinearProgress, Typography } from "@mui/material";
import { useSelector, useDispatch } from '@/store/hooks';

let topcards = [
  {
    icon: '/images/svgs/icon-user-male.svg',
    title: "POL Price",
    digits: "",
    bgcolor: "secondary",
  },
  {
    icon: '/images/svgs/icon-briefcase.svg',
    title: "Market Cap",
    digits: "",
    bgcolor: "secondary",
  },
  {
    icon: '/images/svgs/icon-mailbox.svg',
    title: "Total Staked",
    digits: "",
    bgcolor: "secondary",
  },
  {
    icon: '/images/svgs/icon-favorites.svg',
    title: "Total Delegators",
    digits: "",
    bgcolor: "secondary",
  },
  {
    icon: '/images/svgs/icon-speech-bubble.svg',
    title: "Active Validators",
    digits: "",
    bgcolor: "secondary",
  },
];

interface DashboardBlockchainDataCardProps {
  data: any;
}

const DashboardBlockchainDataCard = ({ data }: DashboardBlockchainDataCardProps) => {
  const validators = useSelector((state) => state.validatorReducer.validators);
  topcards[0].digits = data?.maticPrice ? "$ " + Number(parseFloat(data.polPrice).toFixed(2)).toLocaleString("en-US") : "$ ";
  topcards[1].digits = data?.maticMarketCap ? "$ " + Math.round(Number(data.maticMarketCap) + Number(data.polMarketCap)).toLocaleString("en-US") : "$ ";
  topcards[2].digits = data?.totalStaked ? Math.round(Number(data.totalStaked)).toLocaleString("en-US") + " POL" : "0 POL";
  topcards[3].digits = data?.totalDelegators ? Math.round(Number(data.totalDelegators)).toLocaleString("en-US") : "0";
  topcards[4].digits = validators.length;

  return (
    <Grid className={data === null ? "loadingDatas" : "loaded"} container spacing={3} mt={1}>
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={6} lg={2.4} key={i}>
          <Box bgcolor={topcard.bgcolor + ".light"} textAlign="center">
            <CardContent>
              <Typography
                color={topcard.bgcolor + ".main"}
                mt={1}
                variant="subtitle1"
                fontWeight={600}
              >
                {topcard.title}
              </Typography>
              <Typography
                color={topcard.bgcolor + ".main"}
                variant="h4"
                fontWeight={600}
              >
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardBlockchainDataCard;