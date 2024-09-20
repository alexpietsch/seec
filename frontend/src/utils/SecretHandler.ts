import { Buffer } from "buffer"

class SecretHandler {
	/*
    Ref: https://github.com/vercel/examples/blob/main/edge-middleware/crypto/pages/api/crypto.ts
     */

	ALGORITHM = "AES-GCM"

	async encrypt(
		secret: string,
		password: string,
	): Promise<{ secret: string; iv: string }> {
		if (!("crypto" in window)) {
			throw new Error("Crypto is not supported")
		}
		const enc = new TextEncoder()

		const passwordHash = await crypto.subtle.digest(
			"SHA-256",
			enc.encode(password),
		)
		const encodedSecret = enc.encode(secret)

		const encryptKey = await crypto.subtle.importKey(
			"raw",
			passwordHash,
			{
				name: this.ALGORITHM,
				length: 256,
			},
			false,
			["encrypt"],
		)

		const iv = crypto.getRandomValues(new Uint8Array(12))

		const encryptedSecret = await window.crypto.subtle.encrypt(
			{
				name: this.ALGORITHM,
				iv,
			},
			encryptKey,
			encodedSecret,
		)

		return {
			secret: Buffer.from(encryptedSecret).toString("base64"),
			iv: Buffer.from(iv).toString("base64"),
		}
	}

	async decrypt(
		secret: string,
		password: string,
		iv: string,
	): Promise<{ success: boolean; secret: string | null }> {
		if (!("crypto" in window)) {
			throw new Error("Crypto is not supported")
		}
		const dec = new TextDecoder()
		const enc = new TextEncoder()

		try {
			const passwordHash = await crypto.subtle.digest(
				"SHA-256",
				enc.encode(password),
			)
			const secretBuffer = Buffer.from(secret, "base64")
			const secret_iv = Buffer.from(iv, "base64")

			const decryptKey = await crypto.subtle.importKey(
				"raw",
				passwordHash,
				{
					name: this.ALGORITHM,
					length: 256,
				},
				false,
				["decrypt"],
			)

			const decryptedSecret = await window.crypto.subtle.decrypt(
				{
					name: this.ALGORITHM,
					iv: secret_iv,
				},
				decryptKey,
				secretBuffer,
			)

			return {
				success: true,
				secret: dec.decode(decryptedSecret),
			}
		} catch (error) {
			return {
				success: false,
				secret: null,
			}
		}
	}
}

export { SecretHandler }
