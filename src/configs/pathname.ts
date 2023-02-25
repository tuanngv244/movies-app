export const PATHNAME = {
  LOGIN: '/',
  HOME: '/home',
  MOVIES_DETAIL: (id?: string) => `/movies/${id ?? ':id'}`,
  MOVIES_RATING: '/movies-rating',
  NOW_PLAYING: '/now-playing',
};
