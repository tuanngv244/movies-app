import { Box, Grid } from '@mui/material';
import { moviesApi, MoviesApi } from 'apis/movies';
import { RemoveIcon } from 'assets';
import NoImageBigSize from 'assets/images/no-img-big-size.jpg';
import { Button } from 'components/atoms/Button';
import { LoadingImage } from 'components/atoms/LoadingImage';
import { LoadingSpinner } from 'components/atoms/LoadingSpinner';
import Modal from 'components/atoms/Modal';
import { Rate } from 'components/atoms/Rate';
import { Typography } from 'components/atoms/Typography';
import Loading from 'components/molecules/Loading';
import { MovieCastSlider } from 'components/organisms/MovieCastSlider';
import { MoviesSimilarSlider } from 'components/organisms/MoviesSimilarSlider';
import { TIME_DISPLAY } from 'configs/format-date';
import { YOUTUBE_URL_PREFIX } from 'configs/general';
import { movieStatusColors } from 'constant/general';
import dayjs from 'dayjs';
import { useBoolean } from 'hooks/useBoolean';
import { useDevice } from 'hooks/useDevice';
import { useQuery } from 'hooks/useQuery';
import { useRouter } from 'hooks/useRouter';
import { useTitle } from 'hooks/useTitle';
import { useToast } from 'hooks/useToast';
import { ICast, IMovie, IMovieDetail, IMovieVideo } from 'models/movie';
import React, { FC, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { colors } from 'themes/common/colors';
import { zIndex } from 'themes/common/zIndex';

const MovieDetail: FC = () => {
  const router = useRouter();
  const [openWatchVideo, { on: onWatch, off: offWatch }] = useBoolean();
  const [currentWatch, setCurrentWatch] = useState<string>();
  const { mobile } = useDevice();
  const toast = useToast();
  const [detailData, { loading }, { reFetch: reFetchDetailData }] = useQuery<
    IMovieDetail,
    number,
    MoviesApi['getMovieDetail']
  >(+router?.params?.id, moviesApi.getMovieDetail, {});

  const [detailVideos, , { reFetch: reFetchDetailVideos }] = useQuery<
    IMovieVideo,
    number,
    MoviesApi['getMovieVideos']
  >(+router?.params?.id, moviesApi.getMovieVideos, {});

  const [movieSimilars, , { reFetch: reFetchMovieSimilars }] = useQuery<
    IMovie['results'],
    number,
    MoviesApi['getMovieSimilars']
  >(+router?.params?.id, moviesApi.getMovieSimilars, {});

  const [movieCasts, , { reFetch: reFetchMovieCasts }] = useQuery<
    ICast[],
    number,
    MoviesApi['getMovieCasts']
  >(+router?.params?.id, moviesApi.getMovieCasts, {});

  useTitle(`${detailData?.title} | T Movie`);

  const gridLabelStyles = {
    gridTemplateColumns: { xs: '80px 1fr', sm: '150px 1fr' },
    gridGap: '10px',
    margin: '12px 0',
    display: 'grid',
  };

  const labelMovieStyles = {
    fontSize: '16px',
    fontWeight: 500,
    color: colors.mediumGrey,
  };

  const valueMovieStyles = {
    fontSize: '16px',
    fontWeight: '400',
    color: colors.white,
  };

  console.log(movieCasts);

  useEffect(() => {
    if (+router?.params?.id !== detailData?.id) {
      reFetchDetailData(+router?.params?.id);
    }
  }, [+router?.params?.id]);

  return (
    <React.Fragment>
      {loading && (
        <LoadingSpinner
          isLoading={loading}
          wrapperStyles={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,.7)',
            zIndex: zIndex.lv6,
          }}
        />
      )}
      <Box sx={{ marginTop: '20px', marginBottom: '100px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            // flexWrap: { xs: 'wrap', md: 'nowrap' },
            flexWrap: 'nowrap',
            gap: '0 16px',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <LoadingImage
            wrapStyles={{
              width: { xs: '300px', md: '350px' },
              height: { xs: '450px', md: '525px' },
              overflow: 'hidden',
              position: 'relative',
              borderRadius: '6px',
              boxShadow: '7px 7px 0px -1px rgba(255,255,255,1)',
              '&:hover': {
                '.loading__img': {
                  transform: 'scale(1.05)',
                  transition: 'transform .3s',
                },
              },
            }}
            path={detailData?.poster_path}
            noImageSrc={NoImageBigSize}
          />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
              width: { xs: '100%', md: 'calc(100% - 500px)' },
              padding: '0 16px',
              flex: 1,
            }}
          >
            <Typography.Title
              styles={{
                fontSize: '50px',
                fontWeight: 600,
                color: colors.white,
                lineHeight: '60px',
                marginBottom: '20px',
                marginTop: mobile ? '20px' : 0,
              }}
              variant="h1"
            >
              {detailData?.title}
            </Typography.Title>

            <Grid sx={gridLabelStyles}>
              <Typography.Text styles={labelMovieStyles} variant="body1">
                Status:
              </Typography.Text>
              <Typography.Text
                styles={{
                  ...valueMovieStyles,
                  padding: '6px 10px',
                  borderRadius: '4px',
                  backgroundColor: detailData?.status
                    ? movieStatusColors[detailData?.status?.toUpperCase()]
                    : 'transparent',
                }}
                variant="body1"
              >
                {detailData?.status}
              </Typography.Text>
            </Grid>
            <Grid sx={gridLabelStyles}>
              <Typography.Text styles={labelMovieStyles} variant="body1">
                Genres:
              </Typography.Text>
              <Typography.Text styles={valueMovieStyles} variant="body1">
                {detailData?.genres?.map((gen) => gen?.name).join(', ')}
              </Typography.Text>
            </Grid>
            <Grid sx={gridLabelStyles}>
              <Typography.Text styles={labelMovieStyles} variant="body1">
                {' '}
                Companies:
              </Typography.Text>
              <Typography.Text styles={valueMovieStyles} variant="body1">
                {detailData?.production_companies?.map((company) => company?.name)?.join(', ')}
              </Typography.Text>
            </Grid>
            <Grid sx={gridLabelStyles}>
              <Typography.Text styles={labelMovieStyles} variant="body1">
                {' '}
                Countries:
              </Typography.Text>
              <Typography.Text styles={valueMovieStyles} variant="body1">
                {detailData?.production_countries?.map((company) => company?.name)?.join(', ')}
              </Typography.Text>
            </Grid>
            <Grid sx={gridLabelStyles}>
              <Typography.Text styles={labelMovieStyles} variant="body1">
                {' '}
                Production time:{' '}
              </Typography.Text>
              <Typography.Text styles={valueMovieStyles} variant="body1">
                {dayjs(detailData?.release_date).format(TIME_DISPLAY.BASIC)}
              </Typography.Text>
            </Grid>
            <Box
              sx={{
                display: 'flex',
                alignItems: { xs: 'flex-start', sm: 'center' },
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Rate value={detailData?.vote_average ?? 0} />
              <Typography.Text
                styles={{
                  ...valueMovieStyles,
                  fontSize: '14px',
                  marginLeft: mobile ? 0 : '10px',
                  marginTop: mobile ? '10px' : 0,
                }}
                variant="body1"
              >
                ({detailData?.vote_average} / points - {detailData?.vote_count} / number of turns )
              </Typography.Text>
            </Box>
            <Button
              buttonStyles={{
                marginTop: '30px',
              }}
              buttonProps={{
                onClick: () => {
                  if (!detailVideos?.results[0]?.key)
                    return toast('Video not available currently!', 'error');
                  setCurrentWatch(detailVideos?.results[0]?.key);
                  onWatch();
                },
              }}
            >
              Watch a movie
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: '#282828',
            marginTop: '30px',
            width: 'auto !important',
            minHeight: '100px',
          }}
        >
          <Typography.Text
            variant="h6"
            styles={{
              fontSize: '20px',
              color: colors.white,
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            Story
          </Typography.Text>
          <Typography.Text styles={{ color: colors.white }} variant="body1">
            {detailData?.overview}
          </Typography.Text>
        </Box>
        <Box
          sx={{
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: '#282828',
            marginTop: '20px',
            width: 'auto !important',
            minHeight: '100px',
          }}
        >
          <Typography.Text
            variant="h6"
            styles={{
              fontSize: '20px',
              color: colors.white,
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            Videos
          </Typography.Text>
          <Grid
            display={'grid'}
            gridTemplateColumns={{ xs: 'repeat(2,1fr)', sm: 'repeat(4,1fr)', md: 'repeat(6,1fr)' }}
            sx={{
              gridGap: '10px',
            }}
          >
            {detailVideos?.results
              ?.sort((a, b) => dayjs(a?.published_at).unix() - dayjs(b?.published_at).unix())
              ?.map((video, idx) => {
                return (
                  <Box
                    key={video?.id}
                    sx={{
                      padding: '10px',
                      borderRadius: '4px',
                      backgroundColor: '#3c3a3a',
                      marginBottom: '10px',
                    }}
                  >
                    <Typography.Text
                      styles={{
                        fontWeight: 600,
                        color: colors.white,
                        marginBottom: '5px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: '16px',
                        textOverflow: 'ellipsis',
                        minHeight: '32px',
                      }}
                      variant="h6"
                    >
                      {video?.name}
                    </Typography.Text>
                    <Typography.Text
                      styles={{ color: colors.mediumGrey, fontSize: '14px' }}
                      variant="body1"
                    >
                      {dayjs(video?.published_at).format(TIME_DISPLAY.BASIC)}
                    </Typography.Text>
                    <Button
                      buttonStyles={{
                        marginTop: '10px',
                        height: '30px',
                      }}
                      buttonProps={{
                        onClick: () => {
                          if (!video?.key) return toast('Video not available currently!', 'error');
                          setCurrentWatch(video?.key);
                          onWatch();
                        },
                      }}
                    >
                      Watch
                    </Button>
                  </Box>
                );
              })}
          </Grid>
        </Box>
        <Box
          sx={{
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: '#282828',
            marginTop: '20px',
            width: 'auto !important',
            minHeight: '100px',
          }}
        >
          <Typography.Text
            variant="h6"
            styles={{
              fontSize: '20px',
              color: colors.white,
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            Movie Casts
          </Typography.Text>
          <MovieCastSlider data={movieCasts ?? []} />
        </Box>
        <Box
          sx={{
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: '#282828',
            marginTop: '20px',
            width: 'auto !important',
            minHeight: '100px',
          }}
        >
          <Typography.Text
            variant="h6"
            styles={{
              fontSize: '20px',
              color: colors.white,
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            Movies Similar
          </Typography.Text>
          <MoviesSimilarSlider data={movieSimilars ?? []} />
        </Box>
      </Box>
      {openWatchVideo && (
        <Modal
          isModal={openWatchVideo}
          onClose={offWatch}
          wrapStyles={{
            width: { xs: '95vw', sm: '80vw', md: '75vw' },
            height: { xs: '330px', sm: '65vh', md: '80vh' },
          }}
          body={
            <Box
              sx={{
                padding: { xs: 0, sm: '16px' },
                backgroundColor: colors.white,
                borderRadius: '6px',
                height: '100%',
              }}
            >
              <Box
                id="head"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                }}
              >
                <Typography.Title
                  styles={{
                    fontSize: mobile ? '20px' : '30px',
                    fontWeight: 700,
                  }}
                  variant="h5"
                >
                  {detailData?.title}
                </Typography.Title>
                <RemoveIcon
                  style={{
                    width: mobile ? '20px' : '30px',
                    height: mobile ? '20px' : '30px',
                    cursor: 'pointer',
                  }}
                  onClick={offWatch}
                />
              </Box>
              <Box sx={{ height: '100%' }} id="video">
                <ReactPlayer
                  controls
                  width="100%"
                  height={mobile ? '250px' : '100%'}
                  style={{
                    borderRadius: '6px',
                    overflow: 'hidden',
                  }}
                  fallback={<Loading isLoading={true} />}
                  url={YOUTUBE_URL_PREFIX + currentWatch}
                />
              </Box>
            </Box>
          }
        />
      )}
    </React.Fragment>
  );
};

export default MovieDetail;
