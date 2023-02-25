import { AxiosResponse } from 'axios';
import { API_KEY } from 'configs/general';
import { ICast, IMovie, IMovieDetail, IMovieVideo } from 'models/movie';
import { DataResponse } from 'types/http-client';
import { restClient } from './restClient';

const basePath = '/movie' as const;

export const moviesApi = {
  async getMovies(payload?: {
    page?: number;
    language?: string;
  }): Promise<DataResponse<IMovie['results']>> {
    try {
      const res: AxiosResponse<IMovie> = await restClient.get(`/discover/${basePath}`, {
        params: {
          api_key: API_KEY,
          page: payload?.page,
        },
      });
      const { data } = res;
      return {
        status: true,
        message: '',
        data: data?.results,
      };
    } catch (error) {
      return Promise.reject({ status: false, message: error });
    }
  },
  async getMovieDetail(id?: number): Promise<DataResponse<IMovieDetail>> {
    try {
      const res: AxiosResponse<IMovieDetail> = await restClient.get(`${basePath}/${id}`, {
        params: {
          api_key: API_KEY,
        },
      });
      const { data } = res;
      return {
        status: true,
        message: '',
        data: data,
      };
    } catch (error) {
      return Promise.reject({ status: false, message: error });
    }
  },
  async getMovieVideos(id?: number): Promise<DataResponse<IMovieVideo>> {
    try {
      const res: AxiosResponse<IMovieVideo> = await restClient.get(`${basePath}/${id}/videos`, {
        params: {
          api_key: API_KEY,
        },
      });
      const { data } = res;
      return {
        status: true,
        message: '',
        data: data,
      };
    } catch (error) {
      return Promise.reject({ status: false, message: error });
    }
  },
  async getMovieSimilars(id?: number): Promise<DataResponse<IMovie['results']>> {
    try {
      const res: AxiosResponse<IMovie> = await restClient.get(`${basePath}/${id}/similar`, {
        params: {
          api_key: API_KEY,
        },
      });
      const { data } = res;
      return {
        status: true,
        message: '',
        data: data?.results,
      };
    } catch (error) {
      return Promise.reject({ status: false, message: error });
    }
  },
  async getMovieCasts(id?: number): Promise<DataResponse<ICast[]>> {
    try {
      const res: AxiosResponse<{
        cast: ICast[];
      }> = await restClient.get(`${basePath}/${id}/casts`, {
        params: {
          api_key: API_KEY,
        },
      });
      const { data } = res;
      return {
        status: true,
        message: '',
        data: data?.cast,
      };
    } catch (error) {
      return Promise.reject({ status: false, message: error });
    }
  },
  async getMoviesTopRated(payload?: { page?: number }): Promise<DataResponse<IMovie['results']>> {
    try {
      const res: AxiosResponse<IMovie> = await restClient.get(`${basePath}/top_rated`, {
        params: {
          api_key: API_KEY,
          page: payload?.page,
        },
      });
      const { data } = res;
      return {
        status: true,
        message: '',
        data: data?.results,
      };
    } catch (error) {
      return Promise.reject({ status: false, message: error });
    }
  },
  async getMoviesNowPlaying(payload?: { page?: number }): Promise<DataResponse<IMovie['results']>> {
    try {
      const res: AxiosResponse<IMovie> = await restClient.get(`${basePath}/now_playing`, {
        params: {
          api_key: API_KEY,
          page: payload?.page,
        },
      });
      const { data } = res;
      return {
        status: true,
        message: '',
        data: data?.results,
      };
    } catch (error) {
      return Promise.reject({ status: false, message: error });
    }
  },
  async searchMovies(query?: string): Promise<DataResponse<IMovie>> {
    try {
      const res: AxiosResponse<IMovie> = await restClient.get(`/search${basePath}`, {
        params: {
          api_key: API_KEY,
          query: query,
        },
      });
      const { data } = res;
      return {
        status: true,
        message: '',
        data: data,
      };
    } catch (error) {
      return Promise.reject({ status: false, message: error });
    }
  },
};

export type MoviesApi = typeof moviesApi;
