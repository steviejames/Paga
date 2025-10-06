import Link from "next/link"
import { ArrowRight, CheckCircle2, FileText, LinkIcon, BarChart3, Shield, Zap, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#E8EBF0]">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-2xl font-bold text-gray-900">Paga</div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="#funcionalidades" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Funcionalidades
              </Link>
              <Link href="#como-funciona" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Como Funciona
              </Link>
              <Link href="#precos" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Preços
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/sign-up">
                <Button variant="ghost" className="text-sm">
                  Entrar
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-[#2D3FFF] hover:bg-[#2D3FFF]/90 text-white rounded-full px-6">
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-8 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600">Plataforma de cobranças para empresas angolanas</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight text-balance">
              Crie cobranças e receba pagamentos <span className="text-[#2D3FFF]">facilmente</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed text-pretty max-w-2xl mx-auto">
              A plataforma completa para empresas angolanas criarem cobranças profissionais e receberem pagamentos
              através de múltiplos métodos.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-[#2D3FFF] hover:bg-[#2D3FFF]/90 text-white rounded-full px-8 h-14 text-base"
                >
                  Começar Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
             <Link href="/dashboard">
               
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base border-2 bg-transparent">
                  Ver Demonstração
                </Button>
             </Link>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Sem taxas de setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Suporte em português</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Métodos angolanos</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Mockup */}
          <div className="mt-20 relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto border border-gray-200">
              <div className="aspect-video bg-gradient-to-br from-[#2D3FFF] to-[#5B6FFF] rounded-2xl flex items-center justify-center">
                <div className="text-white text-center">
                  <BarChart3 className="h-24 w-24 mx-auto mb-4 opacity-50" />
                  <p className="text-lg opacity-75">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-sm text-gray-600">Empresas ativas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">50M Kz</div>
              <div className="text-sm text-gray-600">Processados/mês</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-sm text-gray-600">Taxa de sucesso</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Suporte disponível</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funcionalidades" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
              Tudo que precisa para gerir cobranças
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
              Ferramentas profissionais para criar, enviar e acompanhar suas cobranças
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-[#2D3FFF]/10 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="h-7 w-7 text-[#2D3FFF]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cobranças Profissionais</h3>
              <p className="text-gray-600 leading-relaxed">
                Crie cobranças personalizadas com sua marca, logo e informações detalhadas em segundos.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-[#2D3FFF]/10 rounded-2xl flex items-center justify-center mb-6">
                <LinkIcon className="h-7 w-7 text-[#2D3FFF]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Links de Pagamento</h3>
              <p className="text-gray-600 leading-relaxed">
                Gere links únicos para cada cobrança e envie por WhatsApp, email ou SMS aos seus clientes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-[#2D3FFF]/10 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="h-7 w-7 text-[#2D3FFF]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Acompanhamento em Tempo Real</h3>
              <p className="text-gray-600 leading-relaxed">
                Veja o status de todas as cobranças, pagamentos recebidos e pendentes num dashboard intuitivo.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-[#2D3FFF]/10 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-[#2D3FFF]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Múltiplos Métodos</h3>
              <p className="text-gray-600 leading-relaxed">
                Aceite pagamentos via Multicaixa, transferência bancária, Unitel Money e outros métodos angolanos.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-[#2D3FFF]/10 rounded-2xl flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-[#2D3FFF]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Gestão de Clientes</h3>
              <p className="text-gray-600 leading-relaxed">
                Mantenha uma base de dados organizada dos seus clientes e histórico de transações.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-[#2D3FFF]/10 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="h-7 w-7 text-[#2D3FFF]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Notificações Automáticas</h3>
              <p className="text-gray-600 leading-relaxed">
                Receba alertas instantâneos quando um cliente visualizar ou pagar uma cobrança.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">Como funciona</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
              Comece a receber pagamentos em 3 passos simples
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2D3FFF] text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Crie a Cobrança</h3>
              <p className="text-gray-600 leading-relaxed">
                Preencha os dados do cliente, valor e descrição da cobrança em segundos.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2D3FFF] text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Envie o Link</h3>
              <p className="text-gray-600 leading-relaxed">
                Compartilhe o link de pagamento com seu cliente via WhatsApp, email ou SMS.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2D3FFF] text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Receba o Pagamento</h3>
              <p className="text-gray-600 leading-relaxed">
                Seu cliente paga pelo método preferido e você recebe notificação instantânea.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">Preços transparentes</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
              Sem taxas escondidas. Pague apenas pelo que usar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Gratuito</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">0 Kz</span>
                  <span className="text-gray-600">/mês</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Até 10 cobranças/mês</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Links de pagamento</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Dashboard básico</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full rounded-full h-12 bg-transparent">
                Começar Grátis
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="bg-[#2D3FFF] rounded-3xl p-8 shadow-xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#2D3FFF] px-4 py-1 rounded-full text-sm font-semibold">
                Mais Popular
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Profissional</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">15.000 Kz</span>
                  <span className="text-white/80">/mês</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-white">Cobranças ilimitadas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-white">Todos os métodos de pagamento</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-white">Relatórios avançados</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-white">Suporte prioritário</span>
                </li>
              </ul>
              <Button className="w-full rounded-full h-12 bg-white text-[#2D3FFF] hover:bg-white/90">
                Começar Agora
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Empresarial</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">Custom</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Tudo do Profissional</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">API personalizada</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Gestor de conta dedicado</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">SLA garantido</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full rounded-full h-12 bg-transparent">
                Contactar Vendas
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-[#2D3FFF] to-[#5B6FFF]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
            Pronto para começar a receber pagamentos?
          </h2>
          <p className="text-xl text-white/90 mb-10 text-pretty">
            Junte-se a centenas de empresas angolanas que já usam Paga
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/get-started">
              <Button size="lg" className="bg-white text-[#2D3FFF] hover:bg-white/90 rounded-full px-8 h-14 text-base">
                Começar Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 h-14 text-base border-2 border-white text-white hover:bg-white/10 bg-transparent"
            >
              Falar com Vendas
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold text-white mb-4">Paga</div>
              <p className="text-sm leading-relaxed">A plataforma de cobranças para empresas angolanas.</p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="hover:text-white transition-colors">
                    Funcionalidades
                  </Link>
                </li>
                <li>
                  <Link href="#prices" className="hover:text-white transition-colors">
                    Preços
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about-us" className="hover:text-white transition-colors">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link href="" className="hover:text-white transition-colors">
                    Notícias
                  </Link>
                </li>
                <li>
                  <Link href="/company/carreers" className="hover:text-white transition-colors">
                    Carreiras
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">
                    Centro de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; 2025 Paga. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacidade
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Termos
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
