import { Calendar, Home, Inbox, Search } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: Inbox,
  },
  {
    title: "Customers",
    url: "/admin/costomers",
    icon: Calendar,
  },
  {
    title: "Transactions",
    url: "/admin/transactions",
    icon: Search,
  },
]

const charts = [
  {
    title: "Bar chart",
    url: "/admin/barchart",
    icon: Home,
  },
  {
    title: "Pie chart",
    url: "/admin/pie",
    icon: Inbox,
  },
  {
    title: "Line chart",
    url: "/admin/line",
    icon: Calendar,
  },
]

export function AppSidebar() {
  return (
    <Sidebar  className="mt-20 bg-gray-900 text-white absolute  ">
      <SidebarContent className="bg-gray-900 ">
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-500 font-semibold text-lg mb-4">Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className=" rounded-md">
                  <SidebarMenuButton asChild className="hover:bg-black">
                    <a href={item.url} className="flex items-center space-x-4 py-2 px-4 text-sm font-medium hover:text-white">
                      <item.icon className="text-blue-400" />
                      <span className="text-base ">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupLabel className="text-blue-500 font-semibold text-lg mt-6 mb-4">Charts</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {charts.map((item) => (
                <SidebarMenuItem key={item.title} className="hover:bg-blue-600 rounded-md">
                  <SidebarMenuButton asChild className="hover:bg-black"> 
                    <a href={item.url} className="flex items-center space-x-4 py-2 px-4 text-sm font-medium hover:text-white">
                      <item.icon className="text-blue-400" />
                      <span className="text-base">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
