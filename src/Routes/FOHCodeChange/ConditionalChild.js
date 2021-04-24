import React from 'react';

export default function ConditionalChild({data}){
  return <div 
        id="show-data">
          { 
            data
            ? JSON.stringify(data) 
            : 'loading...'
          }
      </div>
}