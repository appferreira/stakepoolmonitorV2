import { Typography, Fab, Chip, LinearProgress, Popover, Box, Tooltip, styled, tooltipClasses, TooltipProps, Grid } from '@mui/material';

import DashboardCard from '../../shared/DashboardCard';

import React, { useCallback, useEffect, useRef, useState } from 'react'
import 'animate.css';
import { useTheme } from '@mui/material/styles';

interface BlocksValidationCardProps {
  data: any,
  validators: any
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} disableInteractive />
))(({ theme }) => (
  {
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    maxWidth: 400,
    boxShadow: theme.shadows[6],
    border: '1px solid ' + theme.palette.divider,
  },
}));

const BlocksValidationCard = ({ data, validators }: BlocksValidationCardProps) => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index in the data array
  const [paused, setPaused] = useState(false);
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const successlight = theme.palette.success.light;

  useEffect(() => {
    if(!paused){
      const intervalId = setInterval(() => {
        addSlide();
      }, 1000); // Adjust interval timing as needed

      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [slides, currentIndex, data]);

  const getValidatorByAddress = (address: string) => {
    return validators.find((validator: any) => validator.signer === address).name;
  }

  const addSlide = () => {
    if (data.length > 0) {
      const nextBlock = data.find((block: any) => block.number > currentIndex);
      setSlides((prevSlides: any) => {
        // Remove the first slide if there are 5 or more
        if (prevSlides.length >= 5) {
          document.getElementById(`slide-${prevSlides[0].number}`)?.classList.add('fadeOut');
          setTimeout(() => {
            if(nextBlock){
              prevSlides.push(nextBlock);
              setSlides(prevSlides.slice(1));
            }
          }, 500);
        }
        if(nextBlock){
          return [...prevSlides, nextBlock];
        } else {
          return prevSlides;
        }
      });
      if(nextBlock)
        setCurrentIndex(nextBlock.number); // Move to the next block in the data array
    }
  };

  const pause = () => {
    setPaused(true);
    setTimeout(() => {
      setPaused(false);
    }, 5000);
  }

  return (
    <div style={{position: 'relative'}}>
      <div style={
        data.length === 0 ?
        {position: 'absolute', width: "100%", height: "20px", top: 1}
        : {display: 'none'}
        }>
        <LinearProgress />
      </div>
      <div className={data.length === 0 ? "loadingDatas" : "loaded"}>
        <DashboardCard
          title="Blocks Validation"
        >
          <section className="blocksSlider">
            <div className="slider-container" id="slider-container" onMouseOver={pause}>
            {slides.map((slide: any, index: any) => (
              <HtmlTooltip
                title={
                  <React.Fragment>
                    <Typography variant="body1"><b>Block #{slide.number}</b></Typography>
                    <Typography variant="body2">Validated by: {getValidatorByAddress(slide.miner)}</Typography>
                    <Typography variant="caption">{slide.miner}</Typography>
                  </React.Fragment>
                } key={slide.number}
              >
                <Chip label={"Block #" + slide.number} color="primary" key={slide.number}
                id={`slide-${slide.number}`}
                className={`slide block fadeSlideInRight`}
                style={{ animationDelay: `${index * 0.2}s` }} />
              </HtmlTooltip>
      ))}
            </div>
          </section>


        </DashboardCard>
      </div>
    </div>
  );
};

export default BlocksValidationCard;
