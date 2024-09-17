import {HTMLInputTypeAttribute, useState} from 'react'

import './App.css'
import {SecretHandler} from "../../utils/SecretHandler";
import React from 'react';
import {getSecret, postSecret} from "../../utils/secretsAPI";

function Home() {

    const [secret, setSecret] = useState('my secret')
    const [password, setPassword] = useState('1234')
    const [encrypted, setEncrypted] = useState('')
    const [iv, setIv] = useState('')

    const [savedSecretId, setSavedSecretId] = useState('')

    const [viewPassword, setViewPassword] = useState(false)

    const s = new SecretHandler();


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <h2>Your secret:</h2>
            <textarea onChange={e => setSecret(e.target.value)} value={secret}/>
            <h2>Password to encrypt the secret with:</h2>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <input type={viewPassword ? "text" : "password"} onChange={e => setPassword(e.target.value)}
                       value={password}/>
                <button onClick={() => {
                    setViewPassword(!viewPassword)
                }}>View</button>
            </div>
            <button onClick={async () => {
                let res = await postSecret(secret, password)
                setSavedSecretId(res.id)

            }}>enc</button>
            {savedSecretId && <div>Saved secret with id: {savedSecretId}</div>}
            {savedSecretId && <div>Share your secret via this link: {window.location.href + "secret/" + savedSecretId}</div>}
        </div>
    )
}

export default Home
