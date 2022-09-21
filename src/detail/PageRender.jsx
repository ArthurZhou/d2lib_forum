import React, {useEffect, useState} from 'react';
import './extraUI.css'


function App() {
    const [item, setItems] = useState()

    try {
        useEffect(() => {
            fetch('http://localhost:61780/')
                .then((res) => res.json())
                .then((data) => {
                    setItems(data)
                })
        }, []);
    } catch (error) {
        return (
            <div className="alert">
                Failed to fetch data from backend server!
            </div>
        )
    }
    return (
        <>
            <Question props={item}/>
            <hr/>
            <Answer props={item}/>
        </>
    )
}

function Question({props}) {
    return (
        <div className={"question"}>
            <h1>{ props?.question?.title }</h1>
            <p className={"info"}>Created by user: { props?.question?.create_by }</p><br/>
            <p className={"info"}>On { }</p><br/>
            <hr/>
            <div dangerouslySetInnerHTML={{__html: props?.question?.detail}}></div>
        </div>
    )
}

function Answer({props}) {
    return (
        props?.answers?.map((answer) => {
            return (
                <div className={"answer"}>
                    <h4 className={"info"}>Answer by: { answer?.create_by }</h4><br/>
                    <p className={"info"}>On { Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(answer?.time)) }</p><br/>
                    <hr/>
                    <div dangerouslySetInnerHTML={{__html: answer?.detail}}></div>
                </div>
            )
        })
    )
}

export default App;