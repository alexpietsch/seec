import {SecretHandler} from "./SecretHandler";
import {Simulate} from "react-dom/test-utils";
import encrypted = Simulate.encrypted;

export type SecretAPIMessage = {
    secret: string,
    iv: string
    auto_expire: string
}

const secretHandler = new SecretHandler();

async function postSecret(secret: string, password: string) {
    const encryptedSecret = await secretHandler.encrypt(secret, password);
    const response = await postSecretRaw({
        secret: encryptedSecret.secret,
        iv: encryptedSecret.iv,
        auto_expire: null
    });

    return await response.json();
}

async function getSecret(id: string): Promise<SecretAPIMessage> {
    // @ts-ignore
    const response = await getSecretRaw(id);
    return await response.json();
}

async function postSecretRaw(secretAPIRequest: SecretAPIMessage): Promise<Response> {
    // @ts-ignore
    return fetch(`${import.meta.env.VITE_SECRETS_API}/secret`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(secretAPIRequest)
    });
}

async function getSecretRaw(id: string): Promise<Response> {
    // @ts-ignore
    return fetch(`${import.meta.env.VITE_SECRETS_API}/secret/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export {
    postSecret,
    getSecret
}