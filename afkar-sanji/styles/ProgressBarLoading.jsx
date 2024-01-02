import TopBarProgress from "react-topbar-progress-indicator";
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";

TopBarProgress.config({
    barColors: {
      "0": "#5360ED",
      "1.0": "#e0e0ff"
    },
    shadowBlur: 2
  });


const ProgressBarLoading = () => {
    const [ ProgressBarState , SetProgressBarState ] = useState(false);
    const router = useRouter();
    useEffect(() => {
      router.events.on("routeChangeStart", (url)=>{
        SetProgressBarState(true)
      });
      router.events.on("routeChangeComplete", (url)=>{
        SetProgressBarState(false)
      });
      router.events.on("routeChangeError", (url) =>{
        SetProgressBarState(false)
      }); 
    },[])
    
  return (
   ProgressBarState ? <TopBarProgress /> : ''
  )
}
export default ProgressBarLoading;