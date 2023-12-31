'use client'
import Lottie, {LottieRefCurrentProps} from 'lottie-react'
import animationData from '../../public/assets/animaton.json'
import { useRef } from 'react';
const Loading = () => {
  const loadingRef = useRef<LottieRefCurrentProps>(null)
  return <div>
    <Lottie onComplete={() => {
        loadingRef.current?.setDirection(-1)
        loadingRef.current?.play()
    }} lottieRef={loadingRef} animationData={animationData} style={{width: 300, height:300, margin: "auto"}}/>
  </div>;
};

export default Loading;
