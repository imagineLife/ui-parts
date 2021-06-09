import React, { Fragment, useRef, useEffect } from 'react';

const TextUploader = () => {
  const inputRef = useRef()

  const inputChange = (e) => {
    const fileList = event.target.files;
    console.log(fileList);
  }

  useEffect(() => {
    inputRef.current.addEventListener('change', inputChange);
    console.log('Event Listener registered')
  },[])

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
