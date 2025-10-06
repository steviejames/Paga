"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react"
import { clients } from "@/lib/mock-data"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function RecentClients() {

  return (
    <Card className="rounded-3xl border-0 p-6 shadow-sm">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Clientes recentes</h3>
          <div className="flex items-center gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Clients */}
        <div className="grid gap-4 md:grid-cols-2">
          {clients.map((client) => (
             <div key={client.id} className="flex items-center justify-between rounded-2xl bg-muted/50 p-4">
             <div className="flex items-center gap-3">
               <Avatar className="h-10 w-10">
                 <AvatarImage src={client.avatar || "/placeholder.svg"} />
                 <AvatarFallback>{client.name}</AvatarFallback>
               </Avatar>
               <div>
                 <div className="font-medium">{client.name}</div>
                 <div className="text-sm text-muted-foreground">{client.email}</div>
               </div>
             </div>
           
             <DropdownMenu >
               <DropdownMenuTrigger asChild>
                 <button className="ml-2 text-muted-foreground transition-colors hover:text-foreground">
                   <MoreVertical className="h-5 w-5" />
                 </button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end" >
                 <DropdownMenuItem asChild>
                   <Link href={`/clients/${client.id}`}>Ver detalhes</Link>
                 </DropdownMenuItem>
                 <DropdownMenuItem>Editar</DropdownMenuItem>
                 <DropdownMenuItem className="text-destructive">Apagar</DropdownMenuItem>
               </DropdownMenuContent>
             </DropdownMenu>
           </div>
          ))}
        </div>

     
      </div>
    </Card>
  )
}
