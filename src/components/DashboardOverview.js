import React, { Component } from 'react'
import studentdataresult from './studentdataresult.json'
import Chart from './Chart'
import Students from './Students'

class DashboardOverview extends Component {
    constructor() {
        super()
        this.state = {
            studentdata: studentdataresult,
            studentnames: [],
            currentstudent: ""
        }
        this.filteringAssignment = this.filteringAssignment.bind(this)
        this.filteringStudent = this.filteringStudent.bind(this)
        this.onClickStudent = this.onClickStudent.bind(this)
        this.onClickAssignment = this.onClickAssignment.bind(this)
        this.selectedAssignment = this.selectedAssignment.bind(this)
    }

    componentDidMount() {
        this.filteringAssignment("W1D")
        this.filteringStudent()

        document.addEventListener("DOMContentLoaded", function () {
            document.getElementById("W1D").click();
            document.getElementById("buttonAll").focus();
        })
    }

    onChangeLinechart = () => {
        //let linechartCheckbox = document.getElementById("linechart-checkbox").checked
        //console.log(linechartCheckbox)
        this.setState(prevState => {
            return {
                ...prevState,
                studentdata: prevState.studentdataresult,
                studentnames: prevState.studentnames,
                currentstudent: prevState.currentstudent
            }
        })
    }
    
    selectedAssignment = () => {
        const inputId = ["W1D", "W2D", "W3D", "W4D", "W5D"]
        const checkedId = inputId.filter(id => document.getElementById(id).checked && id)
        //console.log("checked id", checkedId)
        //console.log("this state currentstudent", this.state.currentstudent)
        
        this.filteringAssignment(checkedId[0])
        //console.log("selectedAssignment has been executed")
    }

    onClickStudent = (studentname) => {
        if (studentname === "AllStudents") {
            this.setState(prevState => {
                return {
                    ...prevState,
                    studentdata: studentdataresult,
                    studentnames: prevState.studentnames,
                    currentstudent: ""
                }
            }, () => {
                this.selectedAssignment()
            })
        } else {
            let allAssignmentsOfStudent = studentdataresult.filter(evaluation => evaluation.name.includes(studentname))
            //console.log("all assignments of one student", allAssignmentsOfStudent)
            this.setState(prevState => {
                return {
                    ...prevState,
                    studentdata: allAssignmentsOfStudent,
                    studentnames: prevState.studentnames,
                    currentstudent: studentname
                }
            }, () => {
                this.selectedAssignment()
            })
        }
    }

    onClickAssignment = (assign) => {
        this.state.studentnames.forEach(name => {
            if (this.state.currentstudent === name) {
                let allAssignmentsOfStudent = studentdataresult.filter(evaluation => evaluation.name.includes(name))
            
                this.setState(prevState => {
                    return {
                        ...prevState,
                        studentdata: allAssignmentsOfStudent,
                        studentnames: prevState.studentnames,
                        currentstudent: prevState.currentstudent
                    }
                }, () => {
                    this.filteringAssignment(assign)
                })
            } else {
                this.setState(prevState => {
                    return {
                        ...prevState,
                        studentdata: studentdataresult,
                        studentnames: prevState.studentnames,
                        currentstudent: prevState.currentstudent
                    }
                }, () => {
                    this.filteringAssignment(assign)
                })
            }
        })
    }

    filteringStudent = () => {
        let onlyNames = studentdataresult.map(evaluation => evaluation.name)
        //console.log("onlyNames", onlyNames)

        let withoutDuplicates = (data) => data.filter((value, index) => data.indexOf(value) === index)

        let uniqueNames = withoutDuplicates(onlyNames)
        //console.log("unqiuenames", uniqueNames)
        let arrLength = withoutDuplicates(uniqueNames).length

        let uniqueNamesId = []
        for (let i = 0; i < arrLength; i++) {
            uniqueNamesId.push({ id: i, name: uniqueNames[i] })
        }
        //console.log("uniquenames index", uniqueNamesId)

        this.setState(prevState => {
            return {
                ...prevState,
                studentdata: prevState.studentdata,
                studentnames: uniqueNamesId,
                currentstudent: prevState.currentstudent
            }
        })
    }

