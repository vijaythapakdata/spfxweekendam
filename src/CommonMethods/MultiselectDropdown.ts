import React from 'react';
import { ISharePointListColumns } from './ISharePointListCoulmns';
import { IDropdownOption } from '@fluentui/react';

export const handleSkillsChange=(options:IDropdownOption,formData:ISharePointListColumns,
    setformdata:React.Dispatch<React.SetStateAction<ISharePointListColumns>>)=>{
        const selectedkey=options.selected?[...formData.Skills,options?.key as string]
        :formData.Skills.filter((key:any)=>key!==options.key);
        setformdata(prev=>({...prev,Skills:selectedkey}))
    }

    //ar1[1,2,,4]!==arr2[4]