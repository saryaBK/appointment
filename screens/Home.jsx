import React, { useRef, useEffect } from 'react';
import HomeContent from '../component/HomeContent/HomeContent';
import { getBranch } from '../apiMethods/apiCall/get';
import { useLanguage } from '../context/useLang/useLang';
import { useQuery } from '@tanstack/react-query';
import GlobalLoading from '../component/GlobalLoading/GlobalLoading';

const Home = () => {
  const { lang } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ['branch-name', lang],
    queryFn: async () => {
      const res = await getBranch({ lang });
      if (res && res.data) {
        return res.data;
      }
    },
    staleTime: Infinity,
    refetchInterval: 30000,
    enabled:lang && lang ? true : false
  });

  return isLoading || !data ? (
    <GlobalLoading/>
  ) : (
    <HomeContent data={data}/>
  );
};

export default Home;
