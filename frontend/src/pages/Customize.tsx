import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import config from '../configs/config';
import valtioState from '../valtioStore/store';
// import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../helpers/helpers';
import { processBase64Image } from '../helpers/base64ToPNG';
import { EditorTabs, FilterTabs, DecalTypes } from '../configs/constant';
import { fadeAnimation, slideAnimation } from '../configs/motion';
import { AIPicker, ColorPicker, FilePicker, TabPicker, Button } from '../components';
import { DecalsTypes } from '../types/types';


const Customize = () => {

  const valtioStateSnap = useSnapshot(valtioState);

  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case "aipicker":
        return <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      default:
        return null;
    }
  }

  const handleSubmit = async (type: keyof DecalsTypes) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch(config.development.backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();

      // const processedImagePromise:any = await processBase64Image(data);

      // handleDecals(type, `data:image/png;base64,${processedImagePromise.photo}`)

      if(!data) return

      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }


  const handleDecals = (type: keyof DecalsTypes, result: string) => {

    const decalType = DecalTypes[type];

    valtioState[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }

  }

  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case "logoShirt":
        valtioState.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        valtioState.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        valtioState.isLogoTexture = true;
        valtioState.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState: any) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const readFile = (type: any) => {
    reader(file)
      .then((result: any) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }


  return (
    <AnimatePresence>
      {!valtioStateSnap.introScreen && (
        <>
          <motion.div className='absolute top-0 left-0 z-10' key="custom" {...slideAnimation('left')}>
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab) => (
                  <TabPicker
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)} />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
            <Button type='filled' title='Go Back' handleClick={() => valtioState.introScreen = true} customStyles='w-fit px-4 py-2.5 font-bold text-sm' />
          </motion.div>
          <motion.div className='filtertabs-container' {...slideAnimation('up')}>
            {FilterTabs.map((tab) => (
              <TabPicker
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)} />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customize