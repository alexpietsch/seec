import React from "react"
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { t } from "i18next"

export function Navbar() {
	const navigate = useNavigate()
	return (
		<div className="flex items-center w-screen h-20 backdrop-blur-md bg-white/30 shadow-sm">
			<NavigationMenu className="p-2 pl-5">
				<NavigationMenuList className="space-x-4">
					<NavigationMenuItem>
						<Button
							onClick={() => navigate("/")}
							variant="outlineDark"
						>
							{t("navbar.home")}
						</Button>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Button
							onClick={() => navigate("/secret")}
							variant="outlineDark"
						>
							{t("navbar.openSecret")}
						</Button>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	)
}
