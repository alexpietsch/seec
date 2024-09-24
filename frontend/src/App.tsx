import { Navbar } from "@/components/Navbar"
import React from "react"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"

function App() {
	return (
		<div className="pb-3">
			<Navbar />
			<Outlet />
			<Toaster />
		</div>
	)
}

export default App
