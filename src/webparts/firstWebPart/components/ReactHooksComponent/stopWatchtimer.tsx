
import { PrimaryButton } from '@fluentui/react';
import * as React from 'react';
import { useState,useEffect } from 'react';

const StopWatchTimer:React.FC<{}>=()=>{
    const [time,setTime]=useState<number>(0);
    const [isRunning,setIsRunning]=useState<boolean>(false);

    useEffect(()=>{
        let interval:any;
        if(isRunning){
            interval=setInterval(()=>{
                setTime((prev)=>prev+1)
            },1000)
        }
        return()=>clearInterval(interval);
    },[isRunning]);
    return(
        <>
        <h2>Stop watch timer:{time}</h2>
        <PrimaryButton
        text={isRunning?"Stop":"Start"}
        onClick={()=>setIsRunning(!isRunning)}
        iconProps={{iconName:"clock"}}
        />
        &nbsp;&nbsp;&nbsp;
        <PrimaryButton
        text="Reset"
        onClick={()=>{setIsRunning(false);setTime(0)}}
        />
        </>
    )
}
export default StopWatchTimer;