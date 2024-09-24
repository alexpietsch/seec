import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSecret } from "@utils/secretsAPI"
import { SecretAPIMessage } from "@utils/secretsAPI"
import { SecretHandler } from "@utils/SecretHandler"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { t } from "i18next"
import Loader from "@/components/Loader"
import { getErrorMessage } from "@/utils/handleDefaultErrorResponse"
import { useToast } from "@/hooks/use-toast"

export function ViewSecret() {
	let { secretId } = useParams()
	const [secret, setSecret] = useState<SecretAPIMessage>(null)
	const [password, setPassword] = useState<string>("")
	const [decryptedSecretMessage, setDecryptedSecretMessage] =
		useState<string>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")
	const { toast } = useToast()
	const secretHandler = new SecretHandler()

	if (!secretId) {
		return <div>Invalid Secret ID</div>
	}

	async function fetchSecret() {
		const response = await getSecret(secretId)

		if (response && !response.ok) {
			if (response.status === 404) {
				setLoading(false)
				toast({
					duration: 30000,
					variant: "destructive",
					title: t("errors.couldNotFindSecret"),
					description: await getErrorMessage(response),
				})
				setError(" ")
				return
			}
			setLoading(false)
			setError("Failed to fetch secret")
			return
		}

		if (response && response.status === 200) {
			setSecret(await response.json())
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchSecret()
	}, [])

	async function decryptSecret() {
		if (!secret || !password) {
			return
		}
		await secretHandler
			.decrypt(secret.secret, password, secret.iv)
			.then((secretResponse) => {
				if (secretResponse.success) {
					setError("")
					setDecryptedSecretMessage(secretResponse.secret)
				} else {
					toast({
						duration: 30000,
						variant: "destructive",
						title: t("errors.failedToDecryptSecret"),
						description: t("errors.incorrectPassword"),
					})
				}
			})
	}

	return (
		<div className="m-3 space-y-2">
			{loading && <Loader />}
			{error && <div className="text-red-500 font-bold">{error}</div>}
			{!loading && !error && (
				<>
					<p>{t("decryptSecret.passwordInputTitle")}</p>
					<Input
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
					<Button onClick={decryptSecret}>
						{t("decryptSecret.decrypt")}
					</Button>
					{decryptedSecretMessage && (
						<>
							<p className="text-xl">{t("secret")}:</p>
							<Textarea
								value={decryptedSecretMessage}
								readOnly={true}
								rows={15}
							/>
						</>
					)}
				</>
			)}
		</div>
	)
}
