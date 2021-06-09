import React, { Fragment } from 'react';

const TextUploader = () => {
  return(
    <Fragment>
      <p>See <a target="_blank" href="https://avalon.law.yale.edu/subject_menus/inaug.asp">This Link</a> for more historical presidential inaugural addresses.</p>
      <input type="file" id="file-selector" multiple/>
    </Fragment>
  )
};

export default TextUploader;
