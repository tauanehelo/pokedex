import React from "react"
import { useState, useEffect } from 'react'
import axios from 'axios'
import './cardstyle.css'

function Card(props) {
    const [info, setInfo] = useState()

    useEffect(() => {
        async function getIinfo() {
          const response = await axios.get(props.link)
          setInfo(response.data)
        }
        getIinfo()
    }, [props])
    useEffect(() => {
        console.log(info)
    },[info])
    
    
    return(
        <div className="card" id={info?.types[0].type.name} >
            <div className="texto">
                <h2>{props.nome}</h2>
                {info? info.types.map((tipo) => {
                    return (<li key={tipo.slot} id="tipo" className={tipo.type.name}>
                        {tipo.type.name}
                    </li>)
                }) : <p>...</p> }
            </div>
            <div>
                <img src={info?.sprites.front_default}/>
            </div>
        </div>
    )
}

export default Card