import React, { useState } from "react"
import { Inbox } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { t } from "i18next"

const formSchema = z.object({
	secretId: z.string(),
})

type SearchFormSchema = z.infer<typeof formSchema>

function ViewSecretRedirect() {
	const [secretId, setSecretId] = useState("")
	const navigate = useNavigate()

	const form = useForm<SearchFormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			secretId: "",
		},
	})

	const onSubmit = async (values: SearchFormSchema) => {
		navigate("/secret/" + values.secretId)
		return
	}

	return (
		<div className="m-3">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className=" space-y-3"
				>
					<FormField
						control={form.control}
						name="secretId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									<p className="text-xl">{t("secretId")}</p>
								</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="p-2">
						{t("open")}
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default ViewSecretRedirect
