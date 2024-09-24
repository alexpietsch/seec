import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { t } from "i18next"
import React, { useState } from "react"
import { ControllerRenderProps, FieldValues } from "react-hook-form"
import { hideIcon, showIcon } from "@/assets/icons"

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
					className="w-fit p-2"
					type="button"
					variant="outlineDark"
					onClick={() => setShowPassword(!showPassword)}
				>
					{showPassword ? (
						<img
							src={hideIcon.url}
							alt={t(hideIcon.alt)}
							width="32px"
						/>
					) : (
						<img
							src={showIcon.url}
							alt={t(showIcon.alt)}
							width="32px"
						/>
					)}
				</Button>
			)}
		</div>
	)
}

export default PasswordInput
