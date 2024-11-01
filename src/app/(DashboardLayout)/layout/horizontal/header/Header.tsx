import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box, { BoxProps } from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from '@/store/hooks';
import { toggleMobileSidebar, setDarkMode } from '@/store/customizer/CustomizerSlice';
import { IconMenu2 } from '@tabler/icons-react';
import Notifications from '../../vertical/header/Notification';
import Cart from '../../vertical/header/Cart';
import Profile from '../../vertical/header/Profile';
import Search from '../../vertical/header/Search';
import Language from '../../vertical/header/Language';
import Navigation from '../../vertical/header/Navigation';
import Logo from '../../shared/logo/Logo';
import { AppState } from '@/store/store';
import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";

const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  cursor: "pointer",
  justifyContent: "center",
  display: "flex",
  transition: "0.1s ease-in",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const Header = () => {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  // drawer
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',

    [theme.breakpoints.up('lg')]: {
      minHeight: customizer.TopbarHeight,
    },
  }));
    const ToolbarStyled = styled(Toolbar)(({theme}) => ({ margin: '0 auto', width: '100%', color: `${theme.palette.text.secondary} !important`, }));

  return (
    <AppBarStyled position="sticky" color="default" elevation={8}>
      <ToolbarStyled
        sx={{
          maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
        }}
      >
        <Box sx={{ width: lgDown ? '70px' : 'auto', overflow: 'hidden' }}>
          <Logo />
        </Box>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        {lgDown ? (
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => dispatch(toggleMobileSidebar())}
          >
            <IconMenu2 />
          </IconButton>
        ) : (
          ''
        )}
        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        <Search />
         {lgUp ? (
          <>
            <Navigation />
          </>
        ) : null}
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
        {
            customizer.activeMode === "dark" ? (
              <StyledBox
                  onClick={() => dispatch(setDarkMode("light"))}
                  display="flex"
                  gap={1}
                >
                  <WbSunnyTwoToneIcon/>
                  Light
              </StyledBox>
            ) : (
              <StyledBox
                  onClick={() => dispatch(setDarkMode("dark"))}
                  display="flex"
                  gap={1}
                >
                <DarkModeTwoToneIcon
                    color={
                      customizer.activeMode === "dark" ? "primary" : "inherit"
                    }
                />
                  Dark
              </StyledBox>
            )
          }
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;