"use client";

import type React from "react";

import { DashboardHeader } from "@/components/dashboard-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, FileText, CheckCircle2, Clock, XCircle, Plus, UserIcon, MailIcon, PhoneIcon } from "lucide-react";
import { clients, paymentMethods } from "@/lib/mock-data";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

export default function ChargesPage() {
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedClientEmail, setSelectedClientEmail] = useState<string>("");
  const [selectedClientPhone, setSelectedClientPhone] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [selectedMethods, setSelectedMethods] = useState<string[]>([
    "all",
  ]);
  const router = useRouter();



  const togglePaymentMethod = (methodId: string) => {
    setSelectedMethods((prev) =>
      prev.includes(methodId)
        ? prev.filter((id) => id !== methodId)
        : [...prev, methodId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chargeId = Math.random().toString(36).substring(7);
    const generatedLink = `${window.location.origin}/pay/${chargeId}`;

    console.log("Charge created:", {
      chargeId,
      client: {
        name: selectedClient,
        email: selectedClientEmail,
        phone: selectedClientPhone,
      },
      amount,
      description,
      dueDate,
      selectedMethods,
      paymentLink: generatedLink,
    });

    // Redirect to success page
    router.push(
      `/charges/success/${chargeId}?link=${encodeURIComponent(generatedLink)}`
    );
  };

  return (
    <div className='min-h-screen'>
      <DashboardHeader />

      <main className='container px-4 md:px-8 py-8 mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-semibold tracking-tight'>
            Nova cobrança
          </h1>
          <p className='mt-2 text-sm md:text-base text-muted-foreground'>
            Crie cobranças e envie links de pagamento para seus clientes
          </p>
        </div>

        <div className='grid gap-6 lg:grid-cols-1'>
          {/* New Charge Form */}
          <div className='lg:col-span-1'>
            <Card className='rounded-3xl border-0 p-4 md:p-6 shadow-sm'>
              <div className='space-y-6'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary/10'>
                    <FileText className='h-6 w-6 text-primary' />
                  </div>
                  <div>
                    <h2 className='text-lg md:text-xl font-semibold'>
                      Informações da cobrança
                    </h2>
                    <p className='text-xs md:text-sm text-muted-foreground'>
                      Preencha os dados para criar uma cobrança
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>
                  {/* Amount */}
                  <div className='space-y-3'>
                    <Label htmlFor='amount'>Valor</Label>
                    <div className='relative'>
                      <span className='absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-muted-foreground'>
                        Kz
                      </span>
                      <Input
                        id='amount'
                        type='number'
                        placeholder='100'
                        className='h-14 rounded-2xl border-border pl-12 text-xl md:text-2xl font-semibold'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min='100'
                      />
                    </div>
                  </div>

                  {/* Due Date */}
                  <div className='space-y-3'>
                    <Label htmlFor='dueDate'>Data de vencimento</Label>
                    <Input
                      id='dueDate'
                      min={new Date().toISOString().split("T")[0]}
                      type='date'
                      className='h-12 rounded-2xl border-border'
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>

                  {/* Description */}
                  <div className='space-y-3'>
                    <Label htmlFor='description'>Descrição (opcional)</Label>
                    <Textarea
                      id='description'
                      placeholder='Descrição da cobrança'
                      className='h-12 rounded-2xl border-border'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  {/* Client Selection */}
                  <div className='space-y-3'>
                    <Label htmlFor='client'>
                      Informações do Cliente (opcional)
                    </Label>
                   <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                   <div className='relative'>
                      <UserIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                      <Input
                        id='client'
                        placeholder='Nome'
                        className='h-12 rounded-2xl border-border pl-10'
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
                      />
                    </div>
                    <div className='relative'>
                      <MailIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                      <Input
                        id='client'
                        placeholder='Email'
                        className='h-12 rounded-2xl border-border pl-10'
                        value={selectedClientEmail || ""}
                        onChange={(e) => setSelectedClientEmail(e.target.value)}
                      />
                    </div>
                    <div className='relative'>
                      <PhoneIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                      <Input
                        id='client'
                        placeholder='Telefone'
                        className='h-12 rounded-2xl border-border pl-10'
                        value={selectedClientPhone || ""}
                        onChange={(e) => setSelectedClientPhone(e.target.value)}
                      />
                    </div>
                   
                   </div>

                    {/* Quick Select Clients */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 hidden'>
                      {clients.slice(0, 3).map((client) => (
                        <button
                          key={client.id}
                          type='button'
                          onClick={() => setSelectedClient(client.name)}
                          className={`flex items-center gap-3 rounded-2xl border p-3 transition-all hover:border-primary hover:bg-primary/5 ${
                            selectedClient === client.name
                              ? "border-primary bg-primary/5"
                              : "border-border bg-card"
                          }`}>
                          <Avatar className='h-10 w-10'>
                            <AvatarImage
                              src={client.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>{client.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className='text-left'>
                            <div className='text-sm font-medium'>
                              {client.name}
                            </div>
                            <div className='text-xs text-muted-foreground'>
                              {client.email}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className='space-y-3'>
                    <Label>Métodos de pagamento disponíveis</Label>
                    <div className='grid gap-3 sm:grid-cols-2'>
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          type='button'
                          onClick={() => togglePaymentMethod(method.id)}
                          className={`flex items-center justify-between rounded-2xl border p-4 transition-all ${
                            selectedMethods.includes(method.id)
                              ? "border-primary bg-primary/5"
                              : "border-border bg-card hover:border-primary hover:bg-primary/5"
                          }`}>
                          <div className='flex items-center gap-3'>
                            <div
                              className={`flex h-10 w-16 items-center justify-center rounded-lg bg-gradient-to-r ${method.gradient}`}>
                              <span className='text-xs font-bold text-white'>
                                {method.code}
                              </span>
                            </div>
                            <div className='text-left'>
                              <div className='text-sm font-medium'>
                                {method.name}
                              </div>
                              <div className='text-xs text-muted-foreground'>
                                {method.subtitle}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`h-4 w-4 rounded-full ${
                              selectedMethods.includes(method.id)
                                ? "border-4 border-primary bg-primary"
                                : "border-2 border-border"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type='submit'
                    className='h-12 w-full rounded-full text-base font-medium'
                    disabled={
                      !amount || !dueDate || selectedMethods.length === 0 || (!selectedClient && !selectedClientEmail && !selectedClientPhone)    
                    }>
                    Criar cobrança e gerar link
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
