import React, { Fragment, useState } from 'react';

import TextUploaderInput from './../../Components/TextUploaderInput';

const TextUploader = () => {
  const [fileContent, setFileContent] = useState(null);

  return (
    <Fragment>
      <p>
        See{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://avalon.law.yale.edu/subject_menus/inaug.asp"
        >
          This Link
        </a>{' '}
        for more historical presidential inaugural addresses.
      </p>
      <TextUploaderInput
        type="file"
        id="file-selector"
        multiple
        accept=".txt"
        onUpload={setFileContent}
      />
      {fileContent && <p style={{ whiteSpace: 'pre-line' }}>{fileContent}</p>}
    </Fragment>
  );
};

export default TextUploader;
