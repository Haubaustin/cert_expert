import { useState, useEffect } from "react"
import {  useParams } from "react-router-dom"
import Client from "./api/api.jsx"


const Resources = () => {
//***Hooks***
    const { id } = useParams()
    const [ show, setShow ] =useState(false)
    const [ update, setUpdate ] = useState({
        displayName: ''
    })
    const [rec, setRec] = useState([])
    const [data, setData] = useState({
        displayName: "",
        url: "",
    })

//***Global***

const getStudyResults = async () => {
    const study = await Client.get(`/api/posts/${id}`)
    setRec(study.data.rec)
}

useEffect(()=> {
    getStudyResults()
},[])

//***Data Updates***
const handleDataInput = (e) => {
    const value = e.target.value
    setData({
        ...data,
        [e.target.name]: value
    })
}
const handleDataUpdate = (e) => {
    const value = e.target.value
    setUpdate({
      ...update,
      displayName: value  
    })
}

//***API Calls on Click***
const handleSubmit = (e) => {
    e.preventDefault()
    const study = {
        displayName: data.displayName,
        url: data.url
    }
    Client.post(`/api/post/${id}`, study)
        .then((response) => {
        console.log(response.status)
        console.log(response.data)
        getStudyResults()
      })
}

const handleDelete = async (e) => {
    const alert = prompt("Are you sure you would like to delete this study resource?\r\nType 'delete' below to continue.")
        if (alert == "delete") {
    const name = e.target.name
    await Client.delete(`/post/${name}`, name)
        .then((response) => {
        console.log(response.status);
        console.log(response.data);
        getStudyResults()
      })
    }
}

const handleUpdate = async (e) => {
    const studyName = e.target.name
        await Client.post(`/api/updatepost/${studyName}`, update)
        .then((response) => {
        console.log(response.status);
        console.log(response.data);
      })
}

    return (
        <div className="Resources">
            <ul className="recList">
                {rec.map((result) => (
                    <li key={result._id}>
                        <a href={result.url}  
                            target="_blank" 
                            rel="noreferrer">
                                {result.displayName}
                        </a>
                        <button 
                            className="editButton" 
                            onClick={()=> setShow((s) => !s)}>
                                [edit]
                        </button>
                        <div 
                            style={{ display : show ? 'block' : 'none'}} 
                            className="editForm">
                            <form>
                                <input type="text" 
                                    placeholder={result.displayName}
                                    onChange={handleDataUpdate}/>
                                    <button 
                                        type="submit" 
                                        name={result.displayName} 
                                        onClick={handleUpdate}>
                                            Update
                                    </button>
                            </form>
                            <button 
                                name={result.displayName} 
                                onClick={handleDelete} 
                                className="delButton">
                                    Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="newStudy">
            <h4 className="newStudyTitle">Post a study resource</h4>
            <form onSubmit={handleSubmit} >
                <input 
                    type="text"
                    name="displayName"
                    placeholder="Display Name"
                    value={data.displayName}
                    onChange={handleDataInput}
                    className="input"
                />
                <input 
                    type="url"
                    name="url"
                    placeholder="URL eg http://123.com"
                    value={data.url}
                    onChange={handleDataInput}
                    className="input"
                />
                <br></br>
                <button 
                    className="inputButton" 
                    type="submit">
                        Post
                </button>
            </form>
            </div>
        </div>
    )
}

export default Resources