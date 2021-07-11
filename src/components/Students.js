import React from 'react'
import Student from './Student'

function Students(props) {
    const studentName = props.studentnames.map( student => <Student key={student.id} name={student.name} studentdata={props.studentdata} onClickStudent={props.onClickStudent}/>)
        return(
            <div className="students-container">
                <h1 className="students-title">Students</h1>
                <div className="students-container-section">
                    <section className="students-section-left">
                        <input type="button" value="All Students" id="buttonAll" onClick={() => props.onClickStudent("AllStudents")}/>
                    </section>
                    <section className="students-section-right">
                        <div className="students-names">{studentName}</div>
                    </section>
                </div>
            </div>
        )
}

export default Students
