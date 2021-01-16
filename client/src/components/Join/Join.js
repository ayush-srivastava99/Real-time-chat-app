import React, {useState} from 'react'

import {Link} from 'react-router-dom';

import './Join.css'

const Join = () => {
    const [name,setName] =useState('');
    const [room,setRoom]=useState('');


    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="name" className="joinInput" type="text" onChange={(e)=>setName(e.target.value)} /></div>
                <div><input placeholder="room" className="joinInput" type="text" onChange={(e)=>setRoom(e.target.value)} /></div>
                <Link onClick={event=> (!name||!room)?event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
                <button className="button nt-20" type="submit">Join</button>
                </Link>
            </div>
        </div>
    )
}

export default Join
