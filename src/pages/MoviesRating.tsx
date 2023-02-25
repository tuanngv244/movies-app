import { Box, Grid } from '@mui/material';
import { moviesApi } from 'apis/movies';
import { LoadingSpinner } from 'components/atoms/LoadingSpinner';
import { Typography } from 'components/atoms/Typography';
import { CardFilm } from 'components/organisms/CardFilm';
import { useDebounceCallback } from 'hooks/useDebounceCallback';
import { useToast } from 'hooks/useToast';
import { IMovie } from 'models/movie';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  hasSearchMovieDataSelector,
  isLoadingSearchMovieSelector,
  movieSearchDataSelector,
} from 'store/modules/movies/selector';
import { colors } from 'themes/common/colors';

const MoviesRating: FC = () => {
  const movieSearchData = useSelector(movieSearchDataSelector);
  const hasSearchData = useSelector(hasSearchMovieDataSelector);
  const isLoadingSearch = useSelector(isLoadingSearchMovieSelector);
  const toast = useToast();
  const [movies, setMovies] = useState<IMovie['results']>([]);
  const [loadMovies, setLoadMovies] = useState<boolean>();
  const [query, setQuery] = useState<{ page: number }>({
    page: 1,
  });

  const getMovies = async () => {
    try {
      setLoadMovies(true);
      const res = await moviesApi.getMoviesTopRated({ page: query?.page });
      if (res.status) {
        setLoadMovies(false);
        setMovies([...movies, ...res?.data]);
      }
    } catch (error: any) {
      setLoadMovies(false);
      toast(error?.message, 'error');
    }
  };

  const handleChangePage = useDebounceCallback(() => {
    setQuery((prev) => ({ ...prev, page: prev?.page + 1 }));
  }, 400);

  useEffect(() => {
    const gridMovies = document.getElementById('grid-movie');
    window.addEventListener('scroll', () => {
      if (!gridMovies) return;
      if (
        gridMovies &&
        window.scrollY + window.innerHeight > gridMovies.clientHeight + gridMovies.offsetTop
      ) {
        handleChangePage();
      }
    });

    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  useEffect(() => {
    getMovies();
  }, [query?.page]);
  return (
    <React.Fragment>
      <Box sx={{ marginTop: '50px', marginBottom: '100px' }}>
        <Grid
          container
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3,1fr)', md: 'repeat(4, 1fr)' },
            gridRowGap: '16px',
            gridColumnGap: '16px',
          }}
          id="grid-movie"
        >
          {movieSearchData?.length > 0 &&
            movieSearchData?.map((film, idx) => <CardFilm key={idx} initialData={film} />)}

          {/* if has search data hide movies data from API current page and show search movies data  */}
          {/* if don't search data and search data = [] , show movies data of API this page */}
          {movieSearchData?.length === 0 &&
            movies &&
            !hasSearchData &&
            movies?.length > 0 &&
            movies?.map((film, idx) => <CardFilm key={idx} initialData={film} />)}
        </Grid>

        {loadMovies && movies?.length === 0 && (
          <Typography.Text
            styles={{
              fontSize: '18px',
              margin: '100px 0',
              textAlign: 'center',
              color: colors.white,
            }}
            variant="h6"
          >
            Loading film...
          </Typography.Text>
        )}

        {/* add loading film when user pull */}
        {hasSearchData && movieSearchData?.length === 0 && !isLoadingSearch && (
          <Typography.Text
            styles={{
              fontSize: '18px',
              margin: '100px 0',
              textAlign: 'center',
              color: colors.white,
            }}
            variant="h6"
          >
            No results matching your search!
          </Typography.Text>
        )}

        {loadMovies && (
          <LoadingSpinner
            isLoading={loadMovies}
            wrapperStyles={{
              position: 'fixed',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        )}
      </Box>
    </React.Fragment>
  );
};

export default MoviesRating;
