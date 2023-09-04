import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import valtioState from '../valtioStore/store';
import { Button } from '../components';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../configs/motion';

const Home = () => {
  const valtioStateSnap = useSnapshot(valtioState);
  return (
    <AnimatePresence>
      {valtioStateSnap.introScreen && (
        <motion.section className="home" {...slideAnimation('left')}>
          <motion.header {...slideAnimation("down")}>
            <img 
              src='./blocks.png'
              alt="logo"
              className="w-14 h-14 object-contain"
            />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET'S <br className="xl:block hidden" /> CREATE IT.
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
              Customize your unique and exclusive shirt with our new 3D customization tool. <strong>Unleash your imagination</strong>{" "} and create your own <strong>ARTISTIC DESIGN</strong>.
              </p>

              <Button 
                type="filled"
                title="LET'S CREATE IT"
                handleClick={() => valtioState.introScreen = false}
                customStyles="w-fit px-5 py-3 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home