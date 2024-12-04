import React, { useRef, useEffect } from 'react';
import EmployeeDetailsContent from '../component/EmployeeDetailsContent/EmployeeDetailsContent';
import { useRoute  } from "@react-navigation/native";
import { useLanguage } from '../context/useLang/useLang';
import { useQuery } from '@tanstack/react-query';
import { getBranchById, getEmployeeById } from '../apiMethods/apiCall/get';
import GlobalLoading from '../component/GlobalLoading/GlobalLoading';

const EmployeeDetails = () => {
  const { lang } = useLanguage();
  const router = useRoute()
  const id = router.params.employee_id

  const { data, isLoading } = useQuery({
    queryKey: ['branch-name-by-id', lang,id],
    queryFn: async () => {
      const res = await getEmployeeById({ lang,id });
      if (res && res.data) {
        return res.data;
      }
    },
    staleTime: Infinity,
  });

  return isLoading || !data ? (
    <GlobalLoading/>
  ) : (
    <EmployeeDetailsContent data={data}/>
  );
};


export default EmployeeDetails;


