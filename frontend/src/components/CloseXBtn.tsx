import React from 'react'
import { getContrastingColor } from '../helpers/helpers'
import { useSnapshot } from 'valtio';
import valtioState from '../valtioStore/store';

const CloseXBtn = () => {
    const valtioStateSnap = useSnapshot(valtioState);
    return <span onClick={() => valtioState.activeEditorTab = ''} className={`absolute top-0 left-full ml-3 text-lg cursor-pointer`} style={{ color: getContrastingColor(valtioStateSnap.color), fontFamily: 'inter' }} >x</span>
}

export default CloseXBtn