'use client'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react';

import PageContainer from '@/app/components/container/PageContainer';
// components
import PolygonCard from '@/app/components/dashboards/modern/PolygonCard';
import StakepoolCard from '@/app/components/dashboards/modern/StakepoolCard';
import DashboardBlochainDataCard from '@/app/components/dashboards/modern/DashboardBlochainDataCard';
// import DashboardBlocksValidationCard from '@/app/components/dashboards/modern/DashboardBlocksValidationCard';
// import DashboardCheckpointsProposalCard from '@/app/components/dashboards/modern/DashboardCheckpointsProposalCard';
import DashboardBlocksByValidatorCard from '@/app/components/dashboards/modern/DashboardBlocksByValidatorCard';
import DashboardCheckpointsByProposer from '@/app/components/dashboards/modern/DashboardCheckpointsByProposer';
import DashboardTotalBlocksRewardsCard from '@/app/components/dashboards/modern/DashboardTotalBlocksRewardsCard';
import DashboardTotalCheckpointRewardsCard from '@/app/components/dashboards/modern/DashboardTotalCheckpointRewardsCard';
import axios from 'axios';
import { useSelector } from '@/store/hooks';


export default function Dashboard (){
  const [isLoading, setLoading] = useState(true);
  const [blockChainData, setBlockChainData] = useState(null);
  const [checkPointsValidationData, setCheckPointsValidationData] = useState(null);
  const [totalBlocksRewards, setTotalBlocksRewards] = useState(null);
  // const [realtimeBlocks, setRealtimeBlocks] = useState([]);
  // const [realtimeCheckpoints, setRealtimeCheckpoints] = useState([]);
  const [blocksValidation, setBlocksValidation] = useState(null);
  const [stakepoolValidatorRewards, setStakepoolValidatorRewards] = useState(null);

  useEffect(() => {
    if(isLoading){
      getChainData();
    }
    setLoading(false);
    // const intervalId = setInterval(() => {
    //   getBlocksCheckpoints();
    // }, 2000); // Adjust interval timing as needed
  }, []);

  // const mergeNewBlocks = (existingBlocks: any, newBlocks: any) => {
  //   // Use a Set to track existing block IDs for fast lookup
  //   if(existingBlocks.length >= 30)
  //     existingBlocks.shift();
  //   const existingIds = new Set(existingBlocks.map((block:any) => block.number));
  
  //   // Filter out blocks that are already in the state
  //   const uniqueNewBlocks = newBlocks.filter((block:any) => !existingIds.has(block.number));

  //   // Return the merged array of existing blocks plus the unique new ones
  //   return [...uniqueNewBlocks, ...existingBlocks].sort((a, b) => a.timestamp - b.timestamp);
  // };

  // const mergeNewCheckpoints = (existingCheckpoints: any, newCheckpoints: any) => {
  //   // Use a Set to track existing block IDs for fast lookup
  //   if(existingCheckpoints.length >= 30)
  //     existingCheckpoints.shift();
  //   const existingIds = new Set(existingCheckpoints.map((block:any) => block.number));
  
  //   // Filter out blocks that are already in the state
  //   const uniqueNewBlocks = newCheckpoints.filter((block:any) => !existingIds.has(block.number));

  //   // Return the merged array of existing blocks plus the unique new ones
  //   return [...uniqueNewBlocks, ...existingCheckpoints].sort((a, b) => a.createdAt - b.createdAt);
  // };
  
  // const getBlocksCheckpoints = async () => {
  //   const realtimeBlocksFromServer = await axios.get('https://monitor.vn.stakepool.dev.br/endpoint/api/blocksRealtimeData')
  //   // add realtimeBlocks to realtimeBlocks
  //   setRealtimeBlocks((prevBlocks: any) => mergeNewBlocks(prevBlocks, realtimeBlocksFromServer.data.reverse()));

  //   const realtimeCheckpoints = await axios.get('https://monitor.vn.stakepool.dev.br/endpoint/api/checkPointsRealtimeData')
  //   setRealtimeCheckpoints((prevBlocks: any) => mergeNewCheckpoints(prevBlocks, realtimeCheckpoints.data.reverse()));
  // }

  const getChainData = async () => {    
    const stakepoolValidatorRewards = await axios.get('https://monitor.vn.stakepool.dev.br/endpoint/endpoint')
    setStakepoolValidatorRewards(stakepoolValidatorRewards.data.rewards[0])
    let chainData = await axios.get('https://monitor.vn.stakepool.dev.br/endpoint/api/chainData')
    setBlockChainData(chainData.data)
    const checkPointsValidationData = await axios.get('https://monitor.vn.stakepool.dev.br/endpoint/api/checkpointsValidatorData')
    setCheckPointsValidationData(checkPointsValidationData.data)
    const totalBlocksRewards = await axios.get('https://monitor.vn.stakepool.dev.br/endpoint/api/blocksCheckpointsRewards')
    setTotalBlocksRewards(totalBlocksRewards.data)
    const blocksValidation = await axios.get('https://monitor.vn.stakepool.dev.br/endpoint/api/blocksValidatorData')
    setBlocksValidation(blocksValidation.data)
  }

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
      <Grid container spacing={3}>
          {/* column */}
          <Grid item xs={12} sm={12} lg={12}>
            <DashboardBlochainDataCard data={blockChainData} />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <StakepoolCard isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            {/* <DashboardBlocksValidationCard data={realtimeBlocks} validators={validators} />
            <Box my={2}></Box>
            <DashboardCheckpointsProposalCard data={realtimeCheckpoints} validators={validators} />
            <Box my={2}></Box> */}
            <PolygonCard isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <DashboardBlocksByValidatorCard data={blocksValidation} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <DashboardCheckpointsByProposer data={checkPointsValidationData} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <DashboardTotalBlocksRewardsCard data={totalBlocksRewards} />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <DashboardTotalCheckpointRewardsCard data={totalBlocksRewards} stakepoolData={stakepoolValidatorRewards} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}