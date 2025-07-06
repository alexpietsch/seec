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
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { postSecret } from "@utils/secretsAPI"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { getErrorMessage } from "@utils/handleDefaultErrorResponse"
import { t } from "i18next"
import PasswordInput from "@/components/PasswordInput"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EXPIRE_DURATION, EXPIRE_DURATION_TYPE, EXPIRE_DURATIONS, EXPIRE_MAX, EXPIRE_MIN } from "@/utils/constants"
import { Input } from "@/components/ui/input"
import calcExpireDate from "@/utils/calcExpireDate"

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
			expireAtAmount: z.string()
				.transform((val) => Number(val))
				.pipe(z.number().min(EXPIRE_MIN).max(EXPIRE_MAX))
				.or(z.literal("").transform(() => null)),
			expireAtDuration: z.enum(EXPIRE_DURATION),
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
			expireAtDuration: null,
			expireAtAmount: null
		},
	})

	const { watch, reset } = form

	const postSecretAction = async (values: SecretFormSchema) => {
		if (values.password !== values.confirmPassword) {
			return
		}
		const response = await postSecret(values.secret, values.password, calcExpireDate(values.expireAtDuration, values.expireAtAmount))

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
									<div>
										<Textarea
											{...field}
											className="resize-none"
											rows={15}
											maxLength={MAX_SECRET_LENGTH}
										/>
										{`${watch("secret")
											? watch("secret").length
											: "0"}/${MAX_SECRET_LENGTH}`}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="space-y-3 w-4/5">
						<FormLabel>
							<p className="text-xl">{t('encryptSecret.autoExpireAt')}</p>
						</FormLabel>
						<div className="flex gap-3 items-start">
							<FormField
								control={form.control}
								name="expireAtAmount"
								render={({ field }) => (
									<FormItem className="w-24">
										<FormControl>
											<Input
												{...field}
												type="number"
												min={EXPIRE_MIN}
												max={EXPIRE_MAX}
												placeholder="1"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="expireAtDuration"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormControl>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<SelectTrigger>
													<SelectValue placeholder="Zeitraum wählen" />
												</SelectTrigger>
												<SelectContent>
													{EXPIRE_DURATIONS.map((expireDuration) => (
														<SelectItem key={expireDuration.duration} value={expireDuration.duration}>
															{t(expireDuration.name)}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>


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
				open={savedSecretId !== ""}
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
		</div >
	)
}

export default EncryptSecret
