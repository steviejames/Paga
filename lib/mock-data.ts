export interface Charge {
  id: string
  amount: number
  status: "pending" | "paid" | "overdue" | "cancelled"
  client: string
  paymentMethod: string
  dueDate: string
  createdDate: string
  paymentLink: string
  avatar: string
  description?: string
}

export interface Client {
  id: string
  name: string
  email?: string
  avatar: string
  totalCharges?: number
  phone?: string
  address?: string
}

export interface ChartData {
  date: string
  amount: number
  label: string
}

export const charges: Charge[] = [
  {
    id: "1",
    amount: 125000,
    status: "pending",
    client: "João Silva",
    paymentMethod: "Multicaixa",
    dueDate: "28 Out",
    createdDate: "20 Out",
    paymentLink: "https://paga.ao/pay/abc123",
    avatar: "/man.jpg",
    description: "Charge for João Silva",
  },
  {
    id: "2",
    amount: 85000,
    status: "pending",
    client: "Maria Santos",
    paymentMethod: "Transferência Bancária",
    dueDate: "30 Out",
    createdDate: "22 Out",
    paymentLink: "https://paga.ao/pay/def456",
    avatar: "/diverse-woman-portrait.png",
    description: "Charge for Maria Santos",
  },
  {
    id: "3",
    amount: 250000,
    status: "paid",
    client: "Pedro Costa",
    paymentMethod: "Unitel Money",
    dueDate: "25 Out",
    createdDate: "18 Out",
    paymentLink: "https://paga.ao/pay/ghi789",
    avatar: "/man-with-stylish-glasses.png",
    description: "Charge for Pedro Costa",
  },
  {
    id: "4",
    amount: 180000,
    status: "paid",
    client: "Ana Ferreira",
    paymentMethod: "Multicaixa Express",
    dueDate: "23 Out",
    createdDate: "15 Out",
    paymentLink: "https://paga.ao/pay/jkl012",
    avatar: "/woman-blonde.jpg",
    description: "Charge for Ana Ferreira",
  },
  {
    id: "5",
    amount: 95000,
    status: "overdue",
    client: "Carlos Mendes",
    paymentMethod: "Transferência Bancária",
    dueDate: "15 Out",
    createdDate: "08 Out",
    paymentLink: "https://paga.ao/pay/mno345",
    avatar: "/man-beard.jpg",
    description: "Charge for Carlos Mendes",
  },
]

export const chartData: ChartData[] = [
  { date: "1 Out", amount: 285000, label: "1 Out" },
  { date: "5 Out", amount: 420000, label: "5 Out" },
  { date: "10 Out", amount: 195000, label: "10 Out" },
  { date: "15 Out", amount: 310000, label: "15 Out" },
  { date: "20 Out", amount: 275000, label: "20 Out" },
  { date: "25 Out", amount: 380000, label: "25 Out" },
  { date: "30 Out", amount: 450000, label: "30 Out" },
]


export const clients: Client[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@email.ao",
    avatar: "/man.jpg",
    totalCharges: 3,
    phone: "+244 923 456 789",
    address: "Rua da Silva, 123, Bairro, Cidade",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@email.ao",
    avatar: "/diverse-woman-portrait.png",
    totalCharges: 5,
    phone: "+244 923 456 789",
    address: "Rua da Santos, 123, Bairro, Cidade",
  },
  {
    id: "3",
    name: "Pedro Costa",
    email: "pedro.costa@email.ao",
    avatar: "/man-with-stylish-glasses.png",
    totalCharges: 2,
    phone: "+244 923 456 789",
    address: "Rua da Costa, 123, Bairro, Cidade",
  },
  {
    id: "4",
    name: "Ana Ferreira",
    email: "ana.ferreira@email.ao",
    avatar: "/woman-blonde.jpg",
    totalCharges: 4,
    phone: "+244 923 456 789",
    address: "Rua da Ferreira, 123, Bairro, Cidade",
  },
  {
    id: "5",
    name: "Carlos Mendes",
    email: "carlos.mendes@email.ao",
    avatar: "/man-beard.jpg",
    totalCharges: 1,
    phone: "+244 923 456 789",
    address: "Rua da Mendes, 123, Bairro, Cidade",
  },
]

export const pendingCharges = [
  {
    id: "1",
    client: "João Silva",
    paymentMethod: "Multicaixa",
    amount: 125000,
    dueDate: "28 Out",
    createdDate: "20 Out",
    avatar: "/man.jpg",
    status: "pending",
  },
  {
    id: "2",
    client: "Maria Santos",
    paymentMethod: "Transferência Bancária",
    amount: 85000,
    dueDate: "30 Out",
    createdDate: "22 Out",
    avatar: "/diverse-woman-portrait.png",
    status: "pending",
  },
]

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  taxRate: number // IVA percentage (e.g., 14 for 14%)
  total: number
}

export interface Invoice {
  id: string
  invoiceNumber: string
  date: string
  dueDate: string
  status: "draft" | "issued" | "paid" | "overdue" | "cancelled"

  // Client information
  client: {
    id: string
    name: string
    nif: string // Tax ID
    address: string
    phone: string
    email: string
  }

  // Business information (issuer)
  business: {
    id: string
    name: string
    nif: string
    address: string
    phone: string
    email: string
  }

  // Invoice items
  items: InvoiceItem[]

  // Financial details
  subtotal: number
  taxAmount: number
  total: number

