"use client"

import Link from "next/link"
import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon | React.ComponentType
  }[]
}) {
  const { isMobile, setOpenMobile } = useSidebar()

  const handleClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isExternalLink = item.url.startsWith('http')
            const Icon = item.icon
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} asChild>
                  {isExternalLink ? (
                    <a 
                      href={item.url} 
                      onClick={handleClick}
                    >
                      {Icon && <Icon />}
                      <span>{item.title}</span>
                    </a>
                  ) : (
                    <Link href={item.url} onClick={handleClick}>
                      {Icon && <Icon />}
                      <span>{item.title}</span>
                    </Link>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

