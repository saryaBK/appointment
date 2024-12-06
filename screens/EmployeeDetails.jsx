import React, { useRef, useEffect } from 'react';
import EmployeeDetailsContent from '../component/EmployeeDetailsContent/EmployeeDetailsContent';
import { useRoute  } from "@react-navigation/native";
import { useLanguage } from '../context/useLang/useLang';
import { useQuery } from '@tanstack/react-query';
import { getBranchById, getEmployeeById, service_type } from '../apiMethods/apiCall/get';
import GlobalLoading from '../component/GlobalLoading/GlobalLoading';
import EmployeeDetailsContentTwo from '../component/EmployeeDetailsContentTwo/EmployeeDetailsContentTwo';

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
  
  const { data:serviceTypeData, isLoading:serviceTypeLod } = useQuery({
    queryKey: ['service-type-id', lang],
    queryFn: async () => {
      const res = await service_type({lang});
      if (res && res.data) {
        return res.data;
      }
    },
    staleTime: Infinity,
  });

  return isLoading || !data || serviceTypeLod || !serviceTypeData ? (
    <GlobalLoading/>
  ) : (
    // <EmployeeDetailsContent data={data} serviceTypeData={serviceTypeData}/>
    <EmployeeDetailsContentTwo data={data} serviceTypeData={serviceTypeData}/>
  );
};


export default EmployeeDetails;





