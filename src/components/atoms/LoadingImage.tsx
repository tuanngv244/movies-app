import { Box, SxProps } from '@mui/material';
import { IMAGE_PATH_DB } from 'configs/general';
import React, { ChangeEvent, FC, useState } from 'react';
import NoImage from 'assets/images/no-img.png';
import { zIndex } from 'themes/common/zIndex';

type LoadingImageProps = {
  path?: string;
  wrapStyles?: SxProps;
  noImageSrc?: string;
};

export const LoadingImage: FC<LoadingImageProps> = ({ path, wrapStyles, noImageSrc }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: 'auto',
        ...wrapStyles,
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
          opacity: isLoaded ? 1 : 0,
          background:
            'radial-gradient(circle, rgba(134,172,236,1) 0%, rgba(225,228,233,1) 100%, rgba(0,0,0,0.8632046568627451) 100%)',
          display: 'inline-block',
          transition: 'all .25s',
        }}
      />
      <Box
        className="loading__img"
        sx={{
          position: 'absolute',
          inset: 0,
          margin: 'auto',
          width: '100%',
          height: '100%',
          transition: 'transform .3s',
        }}
        component={'img'}
        src={IMAGE_PATH_DB + path}
        onLoad={() => setIsLoaded(false)}
        onError={(e: ChangeEvent<HTMLImageElement>) => {
          e.target.src = noImageSrc ?? NoImage;
        }}
      />
    </Box>
  );
};
