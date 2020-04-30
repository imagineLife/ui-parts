import React, { Component, useEffect, createRef } from 'react'
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'
import './index.css'
import { wrap } from '../../helpers'

const Axis = (props) => {

  const axisElement = createRef()
  useEffect(() => {
    if(axisElement && axisElement.current){
      const axisType = `axis${props.orient}`
      const axis = d3Axis[axisType]()
        .scale(props.scale)
        .tickSize(-props.tickSize)
        .tickPadding([12])

      d3Select(axisElement.current).call(axis)
      if(props.orient == 'bottom'){
        d3Select(axisElement.current).selectAll(".tick text")
        .call(wrap, props.scale.bandwidth())
      }
    }
  }, [axisElement])

  return (
    <g
      className={`Axis Axis-${props.orient}`}
      ref={axisElement}
      transform={props.translate}
    />
  )
}

export default Axis;