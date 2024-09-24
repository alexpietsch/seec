type DefaultErrorResponse = {
	type: string
	title: string
	status: number
	detail: string
	errorCode: number
}

async function isDefaultError(response: Response) {
	const data = await response.clone().json()
	if (
		data &&
		"type" in data &&
		data.type.startsWith("https://api.alexpts.dev/problem")
	) {
		return true
	}
	return false
}

async function getErrorMessage(response: Response) {
	const data = await response.clone().json()
	if (isDefaultError(response)) {
		const errorResponse = data as DefaultErrorResponse
		return `${errorResponse.title} - ${errorResponse.detail} (Error code ${errorResponse.errorCode})`
	}
	return response.statusText && response.statusText != ""
		? response.statusText
		: "An unknown error occurred"
}

export { getErrorMessage }
