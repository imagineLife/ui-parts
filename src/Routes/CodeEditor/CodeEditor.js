import React, { useRef, useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
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
    content = content.replace(/<\/?span[^>]*>/g,"");
    
    // content = content.replace(/&lt;/g,'<')
    //   .replace(/&gt;/g,'>')
    //   .replace(/&amp;/g,'&');
      window.eval(content)
  }

  return (
    <main id="code-editor">

      <h2>Inline Code Editor + HTML Output</h2>
      <p>On the left, a div rendering some content.</p>
      <p>On the right, an input for you the viewer to edit & update the output</p>
    
      <section id="columns-wrapper" className="flex-row">
        <div id="left-col" className="flex-half-width">
          <div id="code-result" ref={codeResultRef}>
            <div id="chart_res"></div>
          </div>
        </div>
        <div id="right-col" className="flex-half-width">
          <code 
            ref={textBlockRef} 
            id="codejs" 
            className="flex-half-width"
            contentEditable="true" 
            onInput={(e) => {
              myHtmlParser()
            }} 
            suppressContentEditableWarning
          >
              <SyntaxHighlighter 
                language="javascript" 
                className="syntax-highlighter"
              >
                {renderedText}
              </SyntaxHighlighter>
          </code>
        </div>
      </section>
    </main>
  )
};

export default CodeEditor;
