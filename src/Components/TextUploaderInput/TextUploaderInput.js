import React, { useRef, useEffect } from 'react';
import Input from './../Input';
import { readFile } from './helpers';

const TextUploaderInput = ({onUpload}) => {
  
  const inputChange = (e) => {
    readFile(e.target.files[0], (err, res) => {
      if(err) console.warn(err);
      if(!err){
        onUpload(res)
      }
    })
  }

  // register input eventListener
  useEffect(() => {
    inputRef.current.addEventListener('change', inputChange);
    console.log('Event Listener registered')
  },[])

  const inputRef = useRef()
  return(
    <Input 
      ref={inputRef} 
      type="file" 
      id="file-selector" 
      multiple
      accept=".txt"
    />
  )
};

export default TextUploaderInput;
