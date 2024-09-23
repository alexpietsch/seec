import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { postSecret } from "@utils/secretsAPI"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { getErrorMessage } from "@utils/handleDefaultErrorResponse"
import { t } from "i18next"
import PasswordInput from "@/components/PasswordInput"
import { Simulate } from "react-dom/test-utils"
import reset = Simulate.reset

const MAX_SECRET_LENGTH = 5000

function EncryptSecret() {
	const [savedSecretId, setSavedSecretId] = useState("")

	const { toast } = useToast()

	const formSchema = z
		.object({
			secret: z.string().max(MAX_SECRET_LENGTH, {
				message: t("errors.secretTooLong", {
					maxLen: MAX_SECRET_LENGTH,
				}),
			}),
			password: z.string().min(8, {
				message: t("errors.passwordTooShort"),
			}),
			confirmPassword: z.string().min(8, {
				message: t("errors.passwordTooShort"),
			}),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: t("errors.passwordsDontMatch"),
			path: ["confirmPassword"],
		})

	type SecretFormSchema = z.infer<typeof formSchema>

	const form = useForm<SecretFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			secret: "",
			password: "",
			confirmPassword: "",
		},
	})

	const { watch, reset } = form

	const postSecretAction = async (values: SecretFormSchema) => {
		if (values.password !== values.confirmPassword) {
			return
		}
		const response = await postSecret(values.secret, values.password)

		if (!response.ok) {
			toast({
				duration: 500000,
				variant: "destructive",
				title: "Error",
				description: await getErrorMessage(response),
				action: (
					<ToastAction
						altText="Retry"
						onClick={() => postSecretAction(values)}
					>
						{t("errors.toast.retry")}
					</ToastAction>
				),
			})
			return
		}
		const data = await response.json()
		setSavedSecretId(data.id)
	}

	const onSubmit = async (values: SecretFormSchema) => {
		if (values.password !== values.confirmPassword) {
			return
		}
		console.log(values)
		// TODO: Error handling
		const res = await postSecretAction(values)
	}

	return (
		<div className="flex justify-center w-full mt-3">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-2/3 space-y-3"
				>
					<FormField
						control={form.control}
						name="secret"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									<p className="text-xl">
										{t("encryptSecret.secretInputTitle")}
									</p>
								</FormLabel>
								<FormControl>
									<>
										<Textarea
											{...field}
											className="resize-none"
											rows={15}
											maxLength={MAX_SECRET_LENGTH}
										/>
										{(watch("secret")
											? watch("secret").length
											: "0") + `/${MAX_SECRET_LENGTH}`}
									</>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex items-end">
						<div className="w-4/5">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											<p className="text-xl">
												{t(
													"encryptSecret.passwordInputTitle",
												)}
											</p>
										</FormLabel>
										<FormControl>
											<PasswordInput
												field={field}
												withShowButton={true}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											<p className="text-xl">
												{t(
													"encryptSecret.confirmPasswordInputTitle",
												)}
											</p>
										</FormLabel>
										<FormControl>
											<PasswordInput
												field={field}
												withShowButton={false}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<Button type="submit" className="p-2">
						{t("submit")}
					</Button>
				</form>
			</Form>

			<Dialog
				open={savedSecretId != ""}
				onOpenChange={(b) => {
					if (b === false) {
						setSavedSecretId("")
						reset()
					}
				}}
				modal={true}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{t("secretSavedDialog.shareYourSecret")}
						</DialogTitle>
						<DialogDescription>
							{t("secretSavedDialog.savedSecretId")}{" "}
							<b>{savedSecretId}</b>
							<br />
							{t("secretSavedDialog.shareLink")}
							<br />
							<b>
								{window.location.href +
									"secret/" +
									savedSecretId}
							</b>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default EncryptSecret
