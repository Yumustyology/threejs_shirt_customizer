import React from 'react'
import { useSnapshot } from 'valtio';
import valtioState from '../valtioStore/store';
import { getContrastingColor } from '../helpers/helpers';
import { ButtonType } from '../types/types';


const Button = ({ type, title, customStyles, handleClick }:ButtonType) => {
  const valtioStateSnap = useSnapshot(valtioState);

  const generateStyle = (type:string) => {
    if(type === 'filled') {
      return {
        backgroundColor: valtioStateSnap.color,
        color: getContrastingColor(valtioStateSnap.color)
      }
    } else if(type === "outline") {
      return {
        borderWidth: '1px',
        borderColor: valtioStateSnap.color,
        color: valtioStateSnap.color
      }
    }
  }

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type!)}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default Button