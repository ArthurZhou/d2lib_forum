## EDIT: I finally solved this problem. Hope it will help you.
There are several problems on frontend and backend.

Frontend:
1. I use `useState` and `useEffect` to hendle fetched data.
This is my code:
```jsx
const [item, setItems] = useState()

    useEffect(() => {
        fetch('http://localhost:61780/')
            .then((res) => res.json())
            .then((data) => {
                setItems(data)
            })
    }, []);
```

2. While reading the json data, do like this: `<level 1>?.<level 2>?.<level 3>`.

**DON'T DO THIS:** `<level 1>.<level 2>.<level 3>`. This will throw out an exception: `Cannot read ... from type 'undefined'`

Example code: 
```jsx
import React, {useEffect, useState} from 'react';
import './extraUI.css'


function App() {
    const [item, setItems] = useState()

    useEffect(() => {
        fetch('http://localhost:61780/')
            .then((res) => res.json())
            .then((data) => {
                setItems(data)
            })
    }, []);
    console.warn(item)

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
```
Json data:
```json
{
  "question": {
    "title": "Question",
    "create_by": "AZ",
    "time": 1661394765044,
    "detail": "<h4>info</h4>"
  },
  "answers": [
    {
      "create_by": "baa",
      "time": 1661394765044,
      "detail": "<h4>abc</h4>"
    }
  ]
}
```

Backend: 
1. You need to add a header in your server responce: `Access-Control-Allow-Origin`, and it's value is your api url(or you can use `*` if your api is a public one)
It's like this: `Access-Control-Allow-Origin: <url or *>`

If you don't do this, it will throw out an exception: `CORS header 'Access-Control-Allow-Origin' missing`. I'm not sure if other js is like this.

***
## This is my question below:


I am trying to use React to extract a JSON data from my server and render it with two functions. But it seems that the two render functions cannot read the values in the json correctly.
I'm sure that my data server is working correctly.

Error log:
```
Unhandled Runtime Error
Uncaught TypeError: Cannot read properties of undefined (reading 'title')

Source
http://localhost:8080/dist/App.js [:19:68]
TypeError: Cannot read properties of undefined (reading 'title')
    at Question (http://localhost:8080/dist/App.js:19:68)
    at renderWithHooks (http://localhost:8080/_snowpack/pkg/react-dom.v18.2.0.js:16313:18)
    at mountIndeterminateComponent (http://localhost:8080/_snowpack/pkg/react-dom.v18.2.0.js:20077:13)
    at beginWork (http://localhost:8080/_snowpack/pkg/react-dom.v18.2.0.js:21590:16)
    at beginWork$1 (http://localhost:8080/_snowpack/pkg/react-dom.v18.2.0.js:27414:14)
    at performUnitOfWork (http://localhost:8080/_snowpack/pkg/react-dom.v18.2.0.js:26548:12)
    at workLoopSync (http://localhost:8080/_snowpack/pkg/react-dom.v18.2.0.js:26454:5)
    at renderRootSync (http://localhost:8080/_snowpack/pkg/react-dom.v18.2.0.js:26422:7)
    at performSyncWorkOnRoot (http://localhost:8080/_snowpack/pkg/react-dom.v18.2.0.js:26074:20)
    at flushSyncCallbacks (http://localhost:8080/_snowpack/pkg/react-dom.v18.2.0.js:12050:22)
```

App component:
```react
let prop

function App() {
    const [item, setItems] = useState([])

    useEffect(() => {
        fetch('http://localhost:9090/')
            .then((res) => res.json())
            .then((resJson) => {
                const data = JSON.parse(resJson)
                setItems(data)
            })
    }, [])
    prop = item
    return (
        <div>
            <Question/>
            <hr/>
        </div>
    )
}
```
Question component:
```react
function Question() {
    return (
        <div className={"question"}>
            <h1>{ prop.question.title }</h1>
            <p className={"info"}>Created by user: { prop.question.create_by }</p><br/>
            <p className={"info"}>On { Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(prop.question.time)) }</p><br/>
            <hr/>
            <div dangerouslySetInnerHTML={{__html: prop.question.detail}}></div>
        </div>
    )
}

export default App;
```

The JSON data:
```json
{
  "question": {
    "title": "Question",
    "create_by": "AZ",
    "time": 1661394765044,
    "detail": "<h4>info</h4>"
  },
  "answers": [
    {
      "create_by": "baa",
      "time": 1661394765044,
      "detail": "<h4>abc</h4>"
    }
  ]
}
```
