import React, { useRef, useEffect } from 'react';
import { getBranchById } from '../apiMethods/apiCall/get';
import { useLanguage } from '../context/useLang/useLang';
import { useQuery } from '@tanstack/react-query';
import BranchesDetailsContent from '../component/BranchesDetailsContent/BranchesDetailsContent';
import { useRoute } from '@react-navigation/native';
import GlobalLoading from '../component/GlobalLoading/GlobalLoading';

const Home = () => {
  const { lang } = useLanguage();
  const router = useRoute()
  const id = router.params.branch_id

  const { data, isLoading } = useQuery({
    queryKey: ['branch-name-by-id', lang,id],
    queryFn: async () => {
      const res = await getBranchById({ lang,id });
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
    <BranchesDetailsContent data={data}/>
  );
};

export default Home;
