import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getSecret} from "../../utils/secretsAPI";
import {SecretAPIMessage} from "../../utils/secretsAPI";
import {SecretHandler} from "../../utils/SecretHandler";

export function ViewSecret() {
    let { secretId } = useParams();
    const [secret, setSecret] = useState<SecretAPIMessage>(null);
    const [password, setPassword] = useState<string>('');
    const [decryptedSecretMessage, setDecryptedSecretMessage] = useState<string>(null);
    const secretHandler = new SecretHandler();

    if(!secretId) {
        return <div>Invalid Secret ID</div>
    }

    async function fetchSecret() {
        const secret = await getSecret(secretId);
        console.log(secret);
        if(secret) {
            setSecret(secret);
        }
    }

    useEffect(() => {
        fetchSecret();
    }, [])

    async function decryptSecret() {
        if(!secret || !password) {
            return;
        }
        await secretHandler.decrypt(secret.secret, password, secret.iv).then(secret => setDecryptedSecretMessage(secret));
    }

    return (
        <div>
            <input type="password" onChange={e => setPassword(e.target.value)} value={password}/>
            <h1>View Secret </h1>
            <button onClick={decryptSecret}>Decrypt</button>
            {decryptedSecretMessage && <textarea value={decryptedSecretMessage} readOnly={true} rows={15} cols={150}/>}
        </div>
    )
}