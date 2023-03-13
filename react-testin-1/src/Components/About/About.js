import React, { useEffect, useState } from 'react';
import { ToastBody, ToastContainer, ToastHeader } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';


const About = () => {
    const [chat, setChat] = useState([]);
    const [userInput, setuserInput] = useState('');

    const ChatResponse = (messageTxt) =>{
        fetch("https://api.openai.com/v1/chat/completions",{
            "method":"POST",
            "headers":{
                "Content-Type":"application/json",
                "Authorization":"Bearer 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"
            },
            "body": JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "user", 
                        "content": messageTxt
                    }
                ]
            })
        })
        .then(response => response.json())
        .then(response =>{
            let respChoices=response?.choices?.[0];
            let val=respChoices.message.content;
            let role=respChoices.message.role;
            AddChat(val, '', role);
        })
        .catch(err => {
            console.log(err);
        });
    }


    const AddChat = (val, changetxt, _role) => {
        let chatList=chat;
        chatList.push({txt: val, role: _role});
        setChat(chatList);
        setuserInput(changetxt); 
    }

    const SendMessages = (val) =>{
        AddChat(val, ' ', 'You');
        ChatResponse(val);
    }

    const ShowChat = () => {
        return chat.map((msg, index) =>{
            return (
                <>  
                    <Toast bg={msg.role.toLowerCase()==="you" ? "info" : "success" } position='middle-end'>
                        <ToastHeader closeButton={false} >
                            <strong className='me-auto'>{msg.role}</strong>
                        </ToastHeader>
                        <ToastBody>{msg.txt}</ToastBody>
                    </Toast>
                </>
                
            );
        })

    }

    return (
        <div className='row container mr-0'>
            <div className='col-md-4'></div>
            <div className='col-md-8'>
                <h1>Demo Chat Application</h1>
                <div className='row'>
                    <div className='col-md-8' style={{overflowY:"scroll", height:"70vh", position:"absolute", display:"flex", flexDirection:"column-reverse"}}>
                        <ToastContainer>
                            {ShowChat()}
                        </ToastContainer>
                    </div>
                </div>
                <div className='row mb-5' style={{position : "fixed", bottom : "0px", width: "100%"}}>
                    <div className='col-md-6'>
                        <input type="text" className='form-control' value={userInput} onChange={(e) => setuserInput(e.target.value)} />
                    </div>
                    <div className='col-md-4'>
                        <button type='button' className='btn btn-success' onClick={() => SendMessages(userInput)}>Send</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default About;