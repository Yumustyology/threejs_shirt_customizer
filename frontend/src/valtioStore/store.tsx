import {proxy} from 'valtio'

const valtioState = proxy({
    introScreen: true,
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: '../blocks.png',
    fullDecal: '../blocks.png',
    activeEditorTab: ''
})

export default valtioState