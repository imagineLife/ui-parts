import React from 'react';
import './CodeEditor.css';

const CodeEditor = () => (
  <main id="code-editor">

    <h2>Inline Code Editor + HTML Output</h2>
    <p>On the left, a div rendering some content.</p>
    <p>On the right, an input for you the viewer to edit & update the output</p>
  
    <section id="columns-wrapper" className="flex-row">
      <div id="left-col" className="flex-half-width">
        <h3>Left Column</h3>
      </div>
      <div id="right-col" className="flex-half-width">
        <h3>Left Column</h3>
      </div>
    </section>

  </main>
);

export default CodeEditor;
