import React from 'react'
import {
    VictoryBar,
    VictoryTooltip
  } from "victory";

function ChartEnjoyable(props) {
    return (
        <VictoryBar 
            labelComponent={<VictoryTooltip />}
            data={props.studentdata}
            x="assignment"
            y="avgEnjoyable"
        />
    )
}

export default ChartEnjoyable