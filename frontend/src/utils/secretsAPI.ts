import { SecretHandler } from "./SecretHandler"
import { Simulate } from "react-dom/test-utils"
import encrypted = Simulate.encrypted
import { SEEC_API_URL } from "@utils/constants"

export type SecretAPIMessage = {
	secret: string
	iv: string
	auto_expire_at: string
}

const secretHandler = new SecretHandler()

async function postSecret(secret: string, password: string): Promise<Response> {
	const encryptedSecret = await secretHandler.encrypt(secret, password)
	return await postSecretRaw({
		secret: encryptedSecret.secret,
		iv: encryptedSecret.iv,
		auto_expire_at: new Date().toISOString(),
	})
}

async function getSecret(id: string): Promise<Response> {
	return await getSecretRaw(id)
}

async function postSecretRaw(
	secretAPIRequest: SecretAPIMessage,
): Promise<Response> {
	// @ts-ignore
	return fetch(`${SEEC_API_URL}/secret`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(secretAPIRequest),
	})
}

async function getSecretRaw(id: string): Promise<Response> {
	// @ts-ignore
	return fetch(`${SEEC_API_URL}/secret/${id}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
}

export { postSecret, getSecret }
