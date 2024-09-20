import React from "react"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { t } from "i18next"

const navElementHoverStyle = "hover:border-gray-700 hover:bg-gray-700"
const navElementStyle =
	"text-white border-2 border-gray-900 bg-gray-900 rounded p-2" +
	" " +
	navElementHoverStyle

export function Navbar() {
	const navigate = useNavigate()
	return (
		<div className="flex items-center w-screen h-20 border-b-2 border-gray-300">
			<NavigationMenu className="p-2 pl-5">
				<NavigationMenuList className="space-x-4">
					<NavigationMenuItem>
						<Button onClick={() => navigate("/")}>
							{t("navbar.home")}
						</Button>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Button onClick={() => navigate("/secret")}>
							{t("navbar.openSecret")}
						</Button>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	)
}
