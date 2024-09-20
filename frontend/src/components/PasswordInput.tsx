import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { t } from "i18next"
import React, { useState } from "react"
import { ControllerRenderProps, FieldValues } from "react-hook-form"

function PasswordInput({
	field,
	withShowButton,
}: {
	field:
		| ControllerRenderProps<
				{
					secret?: string
					password?: string
					confirmPassword?: string
				},
				"password"
		  >
		| ControllerRenderProps<
				{
					secret?: string
					password?: string
					confirmPassword?: string
				},
				"confirmPassword"
		  >
	withShowButton: boolean
}) {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<div className="flex space-x-2 w-full">
			<Input {...field} type={showPassword ? "text" : "password"} />
			{withShowButton && (
				<Button
					className="w-1/5 pl-3"
					type="button"
					onClick={() => setShowPassword(!showPassword)}
				>
					{showPassword
						? t("encryptSecret.hidePassword")
						: t("encryptSecret.showPassword")}
				</Button>
			)}
		</div>
	)
}

export default PasswordInput
