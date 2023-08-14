import '@/styles/globals.css'
import AuthContextProvider, { AuthContext } from '@/utilities/AuthContext'
import { axiosInstance } from '@/utilities/axios'
import { useLocalStorage } from '@/utilities/useLocalStorage'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

export default function App({ Component, pageProps }) {
  const router = useRouter();
  // const auth = useContext(AuthContext);

  const { getItem , setItem } = useLocalStorage();
    const authentication = async () => {
    if(getItem('cookie'))
    {
      try
      {
        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + getItem('cookie');
        let { data } = await axiosInstance.get('/user-api/users/me/');
        setItem('phoneNumber',data.phone_number)
        
      }
      catch(err)
      {
        router.push('/auth')
          return
      }
      
    }
    else
        router.push('/auth')
  //     //  
  //     console.log(await axiosInstance.get('/user-api/users/me/'))
  //     // 
  //     }
  //     catch(err)
  //     {
  //         router.push('/auth')
  //         return
  //     }
  }
  useEffect(() => {
    authentication();
  },[])
  // authentication();
  return <AuthContextProvider>
    <Component {...pageProps} />
  </AuthContextProvider> 
}
