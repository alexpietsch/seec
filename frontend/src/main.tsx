import "./index.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {
	createBrowserRouter,
	RouterProvider,
	useNavigate,
} from "react-router-dom"
import React from "react"
import { ViewSecret } from "./pages/viewSecret/ViewSecret"
import { Button } from "@/components/ui/button"
import ViewSecretRedirect from "@/pages/viewSecret/ViewSecretRedirect"
import App from "@/App"
import "@/i18n/config"
import EncryptSecret from "@/pages/home/EncryptSecret"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <EncryptSecret />,
			},
			{
				path: "/secret",
				element: <ViewSecretRedirect />,
			},
			{
				path: "/secret/:secretId",
				element: <ViewSecret />,
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
])

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<div className="w-screen">
			<RouterProvider router={router} />
		</div>
	</StrictMode>,
)

function NotFound() {
	const navigate = useNavigate()
	return (
		<div className="h-screen flex justify-center items-center flex-col">
			<p className="text-3xl mb-3">404 - Not Found</p>
			<Button onClick={() => navigate("/")}>Home</Button>
		</div>
	)
}
