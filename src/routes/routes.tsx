import { PATHNAME } from 'configs/pathname';
import { FC, lazy } from 'react';

export interface IRouteConfig {
  path: string;
  component: FC;
  title: string;
  role?: string[];
  exact?: boolean;
  disableHeader?: boolean;
  isBack?: boolean;
}

const Login = lazy(() => import('pages/Login'));
const Home = lazy(() => import('pages/Home'));
const MovieDetail = lazy(() => import('pages/MovieDetail'));
const MoviesRating = lazy(() => import('pages/MoviesRating'));
const NowPlaying = lazy(() => import('pages/NowPlaying'));

export const pageRoutes: IRouteConfig[] = [
  {
    title: 'LOGIN',
    path: PATHNAME.LOGIN,
    component: Login,
    exact: true,
  },
  {
    title: 'Home',
    path: PATHNAME.HOME,
    component: Home,
  },
  {
    title: 'Movie Detail',
    path: PATHNAME.MOVIES_DETAIL(),
    component: MovieDetail,
    isBack: true,
  },
  {
    title: 'Movies Rating',
    path: PATHNAME.MOVIES_RATING,
    component: MoviesRating,
  },
  {
    title: 'Now playing',
    path: PATHNAME.NOW_PLAYING,
    component: NowPlaying,
  },
];