  // Payment information
  linkedPaymentId?: string // Reference to a charge/payment
  paymentMethod?: string
  paymentDate?: string

  // Additional info
  notes?: string
  terms?: string
}

export const invoices: Invoice[] = [
  {
    id: "INV-001",
    invoiceNumber: "FT 2024/001",
    date: "2024-10-15",
    dueDate: "2024-11-15",
    status: "paid",
    client: {
      id: "1",
      name: "João Silva",
      nif: "5000123456",
      address: "Rua da Independência, 123, Luanda",
      phone: "+244 923 456 789",
      email: "joao.silva@email.ao",
    },
    business: {
      id: "BUS-001",
      name: "Meu Negócio Lda",
      nif: "5000987654",
      address: "Av. 4 de Fevereiro, 456, Luanda",
      phone: "+244 922 111 222",
      email: "contato@meunegocio.ao",
    },
    items: [
      {
        id: "1",
        description: "Serviço de Consultoria",
        quantity: 10,
        unitPrice: 15000,
        taxRate: 14,
        total: 150000,
      },
      {
        id: "2",
        description: "Desenvolvimento de Website",
        quantity: 1,
        unitPrice: 500000,
        taxRate: 14,
        total: 500000,
      },
    ],
    subtotal: 650000,
    taxAmount: 91000,
    total: 741000,
    linkedPaymentId: "3",
    paymentMethod: "Unitel Money",
    paymentDate: "2024-10-25",
    notes: "Obrigado pela sua preferência!",
    terms: "Pagamento em 30 dias",
  },
  {
    id: "INV-002",
    invoiceNumber: "FT 2024/002",
    date: "2024-10-20",
    dueDate: "2024-11-20",
    status: "issued",
    client: {
      id: "2",
      name: "Maria Santos",
      nif: "5000234567",
      address: "Rua Rainha Ginga, 789, Luanda",
      phone: "+244 924 567 890",
      email: "maria.santos@email.ao",
    },
    business: {
      id: "BUS-001",
      name: "Meu Negócio Lda",
      nif: "5000987654",
      address: "Av. 4 de Fevereiro, 456, Luanda",
      phone: "+244 922 111 222",
      email: "contato@meunegocio.ao",
    },
    items: [
      {
        id: "1",
        description: "Licença de Software Anual",
        quantity: 5,
        unitPrice: 25000,
        taxRate: 14,
        total: 125000,
      },
    ],
    subtotal: 125000,
    taxAmount: 17500,
    total: 142500,
    linkedPaymentId: "1",
    notes: "Renovação anual de licenças",
    terms: "Pagamento em 30 dias",
  },
  {
    id: "INV-003",
    invoiceNumber: "FT 2024/003",
    date: "2024-10-22",
    dueDate: "2024-11-22",
    status: "issued",
    client: {
      id: "4",
      name: "Ana Ferreira",
      nif: "5000345678",
      address: "Rua Direita, 321, Luanda",
      phone: "+244 925 678 901",
      email: "ana.ferreira@email.ao",
    },
    business: {
      id: "BUS-001",
      name: "Meu Negócio Lda",
      nif: "5000987654",
      address: "Av. 4 de Fevereiro, 456, Luanda",
      phone: "+244 922 111 222",
      email: "contato@meunegocio.ao",
    },
    items: [
      {
        id: "1",
        description: "Manutenção de Sistema",
        quantity: 1,
        unitPrice: 180000,
        taxRate: 14,
        total: 180000,
      },
    ],
    subtotal: 180000,
    taxAmount: 25200,
    total: 205200,
    linkedPaymentId: "4",
    paymentMethod: "Multicaixa Express",
    paymentDate: "2024-10-23",
    notes: "Manutenção mensal",
    terms: "Pagamento em 30 dias",
  },
  {
    id: "INV-004",
    invoiceNumber: "FT 2024/004",
    date: "2024-10-25",
    dueDate: "2024-11-25",
    status: "draft",
    client: {
      id: "3",
      name: "Pedro Costa",
      nif: "5000456789",
      address: "Av. Lenine, 654, Luanda",
      phone: "+244 926 789 012",
      email: "pedro.costa@email.ao",
    },
    business: {
      id: "BUS-001",
      name: "Meu Negócio Lda",
      nif: "5000987654",
      address: "Av. 4 de Fevereiro, 456, Luanda",
      phone: "+244 922 111 222",
      email: "contato@meunegocio.ao",
    },
    items: [
      {
        id: "1",
        description: "Treinamento Corporativo",
        quantity: 3,
        unitPrice: 50000,
        taxRate: 14,
        total: 150000,
      },
    ],
    subtotal: 150000,
    taxAmount: 21000,
    total: 171000,
    notes: "Treinamento agendado para novembro",
    terms: "Pagamento em 30 dias",
  },
]

export const payments = charges


export const paymentMethods = [
 
  {
    id: "multicaixa",
    name: "Multicaixa",
    subtitle: "Express & ATM",
    gradient: "from-[#FF6B00] to-[#FF8C00]",
    code: "MC",
  },
  {
    id: "bank_transfer",
    name: "Transferência",
    subtitle: "Bancária",
    gradient: "from-[#0066CC] to-[#0088FF]",
    code: "TB",
  },
  {
    id: "unitel_money",
    name: "Unitel Money",
    subtitle: "Mobile",
    gradient: "from-[#E30613] to-[#FF1744]",
    code: "UM",
  },
];