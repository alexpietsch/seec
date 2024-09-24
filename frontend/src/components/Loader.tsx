import React from "react"

function Loader() {
	return (
		<div className="w-screen h-fit">
			<img
				// @ts-ignore error ts(1343)
				src={new URL("../assets/loader.svg", import.meta.url).href}
				alt="Loading..."
				width="32px"
				height="auto"
			/>
		</div>
	)
}

export default Loader
