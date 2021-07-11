import React from 'react'
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryLine,
  VictoryGroup
} from "victory";

const studentTheme = {
  axis: {
    style: {
      grid: {
        fill: "none",
        stroke: "none"
      },
      tickLabels: {
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 8,
        padding: 8,
      }
    },
    width: 350,
    height: 350,
    padding: 50
  },

  bar: {
    style: {
      labels: {
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 8,
        padding: 8,
      }
    },
    width: 350,
    height: 350,
    padding: 20
  },
 
  chart: {
    width: 800,
    height: 350,
    padding: 70,
  },

  line: {
    style: {
      data: {
        strokeWidth: 2
      },
      labels: {
        display: "none",
      }
    },
    width: 350,
    height: 350,
    padding: 20
  },
  
  tooltip: {
    style: {
      padding: 5,
      fill: "black",
    },
    flyoutStyle: {
      fill: "rgba(223, 242, 238, 1)",
    },
    cornerRadius: 0,
    pointerLength: 8
  }
};

function Chart(props) {
  return (
    <div>
      <div>
        <VictoryChart domainPadding={20} theme={studentTheme}>
          <VictoryGroup
            offset={15}
            colorScale={"qualitative"}>
            <VictoryBar
              labelComponent={<VictoryTooltip />}
              data={props.studentdata}
              x="assignment"
              y="avgDifficulty"
            />
            <VictoryBar
              labelComponent={<VictoryTooltip />}
              data={props.studentdata}
              x="assignment"
              y="avgEnjoyable"
            />
          </VictoryGroup>
          <VictoryAxis dependentAxis
            label="Difficulty / Enjoyable"
          />
          <VictoryAxis dependentAxis />
          <VictoryAxis
            label="Assignment"
          />
          <VictoryAxis />
        </VictoryChart>
      </div>

      <div>
        <VictoryChart domainPadding={20} theme={studentTheme}>
          <VictoryLine
            style={{
              data: { stroke: "rgb(51, 77, 92)" },
              parent: { border: "1px solid #ccc" }
            }}
            data={props.studentdata}
            x="assignment"
            y="avgDifficulty"
          />
          <VictoryLine
            style={{
              data: { stroke: "rgb(69, 178, 157)" },
              parent: { border: "1px solid #ccc" }
            }}
            data={props.studentdata}
            x="assignment"
            y="avgEnjoyable"
          />
          <VictoryAxis dependentAxis
            label="Difficulty / Enjoyable"
          />
          <VictoryAxis dependentAxis />
          <VictoryAxis
            label="Assignment"
          />
          <VictoryAxis />
        </VictoryChart>
      </div>

      <form className="form-assignment">
        <label><input id="W1D" type="radio" name="assignment" onClick={() => props.onClickAssignment("W1D")} ></input>W1D</label>
        <label><input id="W2D" type="radio" name="assignment" onClick={() => props.onClickAssignment("W2D")} ></input>W2D</label>
        <label><input id="W3D" type="radio" name="assignment" onClick={() => props.onClickAssignment("W3D")} ></input>W3D</label>
        <label><input id="W4D" type="radio" name="assignment" onClick={() => props.onClickAssignment("W4D")} ></input>W4D</label>
        <label><input id="W5D" type="radio" name="assignment" onClick={() => props.onClickAssignment("W5D")} ></input>W5D, W6D and SCRUM</label>
      </form>
    </div>
  )
}

export default Chart