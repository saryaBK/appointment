import React, {useState, createContext, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAccount } from "../../apiMethods/apiCall/get";

const UserProvider = createContext()

const UserContext = ({children}) => {

    const [user , setUser] = useState(null)
    const [showUserModal , setShowUserModal] = useState(false)
    const [lod , setLod] = useState(true)
    const [methodLogType , setMethodLogType] = useState('login')

    const {data:Account,isLoading} = useQuery({
      queryKey: ['account'],
      queryFn: async () => {
          const res = await getAccount()
          if(res && res?.data){
            setUser(res.data)
            await AsyncStorage.setItem('user' , JSON.stringify(res.data)) 
          }
          return res?.data || null
      },
      staleTime: Infinity,
    })

    useEffect(() => {
        const initializeUser = async () => {
          setLod(true);
            let currentuser = await AsyncStorage.getItem('user');
            if (currentuser) {
              currentuser = JSON.parse(currentuser);
              setUser(currentuser);
            }
            setLod(false);
          }
        initializeUser();
      }, []);

    return(
        lod ? null :
        <UserProvider.Provider value={{setUser ,user , setMethodLogType, methodLogType , setShowUserModal , showUserModal /*,Account*/ }}>
        {children}
        </UserProvider.Provider>
    )
}
export default UserContext

export const useUser = () => useContext(UserProvider)