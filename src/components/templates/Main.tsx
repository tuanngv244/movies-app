import { Box, Container } from '@mui/material';
import { BackIcon } from 'assets';
import { Typography } from 'components/atoms/Typography';
import { Header } from 'components/molecules/Header';
import { useDevice } from 'hooks/useDevice';
import { useRouter } from 'hooks/useRouter';
import { FC, ReactNode } from 'react';
import { colors } from 'themes/common/colors';

type MainProps = {
  children?: ReactNode | string;
  disableHeader?: boolean;
  isBack?: boolean;
};

const Main: FC<MainProps> = ({ children, disableHeader, isBack }) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, rgba(1,5,18,1) 0%, rgba(14,8,96,1) 94%)',
      }}
    >
      {!disableHeader && <Header hasSearch={!isBack} />}
      <Container>
        {isBack && (
          <Box
            sx={{
              paddingTop: '30px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'transform .25s',
              svg: {
                fill: colors.white,
              },
              path: {
                fill: colors.white,
              },
              '&:hover': {
                transform: 'translateX(-10px)',
                transition: 'transform .25s',
              },
            }}
            onClick={() => {
              router.history.goBack();

              window.scrollTo({ top: 0 });
            }}
          >
            <BackIcon style={{ width: '20px', height: '20px' }} />
            <Typography.Text
              styles={{
                color: colors.white,
                marginLeft: '10px',
                fontSize: '16px',
              }}
              variant="body1"
            >
              Go back to list
            </Typography.Text>
          </Box>
        )}
        <Box
          sx={{
            width: '100%',
            minHeight: '100vh',
            overflowX: 'hidden',
            transition: 'all .3s cubic-bezier(.59,.29,.15,.93)',
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default Main;
