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
    title: "DashBoard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: Inbox,
  },
  {
    title: "Costomer",
    url: "/admin/costomer",
    icon: Calendar,
  },
  {
    title: "Transaction",
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
    title: "Pie",
    url: "/admin/pie",
    icon: Inbox,
  },
  {
    title: "Line",
    url: "/admin/line",
    icon: Calendar,
  },
  
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>


          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>


          <SidebarGroupLabel>Charts</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {charts.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
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
