import { useEffect, useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogContent,
  Stack,
  Divider,
  Box,
  List,
  ListItemText,
  TextField,
  ListItemButton,
} from '@mui/material';
import { IconSearch, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useSelector, useDispatch } from '@/store/hooks';
import { setDelegatorsStore, setValidatorStore } from '@/store/apps/validators/ValidatorSlice';
import axios from 'axios';

interface menuType {
  title: string;
  id: string;
  subheader: string;
  children: menuType[];
  href: string;
}

const Search = () => {
  // drawer top
  const [showDrawer2, setShowDrawer2] = useState(false);
  const [search, setSerach] = useState('');
  const [fetchData, setFetchData] = useState(false);
  const validators = useSelector((state) => state.validatorReducer.validators);
  const delegators = useSelector((state) => state.validatorReducer.delegators);
  const dispatch = useDispatch();

  const getChainData = async () => {
    //const rewardsNewData = await axios.get('http://158.220.108.192:6001/endpoint')
    const getValidators = await axios.get('https://staking-api.polygon.technology/api/v2/validators?limit=500&offset=0')
    const getDelegators = await axios.get('https://monitor.vn.stakepool.dev.br/api/delegatorsData')
    dispatch(setValidatorStore(getValidators.data.result));
    dispatch(setDelegatorsStore(getDelegators.data));
  }

  useEffect(() => {
    if(!fetchData)
      getChainData();
  }, []);

  const handleDrawerClose2 = () => {
    setShowDrawer2(false);
  };
  const filterRoutes = (cSearch: string) => {
    let toReturn: any = [];
    if(cSearch.length < 4) return toReturn;
    validators.map((t: any) => {
      if (t.name.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase()) || t.signer.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase())) {
        toReturn.push({
          type: "validator",
          id: t.id,
          name: t.name,
          signer: t.signer,
        });
      }
    });
    delegators.map((t: any) => {
      if (t.address.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase())) {
        toReturn.push({
          type: "delegator",
          name: "Delegator",
          signer: t.address,
        });
      }
    });
    return toReturn;
  };
  const searchData = filterRoutes(search);

  return (
    <>
      <IconButton
        aria-label="show 4 new mails"
        color="inherit"
        aria-controls="search-menu"
        aria-haspopup="true"
        onClick={() => setShowDrawer2(true)}
        size="large"
      >
        <IconSearch size="16" />
      </IconButton>
      <Dialog
        open={showDrawer2}
        onClose={() => setShowDrawer2(false)}
        fullWidth
        maxWidth={'sm'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { position: 'fixed', top: 30, m: 0 } }}
      >
        <DialogContent className="testdialog">
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              id="tb-search"
              placeholder="Search for Validator / Delegator"
              autoComplete='off'
              fullWidth
              onChange={(e) => setSerach(e.target.value)}
              inputProps={{ 'aria-label': 'Search here' }}
            />
            <IconButton size="small" onClick={handleDrawerClose2}>
              <IconX size="18" />
            </IconButton>
          </Stack>
        </DialogContent>
        <Divider />
        <Box p={2} sx={{ maxHeight: '60vh', overflow: 'auto' }}>
          <Box>
            <List component="nav">
              {searchData.map((menu: any) => {
                return (
                  <Box key={menu.signer}>
                      <ListItemButton sx={{ py: 0.5, px: 1 }} href={ (menu.type === "validator" ? "/validators/" + menu.id : "/delegators/" + menu.signer)} component={Link} onClick={() => setShowDrawer2(false)}>
                        <ListItemText
                          primary={menu.name}
                          secondary={menu?.signer}
                          sx={{ my: 0, py: 0.5 }}
                        />
                      </ListItemButton>
                  </Box>
                );
              })}
            </List>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default Search;
