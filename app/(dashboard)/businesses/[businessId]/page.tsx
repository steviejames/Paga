import Link from "next/link"

export default function BusinessDashboardPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap gap-2 mb-4">
        <Link
          href="/businesses"
          className="text-gray-500 dark:text-gray-400 text-base font-medium leading-normal hover:text-primary"
        >
          Meus Negócios
        </Link>
        <span className="text-gray-500 dark:text-gray-400 text-base font-medium leading-normal">/</span>
        <span className="text-gray-800 dark:text-gray-200 text-base font-medium leading-normal">Nome do Negócio</span>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h2 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
          Visão Geral
        </h2>
        <div className="flex items-center gap-3">
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-medium leading-normal gap-2 hover:bg-primary/90">
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
              add
            </span>
            <span>Novo Produto</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 rounded-xl bg-white dark:bg-gray-800/50 p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-gray-800 dark:text-gray-200 text-xl font-bold leading-tight">
                Bem-vindo ao seu Negócio!
              </p>
              <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-200">
                Ativo
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-relaxed">
              Aqui você pode gerenciar todas as informações, produtos e cobranças. Use a navegação ao lado para
              acessar as seções.
            </p>
          </div>
          <div
            className="w-full md:w-48 h-32 bg-center bg-no-repeat bg-cover rounded-lg flex-shrink-0"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBrR9i_Yj57hC1dFUF2uwRkYOoGi2rVtGsq03Nq6OKpGzm_ArTKag_i0JGdmS9fsOasZ4hdyYKtmd_8XkUrrnoJgjb_i6M0WPFe_Gt-sEmcE_QOqKS5AwFRKYQ_Fsta0anQxh-gk8TbY5-r1-QzK34j5ggxRdjviGo4J5u_E25I8jfkVoCQhelbO6cLDr9vrqA_87FaTvs3Y9xnN1KLrg-HTqOM7zxH0BRxM6v3XAs-HOuGneLLPc6WQconq5vflRqlKr3MVb5rxsE')",
            }}
          />
        </div>
        <div className="rounded-xl bg-white dark:bg-gray-800/50 p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Informações Gerais</h3>
          <div className="grid grid-cols-1 md:grid-cols-[25%_1fr] gap-x-6">
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-gray-200 dark:border-t-gray-700 py-5">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">Nome</p>
              <p className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal">Nome do Negócio</p>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-gray-200 dark:border-t-gray-700 py-5">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">Subdomínio</p>
              <p className="text-primary text-sm font-medium leading-normal hover:underline">
                negocio.plataforma.com
              </p>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-gray-200 dark:border-t-gray-700 py-5">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">Data de Criação</p>
              <p className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal">
                15 de Agosto, 2023
              </p>
            </div>
            <div className="col-span-2 grid grid-cols-subgrid border-t border-t-gray-200 dark:border-t-gray-700 py-5">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">Proprietário</p>
              <p className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal">João da Silva</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
