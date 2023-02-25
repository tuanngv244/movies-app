import { AsyncReturnType, StateResponse } from 'types/general';
import { DataResponse } from 'types/http-client';
import noop from 'lodash/noop';
import { useEffect, useRef, useState } from 'react';
import axios, { Canceler } from 'axios';

export const useQuery = <
  D extends object | null = any,
  P extends object | null | number | string = any,
  Func extends (...any: any[]) => any = any,
>(
  defaultPayload: P,
  queryFunc: Func,
  configs?: {
    initialData?: D;
    needCancel?: boolean;
    preventInitCall?: boolean;
    onChange?: (data: D | null) => void;
    onSuccess?: (res: AsyncReturnType<Func>) => void;
    isInfinityData?: boolean;
  },
) => {
  const {
    initialData,
    needCancel,
    onChange = noop,
    onSuccess = noop,
    preventInitCall,
    isInfinityData,
  } = configs || {};
  const [data, setData] = useState<StateResponse<D>>({
    loading: false,
    error: null,
    data: initialData ?? null,
  });
  const canceler = useRef<Canceler | null>(null);

  const fetch = async (args?: typeof defaultPayload): Promise<DataResponse<{ data: D }>> => {
    try {
      const payload: any = args;
      setData({ data: null, error: null, loading: true });

      if (needCancel) {
        payload.cancelToken = new axios.CancelToken(function executor(c) {
          canceler.current = c;
        });
      }
      const res: { data: D } = await queryFunc(payload);
      const mapData = isInfinityData
        ? [...((data?.data as any) ?? []), ...((res?.data as any[]) ?? [])]
        : res?.data;

      setData({ data: mapData as any, error: null, loading: false });
      onSuccess(res);

      return {
        status: true,
        message: '',
        data: {
          data: mapData as any,
        },
      };
    } catch (error: any) {
      setData({ data: data?.data ?? null, error: error, loading: false });
      return error;
    }
  };

  const cancel = (message?: string) => {
    canceler.current && canceler.current(message);
  };

  const updateData = (values: D) => {
    setData({ data: { ...data?.data, ...values }, error: null, loading: false });
  };

  const replaceData = (values: D) => {
    setData({ data: values, error: null, loading: false });
  };

  useEffect(() => {
    if (!preventInitCall) fetch(defaultPayload);
  }, []);

  useEffect(() => onChange(data), [data]);

  const value = data?.data;
  const status = {
    loading: data?.loading,
    error: data?.error,
  };
  const tools = {
    reFetch: fetch,
    cancel: cancel,
    update: updateData,
    replace: replaceData,
  };

  const result: [typeof value, typeof status, typeof tools] = [value, status, tools];

  return result;
};
