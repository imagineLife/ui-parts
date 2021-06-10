import React, { 
  Fragment, 
  useRef, 
  useEffect,
  useState
} from 'react';

import TextUploaderInput from './../../Components/TextUploaderInput'

const TextUploader = () => {
  const [fileContent, setFileContent] = useState(null);
  console.log('fileContent')
  console.log(fileContent)
  
  return(
    <Fragment>
      <p>See <a target="_blank" href="https://avalon.law.yale.edu/subject_menus/inaug.asp">This Link</a> for more historical presidential inaugural addresses.</p>
      <TextUploaderInput 
        type="file" 
        id="file-selector" 
        multiple
        accept=".txt"
        onUpload={(f) =>setFileContent(f)}
      />
      {fileContent && <p>{fileContent}</p>}
    </Fragment>
  )
};

export default TextUploader;