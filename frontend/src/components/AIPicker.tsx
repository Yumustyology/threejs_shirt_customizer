import React from 'react'

import Button from './Button';
import { AIPickerTypes } from '../types/types';
import CloseXBtn from './CloseXBtn';

const AIPicker = ({ prompt, setPrompt, generatingImg, handleSubmit }:AIPickerTypes) => {
  return (
    <div className="aipicker-container">
    <CloseXBtn />
      <textarea 
        placeholder="Ask AI..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="aipicker-textarea"
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <Button 
            type="outline"
            title="Asking AI..."
            customStyles="text-xs"
          />
        ) : (
          <>
            <Button 
              type="outline"
              title="AI Logo"
              handleClick={() => handleSubmit('logo')}
              customStyles="text-xs"
            />

            <Button 
              type="filled"
              title="AI Full"
              handleClick={() => handleSubmit('full')}
              customStyles="text-xs"
            />
          </>
        )}
      </div>
    </div>
  )
}

export default AIPicker