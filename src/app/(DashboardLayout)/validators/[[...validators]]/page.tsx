'use client'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react';

import PageContainer from '@/app/components/container/PageContainer';

import ValidatorDetailsCard from '../components/ValidatorDetailsCard';
import ValidatorOverviewCard from '../components/ValidatorOverviewCard';

import ValidatorDelegatorsCard from '../components/ValidatorDelegatorsCard';
import ValidatorTotalStakedCard from '../components/ValidatorTotalStakedCard';
import ValidatorPerformanceBenchmark from '../components/ValidatorPerformanceBenchmark';
import axios from 'axios';

function findValidatorReward(data: any, validatorAddress: any) {
  const rewards = data?.rewards?.[0]?.rewards_by_proposer;
  let toReturn = null;
  Object.keys(rewards).forEach(function(key, index) {
    if(key.toLowerCase() == validatorAddress.toLowerCase()){
      toReturn = rewards[key]
    }
  });
  return toReturn;
}

function findValidatorBlocks(data: any, validatorAddress: any) {
  let toReturn = null;
  data.forEach(function(validator: any) {
    if(validator.address.toLowerCase() == validatorAddress.toLowerCase()){
      toReturn = validator
    }
  });
  return toReturn;
}

export default function Dashboard ({ params }: { params: { validators: string } }){
  const [isLoading, setLoading] = useState(true);
  const [currentValidator, setCurrentValidator] = useState(params?.validators ? params?.validators[0] ? params?.validators[0] : 32 : 32);
  const [selectedValidator, setSelectedValidator] = useState(null);
  const [sixMonthsBlocks, setSixMonthsBlocks] = useState({sixMonthsBlocks: null, blocksMined: null, checkpointsData: null});
  const [stakedData, setStakedData] = useState(null);
  const [stakepoolValidatorRewards, setStakepoolValidatorRewards] = useState(null);
  const [blocksValidation, setBlocksValidation] = useState(null);
  const getChainData = async () => {
    const allValidators = await axios.get('https://staking-api.polygon.technology/api/v2/validators/?page=1&limit=105')
    const selectedDetails = allValidators.data.result.find((validator: any) => validator.id == currentValidator)
    console.log(selectedDetails)
    const checkpointsData = await axios.get('https://monitor.vn.stakepool.dev.br/api/checkpointsByValidator?val=' + selectedDetails.signer)
    selectedDetails.proposedCheckpoints = checkpointsData.data.proposedCheckpoints
    setSelectedValidator(selectedDetails);
    const blocksMined = await axios.get('https://monitor.vn.stakepool.dev.br/api/lastBlocksByValidator?val=' + selectedDetails.signer)
    const sixMonthsBlocks = await axios.get('https://monitor.vn.stakepool.dev.br/api/monthlyBlocksByValidator?val=' + selectedDetails.signer)
    setSixMonthsBlocks(
        {
          'sixMonthsBlocks': sixMonthsBlocks.data,
          'blocksMined': blocksMined.data,
          'checkpointsData': checkpointsData.data
        }
      )
    const stakedData = await axios.get('https://monitor.vn.stakepool.dev.br/api/validatorStaked?val=' + selectedDetails.signer)  
    setStakedData(stakedData.data);
    const stakepoolValidatorRewards = await axios.get('https://monitor.vn.stakepool.dev.br/endpoint')
    setStakepoolValidatorRewards(findValidatorReward(stakepoolValidatorRewards.data, selectedDetails.signer))
    const blocksValidation = await axios.get('https://monitor.vn.stakepool.dev.br/validators')
    setBlocksValidation(findValidatorBlocks(blocksValidation.data, selectedDetails.signer))
  }
  useEffect(() => {
    if(isLoading){
      getChainData();
    }
    setLoading(false);
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
      <Grid container spacing={3}>
          {/* column */}
          <Grid item xs={12} sm={6} md={7} lg={7} xl={8}>
          <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <ValidatorOverviewCard data={sixMonthsBlocks} stakepoolData={stakepoolValidatorRewards} blocksValidation={blocksValidation} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <ValidatorTotalStakedCard data={stakedData} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <ValidatorDelegatorsCard data={stakedData} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={5} xl={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <ValidatorDetailsCard data={selectedValidator} stakepoolData={stakepoolValidatorRewards} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <ValidatorPerformanceBenchmark data={selectedValidator} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

