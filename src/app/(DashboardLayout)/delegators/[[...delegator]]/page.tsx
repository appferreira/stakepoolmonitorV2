'use client'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react';

import PageContainer from '@/app/components/container/PageContainer';

import DelegatorDetailsCard from '../components/DelegatorDetailsCard';
import DelegatorDelegationDistributionCard from '../components/DelegatorDelegationDistributionCard';
import DelegatorsTotalCard from '../components/DelegatorsTotalCard';
import axios from 'axios';
import { useSelector, useDispatch } from '@/store/hooks';

export default function Dashboard ({ params }: { params: { delegator: string } }){
  const validators = useSelector((state) => state.validatorReducer.validators);
  const [currentDelegator, setCurrentDelegator] = useState(params?.delegator ? params?.delegator[0] ? params?.delegator[0] : '0x40730f34668afcb3884f050cbc3d376a444bbe44' : '0x40730f34668afcb3884f050cbc3d376a444bbe44');
  const [isLoading, setLoading] = useState(true);
  const [delegatedData, setDelegatedData] = useState(null);
  const [delegatorData, setDelegatorData] = useState(null);
  const [delegations, setDelegations] : any = useState([]);
  const getChainData = async () => {
    const delegatorsData = await axios.get('https://monitor.stakepool.dev.br/api/delegatorsData')
    const apr = await axios.get('https://staking-api.polygon.technology/api/v2/rewards/current-apr')
    let selected = delegatorsData.data.filter((delegator: any) => { return delegator.address.toLowerCase() === currentDelegator.toLowerCase() })
    selected[0].apr = Number(apr.data.result).toFixed(2)
    setDelegatorData(selected[0]);
    const delegatedData = await axios.get('https://monitor.stakepool.dev.br/api/totalDelegatedData')
    setDelegatedData(delegatedData.data)
    const delegatorData = await axios.get('https://staking-api.polygon.technology/api/v2/delegators/' + currentDelegator + '?limit=500')
    let delegationsList = []
    for(let i = 0; i < delegatorData.data.result.length; i++) {
      const thisValidator = validators.find((validator: any) => { return validator.polygonId == delegatorData.data.result[i].bondedValidator })
      delegationsList.push({
        validator: thisValidator,
        stake: (delegatorData.data.result[i].stake / 1e18)
      })
    }
    setDelegations(delegationsList)

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
          <Grid item xs={12} sm={12} md={7} lg={7} xl={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <DelegatorsTotalCard data={delegatedData} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <DelegatorDetailsCard data={delegatorData} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <DelegatorDelegationDistributionCard data={delegations} delegatorData={delegatorData} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

