import { Box } from '@mui/material';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/core';
import NoImageBigSize from 'assets/images/no-img-big-size.jpg';
import { LoadingImage } from 'components/atoms/LoadingImage';
import { Typography } from 'components/atoms/Typography';
import { useDevice } from 'hooks/useDevice';
import { ICast } from 'models/movie';
import { FC } from 'react';
import { colors } from 'themes/common/colors';
import { zIndex } from 'themes/common/zIndex';

type MoviesCastSliderProps = {
  data?: ICast[];
  direction?: 'horizontal' | 'vertical';
};

export const MovieCastSlider: FC<MoviesCastSliderProps> = ({ data, direction }) => {
  const { mobile, tablet } = useDevice();

  return (
    <Box>
      <Splide
        options={{
          perPage: mobile ? 1 : tablet ? 3 : 5,
          drag: mobile ? true : 'free',
          rewind: true,
          gap: '20px',
          pagination: false,
          type: 'loop',
          focus: 'center',
          autoScroll: {
            speed: 1,
          },
        }}
        hasTrack={false}
      >
        <SplideTrack>
          {data &&
            data?.length > 0 &&
            data?.map((movie) => {
              const { profile_path, id, original_name } = movie;
              return (
                <SplideSlide key={movie?.id}>
                  <Box
                    sx={{
                      padding: '6px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#3c3a3a',
                      position: 'relative',
                    }}
                  >
                    <Typography.Title
                      styles={{
                        padding: '10px',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(0,0,0,.7)',
                        color: colors.white,
                        position: 'absolute',
                        bottom: '20px',
                        right: '10px',
                        zIndex: zIndex.lv3,
                        fontSize: '14px',
                      }}
                      variant="h5"
                    >
                      {original_name}
                    </Typography.Title>
                    <LoadingImage
                      noImageSrc={NoImageBigSize}
                      wrapStyles={{
                        minWidth: '200px',
                        minHeight: '300px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        '&:hover': {
                          '.loading__img': {
                            transform: 'scale(1.05)',
                            transition: 'transform .25s',
                          },
                        },
                      }}
                      path={profile_path}
                    />
                  </Box>
                </SplideSlide>
              );
            })}
        </SplideTrack>
      </Splide>
    </Box>
  );
};
