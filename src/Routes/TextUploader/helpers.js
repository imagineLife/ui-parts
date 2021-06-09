function readFile(file, cb) {
  console.log('READING FILE?!')
  
  // Check if the file is an image.
  if (file.type && !file.type.startsWith('text')) {
    return cb('Tried to upload a file that is not a text file')
  }

  const reader = new FileReader();
  reader.addEventListener('load', (e) => {
    console.log('inside reader.load')
    
    let { target: { result } } = e;
    return cb(null,result);
  });
  reader.readAsText(file);
}

export {
  readFile
}