import React from 'react'
import {
    VictoryBar,
    VictoryTooltip
  } from "victory";

function ChartDifficulty(props) {
    return (
        <VictoryBar 
            labelComponent={<VictoryTooltip />}
            data={props.studentdata}
            x="assignment"
            y="avgDifficulty"
        />
    )
}

export default ChartDifficulty