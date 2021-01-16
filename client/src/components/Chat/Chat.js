import React ,{useState,useEffect}from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../InfoBar/InfoBar.js'
import Input from '../Input/Input.js';
import './Chat.css';
import Messages from '../Messages/Messages.js';

var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};


let socket;
const ENDPOINT='localhost:5000';
const Chat = ({location}) => {
    const [name,setName] =useState('');
    const [room,setRoom]=useState('');
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);


    useEffect(()=>{
        const {name,room}=queryString.parse(location.search);
        socket=io(ENDPOINT,connectionOptions);
        setName(name);
        setRoom(room);
        socket.emit('join',{name,room},()=>{
            

        });
        return ()=>{
            socket.emit('disconnect');

            socket.off();
        }
    },[ENDPOINT,location.search]);

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message]);
        })
    },[messages]);

    const sendMessage=(event)=>{
        event.preventDefault();
        if(message){
            console.log(message+"heyyyyyyyy YYYYYYY");
            socket.emit('sendMessage',message,()=>setMessage(''));
        }
        console.log(messages);
    }
    console.log(message,messages);

    return (
        <div className="outerContainer">
        <div className="container">
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        {/* <TextContainer users={users}/> */}
      </div>
    )
}

export default Chat;