    filteringAssignment = (assign) => {
        let allAssignmentsOf

        if (assign === "W5D") {
            let allAssignmentsOfW5D = this.state.studentdata.filter(evaluation => evaluation.assignment.includes("W5D"))
            let allAssignmentsOfW6D = this.state.studentdata.filter(evaluation => evaluation.assignment.includes("W6D"))
            let allAssignmentsOfSCRUM = this.state.studentdata.filter(evaluation => evaluation.assignment.includes("SCRUM"))
            allAssignmentsOf = allAssignmentsOfW5D.concat(allAssignmentsOfW6D, allAssignmentsOfSCRUM)
        } else {
            allAssignmentsOf = this.state.studentdata.filter(evaluation => evaluation.assignment.includes(assign))
        }

        let onlyAssignments = allAssignmentsOf.map(evaluation => evaluation.assignment)

        let withoutDuplicates = (data) => data.filter((value, index) => data.indexOf(value) === index)

        let uniqueAssignments = withoutDuplicates(onlyAssignments)

        let arrLength = withoutDuplicates(onlyAssignments).length

        let dataForChart = []
        for (let i = 0; i < arrLength; i++) {
            let dataSortedByAssignment = allAssignmentsOf
                .filter(evaluation => evaluation.assignment === uniqueAssignments[i])
                .map(evaluation => { return { assignment: evaluation.assignment, difficulty: parseInt(evaluation.difficulty, 10), enjoyable: parseInt(evaluation.enjoyable, 10) } })
            //console.log("dataSortedByAssignment", dataSortedByAssignment)

            let sumDifficulty = dataSortedByAssignment.map(evaluation => {
                return evaluation.difficulty
            }).reduce((accumulator, currentValue) => accumulator + currentValue)

            let avgDifficulty = sumDifficulty / dataSortedByAssignment.length
            //console.log("avgDifficulty", avgDifficulty)

            let sumEnjoyable = dataSortedByAssignment.map(evaluation => {
                return evaluation.enjoyable
            }).reduce((accumulator, currentValue) => accumulator + currentValue)

            let avgEnjoyable = sumEnjoyable / dataSortedByAssignment.length
            //console.log("avgEnjoyable", avgEnjoyable)

            dataForChart.push({ assignment: uniqueAssignments[i], avgDifficulty: avgDifficulty, avgEnjoyable: avgEnjoyable, label: `Assignment: ${uniqueAssignments[i]}, difficulty rating: ${avgDifficulty}, enjoyable rating: ${avgEnjoyable}` })
            //console.log("dataForChart", dataForChart)
        }
        //console.log("uniqueassignments", uniqueAssignments)
        //console.log("result allAssignmentsof:", allAssignmentsOf)
        //console.log("results of onlyAssignments", onlyAssignments)
        //console.log("arrlength", arrLength)
        //console.log("this state", this.state)
        //console.log("dataForChart", dataForChart)

        this.setState(prevState => {
            return {
                ...prevState,
                studentdata: dataForChart,
                studentnames: prevState.studentnames,
                currentstudent: prevState.currentstudent
            }
        })
    }

    render() {
        return (
            <div>
                <h1 className="header">Studentdashboard</h1>
                <h2 className="header-studentname">{this.state.currentstudent}</h2>
                <Chart
                    studentdata={this.state.studentdata}
                    onClickAssignment={this.onClickAssignment}
                    currentstudent={this.state.currentstudent}
                />
                <Students 
                    studentdata={this.state.studentdata} 
                    studentnames={this.state.studentnames} 
                    onClickStudent={this.onClickStudent} 
                />
            </div>
        )
    }
}

export default DashboardOverview