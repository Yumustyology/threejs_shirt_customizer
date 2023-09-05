import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'
import valtioState from '../valtioStore/store';
import CloseXBtn from './CloseXBtn';

const ColorPicker = () => {
  const valtioStateSnap = useSnapshot(valtioState);

  return (
    <div className="absolute left-full ml-3">
    <CloseXBtn />
      <SketchPicker 
        color={valtioStateSnap.color}
        disableAlpha
        onChange={(color:any) => valtioState.color = color.hex}
      />
    </div>
  )
}

export default ColorPicker