import { Typography, Fab, Chip, LinearProgress, Popover, Box, Tooltip, styled, tooltipClasses, TooltipProps } from '@mui/material';

import DashboardCard from '../../shared/DashboardCard';
import SkeletonMonthlyEarningsTwoCard from "../skeleton/MonthlyEarningsTwoCard";

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { EmblaCarouselType, EmblaOptionsType, EngineType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { set } from 'lodash';
type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}
const OPTIONS: EmblaOptionsType = { 
  dragFree: true,
  containScroll: 'keepSnaps',
  watchSlides: false,
  watchResize: false
}

interface BlocksValidationCardProps {
  data: any
}

const mockApiCall = (
  minWait: number,
  maxWait: number,
  callback: () => void
): void => {
  const min = Math.ceil(minWait)
  const max = Math.floor(maxWait)
  const wait = Math.floor(Math.random() * (max - min + 1)) + min
  setTimeout(callback, wait)
}

const BlocksValidationCard = ({ data }: BlocksValidationCardProps) => {

  const [slides, setSlides] : any = useState([
    {number: 1}, {number: 2}, {number: 3}, {number: 4}, {number: 5},
    {number: 6}, {number: 7}, {number: 8}, {number: 9}, {number: 10},
  ])

  const scrollListenerRef = useRef<() => void>(() => undefined)
  const listenForScrollRef = useRef(true)
  const hasMoreToLoadRef = useRef(true)
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [timer, setTimer] = useState(false)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...OPTIONS,
    watchSlides: (emblaApi) => {
      const reloadEmbla = (): void => {
        const oldEngine = emblaApi.internalEngine()

        emblaApi.reInit()
        const newEngine = emblaApi.internalEngine()
        const copyEngineModules: (keyof EngineType)[] = [
          'scrollBody',
          'location',
          'offsetLocation',
          'previousLocation',
          'target'
        ]
        copyEngineModules.forEach((engineModule) => {
          Object.assign(newEngine[engineModule], oldEngine[engineModule])
        })

        newEngine.translate.to(oldEngine.location.get())
        const { index } = newEngine.scrollTarget.byDistance(0, false)
        newEngine.index.set(index)
        newEngine.animation.start()

        setLoadingMore(false)
        listenForScrollRef.current = true
      }

      const reloadAfterPointerUp = (): void => {
        emblaApi.off('pointerUp', reloadAfterPointerUp)
        reloadEmbla()
      }

      const engine = emblaApi.internalEngine()

      if (hasMoreToLoadRef.current && engine.dragHandler.pointerDown()) {
        const boundsActive = engine.limit.reachedMax(engine.target.get())
        engine.scrollBounds.toggleActive(boundsActive)
        emblaApi.on('pointerUp', reloadAfterPointerUp)
      } else {
        reloadEmbla()
      }
    }
  })

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    if (!listenForScrollRef.current) return

    setLoadingMore((loadingMore) => {
      const lastSlide = emblaApi.slideNodes().length - 3
      const lastSlideInView = emblaApi.slidesInView().includes(lastSlide)
      const loadMore = !loadingMore && lastSlideInView

      if (loadMore) {
        listenForScrollRef.current = false
        setSlides((currentSlides: any) => {
          if(currentSlides.length > 20) {
            return [...currentSlides.slice(1), {number: currentSlides[currentSlides.length - 1].number + 1}]
          } else {
            return [...currentSlides, {number: currentSlides[currentSlides.length - 1].number + 1}]
          }
        })
      }

      return loadingMore || lastSlideInView
    })
  }, [])

  const addScrollListener = useCallback(
    (emblaApi: EmblaCarouselType) => {
      scrollListenerRef.current = () => onScroll(emblaApi)
      emblaApi.on('scroll', scrollListenerRef.current)
    },
    [onScroll]
  )

  useEffect(() => {
    if (!emblaApi) return
    addScrollListener(emblaApi)

    const onResize = () => emblaApi.reInit()
    window.addEventListener('resize', onResize)
    emblaApi.on('destroy', () => window.removeEventListener('resize', onResize))
  }, [emblaApi, addScrollListener])

  useEffect(() => {
    hasMoreToLoadRef.current = hasMoreToLoad
  }, [hasMoreToLoad])

  useEffect(() => {
    if (!emblaApi) return
    if(timer === false){
      setTimer(true);
      // move slider to the next slide 
      setInterval(() => {
        if(emblaApi?.canScrollNext()) {
          emblaApi?.scrollNext()
        }
      }, 4000);  
    }
  }, [emblaApi])
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));  

  return (
    <div style={{position: 'relative'}}>
      <div style={
        data === null ?
        {position: 'absolute', width: "100%", height: "20px", top: 1}
        : {display: 'none'}
        }>
        <LinearProgress />
      </div>
      <div className={data === null ? "loadingDatas" : "loaded"}>
        <DashboardCard
          title="Blocks Validation"
        >
          <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
              <div className="embla__container">
                {slides.map((index: any) => (
                  <>
                    <div className="embla__slide" key={index.number} aria-owns={open ? 'mouse-over-popover' : undefined} aria-haspopup="true" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                      <div className="embla__slide__number">
                        <HtmlTooltip
                          title={
                            <React.Fragment>
                              <Typography color="inherit">Block #{index.number}</Typography>
                              <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                              {"It's very engaging. Right?"}
                            </React.Fragment>
                          }
                        >
                          <Chip label={"Block #" + index.number} color="primary" />
                        </HtmlTooltip>
                      </div>
                    </div>
                  </>
                ))}
                {hasMoreToLoad && (
                  <div
                    className={'embla-infinite-scroll'.concat(
                      loadingMore ? ' embla-infinite-scroll--loading-more' : ''
                    )}
                  >
                    <span className="embla-infinite-scroll__spinner" />
                  </div>
                )}
              </div>
            </div>
          </section>


        </DashboardCard>
      </div>
    </div>
  );
};

export default BlocksValidationCard;
