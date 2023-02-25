import { Box, Container } from '@mui/material';
import MovieLogo from 'assets/images/logo.png';
import { Button } from 'components/atoms/Button';
import { SearchBox } from 'components/atoms/SearchBox';
import { PATHNAME } from 'configs/pathname';
import { useDebounceCallback } from 'hooks/useDebounceCallback';
import { useRouter } from 'hooks/useRouter';
import { ChangeEvent, FC } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch } from 'store';
import { movieActions } from 'store/modules/movies';
import { colors } from 'themes/common/colors';
import { zIndex } from 'themes/common/zIndex';

type HeaderProps = {
  hasSearch?: boolean;
};

const navLinks = [
  {
    name: 'Top Rating',
    path: PATHNAME.MOVIES_RATING,
  },
  {
    name: 'Now playing',
    path: PATHNAME.NOW_PLAYING,
  },
];

export const Header: FC<HeaderProps> = ({ hasSearch = true }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const handleSearchFilm = useDebounceCallback((event: ChangeEvent<HTMLInputElement>) => {
    const data = event.target.value;
    dispatch(movieActions.fetchSearchMovies(data));
    dispatch(movieActions.updateStateSearch(data?.length > 0 ? true : false));
    window.scrollTo({ top: 0 });
  }, 300);

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        left: 0,
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1)',
        backgroundColor: colors.white,
        zIndex: zIndex.lv6,
      }}
    >
      <Container
        sx={{
          padding: '10px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          cursor: 'pointer',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box
          sx={{
            display: { xs: 'flex', sm: 'block' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: '0 65px', sm: 0 },
          }}
        >
          <Box
            onClick={() => {
              router.push(PATHNAME.HOME);
            }}
            component="img"
            src={MovieLogo}
            sx={{ width: { xs: '70px', sm: '100px' }, height: { xs: '35px', sm: '50px' } }}
          />
          <Box
            sx={{
              display: { xs: 'inline-flex', sm: 'none' },
              flexWrap: 'nowrap',
              gap: '0 10px',
            }}
          >
            {navLinks?.map((nav, idx) => {
              return (
                <Link style={{ textDecoration: 'none' }} key={idx} to={nav?.path}>
                  <Button buttonStyles={{ maxWidth: '82px', height: '35px', whiteSpace: 'nowrap' }}>
                    {nav?.name}
                  </Button>
                </Link>
              );
            })}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0 16px',
            flexWrap: 'nowrap',
            marginTop: { xs: '10px', sm: 0 },
          }}
        >
          {hasSearch && (
            <SearchBox
              inputStyles={{
                minWidth: { xs: '310px', sm: '350px' },
                height: { xs: '35px', sm: '40px' },
              }}
              placeholder={'Typing to find film'}
              onChange={handleSearchFilm}
            />
          )}
          <Box
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              gap: '0 10px',
              flexWrap: 'nowrap',
            }}
          >
            {navLinks?.map((nav, idx) => {
              return (
                <Link style={{ textDecoration: 'none' }} key={idx} to={nav?.path}>
                  <Button>{nav?.name}</Button>
                </Link>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
