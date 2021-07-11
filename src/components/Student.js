import React from 'react'

function Student(props) {
    return(
        <button onClick={() => props.onClickStudent(props.name)}>{props.name}</button>
    )
}

export default Student