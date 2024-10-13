type DefaultErrorResponse = {
	http_code: number
	error_message: string
	error_code: number
}

type DefaultThrowableProblem = {
	type: string
	title: string
	status: number
	detail: string
	errorCode: number
}

async function isDefaultThrowableProblemResponse(response: Response) {
	const data = await response.clone().json()
	return (
		data &&
		typeof data === "object" &&
		"type" in data &&
		"title" in data &&
		"status" in data &&
		"detail" in data &&
		"errorCode" in data
	)
}

async function isDefaultErrorResponse(response: Response) {
	const data = await response.clone().json()
	return (
		data &&
		typeof data === "object" &&
		"http_code" in data &&
		"error_message" in data &&
		"error_code" in data
	)
}

async function getErrorMessage(response: Response) {
	const data = await response.clone().json()
	if (await isDefaultThrowableProblemResponse(response)) {
		const errorResponse = data as DefaultThrowableProblem
		return `${errorResponse.title} - ${errorResponse.detail} (Error code ${errorResponse.errorCode})`
	}
	if (await isDefaultErrorResponse(response)) {
		const errorResponse = data as DefaultErrorResponse
		return `${errorResponse.http_code} - ${errorResponse.error_message} (Error code ${errorResponse.error_code})`
	}
	return response.statusText && response.statusText != ""
		? response.statusText
		: "An unknown error occurred"
}

export { getErrorMessage }
