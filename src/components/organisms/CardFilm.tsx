import { Box } from '@mui/material';
import { Typography } from 'components/atoms/Typography';
import { TIME_DISPLAY } from 'configs/format-date';
import { IMAGE_PATH_DB } from 'configs/general';
import { PATHNAME } from 'configs/pathname';
import dayjs from 'dayjs';
import { useRouter } from 'hooks/useRouter';
import { IMovieResult } from 'models/movie';
import { ChangeEvent, FC, useState } from 'react';
import { colors } from 'themes/common/colors';
import PlayIcon from 'assets/icons/icon-play.png';
import NoImage from 'assets/images/no-img.png';
import { zIndex } from 'themes/common/zIndex';
import { StarIcon } from 'assets';
import { useDevice } from 'hooks/useDevice';

type CardFilmProps = {
  initialData?: IMovieResult;
};

export const CardFilm: FC<CardFilmProps> = ({ initialData }) => {
  const { title, overview, release_date, backdrop_path, vote_average, id } = initialData || {};
  const router = useRouter();
  const { mobile, tablet } = useDevice();
  const [isLoadImage, setIsLoadingImage] = useState<boolean>(true);
  return (
    <Box
      sx={{
        borderRadius: '4px',
        boxShadow: '0px 3px 5px rgba(0, 0, 0, .1)',
        padding: '10px',
        background: colors.white,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      component="div"
      onClick={() => {
        router.push(PATHNAME.MOVIES_DETAIL(id?.toString()));
      }}
    >
      <Box
        sx={{
          width: '100%',
          borderRadius: '4px',
          maxHeight: '100%',
          overflow: 'hidden',
          transition: 'all .25s',
          position: 'relative',
          zIndex: zIndex.lv3,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '150px',
            borderRadius: '4px',
            overflow: 'hidden',
            '&:hover': {
              '.overplay': {
                background: colors.black,
                height: '100%',
                opacity: 0.6,
                transition: 'all .25s',
              },
              '.image': {
                opacity: 1,
                transition: 'all .25s',
              },
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              content: `''`,
              bottom: 0,
              left: 0,
              zIndex: zIndex.lv5,
              width: '100%',
              height: '100%',
              opacity: isLoadImage ? 1 : 0,
              background:
                'radial-gradient(circle, rgba(134,172,236,1) 0%, rgba(225,228,233,1) 100%, rgba(0,0,0,0.8632046568627451) 100%)',
              display: 'inline-block',
              transition: 'all .25s',
            }}
          />
          <Box
            className="overplay"
            sx={{
              position: 'absolute',
              content: `''`,
              bottom: 0,
              left: 0,
              width: '100%',
              height: '50px',
              background:
                'linear-gradient(180deg, rgba(1,5,18,0) 0%, rgba(0,0,0,0.8632046568627451) 100%, rgba(14,8,96,1) 100%)',
              display: 'inline-block',
              transition: 'all .25s',
            }}
          />
          <Box
            className="image"
            component={'img'}
            src={PlayIcon}
            sx={{
              position: 'absolute',
              inset: 0,
              margin: 'auto',
              zIndex: zIndex.lv3,
              width: '40px',
              height: '40px',
              opacity: 0,
              transition: 'all .25s',
            }}
          ></Box>
          <Box
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            component={'img'}
            src={IMAGE_PATH_DB + backdrop_path}
            onLoad={() => setIsLoadingImage(false)}
            onError={(e: ChangeEvent<HTMLImageElement>) => {
              e.target.src = NoImage;
            }}
          ></Box>
        </Box>

        <Box
          sx={{
            padding: '10px',
          }}
        >
          <Typography.Title
            styles={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '48px',
              fontSize: mobile || tablet ? '18px' : '24px',

              fontWeight: 700,
            }}
            variant="h3"
          >
            {title}
          </Typography.Title>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '5px 0 10px 0',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StarIcon
                style={{
                  width: '16px',
                  height: '16px',
                }}
              />
              <Typography.Text
                styles={{
                  color: 'grey',
                  paddingLeft: '5px',
                }}
                variant="body1"
              >
                {vote_average}
              </Typography.Text>
            </Box>
            <Typography.Text
              styles={{
                color: 'grey',
              }}
              variant="body1"
            >
              {dayjs(release_date).format(TIME_DISPLAY.BASIC)}
            </Typography.Text>
          </Box>

          <Typography.Text
            styles={{
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            variant="body1"
          >
            {overview}
          </Typography.Text>
        </Box>
      </Box>
    </Box>
  );
};
