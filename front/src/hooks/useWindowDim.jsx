import { useEffect, useState } from "react";

export default function useWindowDim() {
  const [windowDim, setWindowDim] = useState(getWindowDim());

    useEffect(()=>{
        function handleResize(){
            setWindowDim(getWindowDim())
        }

        window.addEventListener('resize', handleResize);
        return ()=> window.removeEventListener('resize', handleResize);

    },[])

  return windowDim;
}

function getWindowDim() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
