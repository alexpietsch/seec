import { Navbar } from "@/components/Navbar"
import React from "react"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"

function App() {
	return (
		<>
			<Navbar />
			<Outlet />
			<Toaster />
		</>
	)
}

export default App
