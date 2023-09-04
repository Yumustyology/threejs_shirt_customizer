import React from 'react'
import { useSnapshot } from 'valtio'
import valtioState from '../valtioStore/store';
import { TabPickerType } from '../types/types';

const TabPicker = ({ tab, isFilterTab, isActiveTab, handleClick }:TabPickerType) => {
  const snap = useSnapshot(valtioState);

  const activeStyles = isFilterTab && isActiveTab 
    ? { backgroundColor: snap.color, opacity: 0.5 }
    : { backgroundColor: "transparent", opacity: 1 }

  return (
    <div
      key={tab.name}
      className={`tab-btn ${isFilterTab ? 'rounded-full glassmorphism' : 'rounded-4'}`}
      onClick={handleClick}
      style={activeStyles}
    >
      <img 
        src={tab.icon}
        alt={tab.name}
        className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-2/3 h-2/3 object-contain'}`}
      />
    </div>
  )
}

export default TabPicker