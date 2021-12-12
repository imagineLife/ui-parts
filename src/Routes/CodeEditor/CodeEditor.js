import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import './CodeEditor.css';
import startingText from './startingText';
import mockData from './mockData.json'
window.d3 = d3;
window.mockData= mockData;

const CodeEditor = () => {

  const codeResultRef = useRef();
  const textBlockRef = useRef();
  const chartResRef = useRef()
  const [renderedText, setRenderedText] = useState(startingText)
  
  useEffect(() => {
    myHtmlParser()
  },[])
  function myHtmlParser(){
    
    // get the content of the origin div (first argument)
    var content = textBlockRef.current.innerText;
    // remove the xmp tag
    content = content.replace(/<xmp>/,"").replace(/<.xmp>/,"").replace(/<\/?span[^>]*>/g,"");
    // write the content in the destination div (second argument)
    myJSParser(content)
  }

  function myJSParser(content){
    var command = content;
    // remove the xmp tag and the script tags
    command = command.replace(/&lt;/g,'<')
      .replace(/&gt;/g,'>')
      .replace(/&amp;/g,'&');
      window.eval(command)
  }
  return (
    <main id="code-editor">

      <h2>Inline Code Editor + HTML Output</h2>
      <p>On the left, a div rendering some content.</p>
      <p>On the right, an input for you the viewer to edit & update the output</p>
    
      <section id="columns-wrapper" className="flex-row">
        <div id="left-col" className="flex-half-width">
          <h3>Left Column</h3>
          <div id="code-result" ref={codeResultRef}>
            <div id="chart_res"></div>
          </div>
        </div>
        <div id="right-col" className="flex-half-width">
          <h3>Right Column</h3>
          <pre className="language-js">
            <code 
              ref={textBlockRef} 
              id="codejs" 
              contentEditable="true" 
              onInput={(e) => {
                myHtmlParser()
                // myJSParser()
              //   setRenderedText(textBlockRef.current.innerHTML
              //   .replace(/&lt;/g,'<')
              //   .replace(/&gt;/g,'>')
              //   .replace(/&amp;/g,'&'))
              }} 
              suppressContentEditableWarning>
              {renderedText}
            </code>
          </pre>
        </div>
      </section>
    </main>
  )
};

export default CodeEditor;
