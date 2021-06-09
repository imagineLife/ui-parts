import React, { 
  Fragment, 
  useRef, 
  useEffect,
  useState
} from 'react';

import {readFile} from './helpers';

const TextUploader = () => {
  const inputRef = useRef()
  const [fileList, setFileList] = useState(null)
  
  const inputChange = (e) => {
    readFile(e.target.files[0], (err, res) => {
      console.log('readFile Callback')
      
      if(err) console.warn(err);
      if(!err){
        console.log(`RES in textUploader!`); 
        console.log(res);
        setFileList(e.target.files)
      }
    })
  }

  

  // register input eventListener
  useEffect(() => {
    inputRef.current.addEventListener('change', inputChange);
    console.log('Event Listener registered')
  },[])

  console.log('fileList')
  console.log(fileList)
  

  return(
    <Fragment>
      <p>See <a target="_blank" href="https://avalon.law.yale.edu/subject_menus/inaug.asp">This Link</a> for more historical presidential inaugural addresses.</p>
      <input 
        ref={inputRef} 
        type="file" 
        id="file-selector" 
        multiple
        accept=".txt"
      />
    </Fragment>
  )
};

export default TextUploader;
