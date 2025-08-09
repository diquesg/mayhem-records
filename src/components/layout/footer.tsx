import Image from "next/image"
import { Libre_Caslon_Text } from "next/font/google"

  const LibreFont = Libre_Caslon_Text({
    weight: "400",
    subsets: ["latin"]
  })

export default function Footer(){
    return(
        <footer className="md:px-30 lg:px-12 md:mb-20 lg:mb-0 xl:px-60 md:gap-6 lg:gap-0 px-60 bg-[url(/backgrounds/footer-bg.png)] bg-top bg-cover py-9 text-neutral-400 justify-between border-t border-neutral-700 hidden md:flex md:flex-col lg:flex-row">
            <div className="flex flex-col gap-4">
                <Image src="/logos/logo2.svg" alt="logo" height={32} width={247}/>
                <h1 className={`${LibreFont.className} text-white`}>E-mail:</h1>
                <p>suporte@mayhemrecords.com</p>
                <h1 className={`${LibreFont.className} text-white`}>Telefone:</h1>
                <p>(11) 96344-7347</p>
                <p className="text-neutral-500 max-w-151 text-sm">Este é um projeto fictício e não comercial, criado para fins educacionais. Todas as imagens e referências pertencem aos seus respectivos detentores de direitos autorais.</p>
            </div>
            <div className="flex lg:flex-row md:mt-8 lg:mt-0 gap-13">
                <div className="flex flex-col gap-2">
                    <h1 className={`${LibreFont.className} text-white`}>Acesso rápido</h1>
                    <p className="hover:underline cursor-pointer">Sobre nós</p>
                    <p className="hover:underline cursor-pointer">FAQ</p>
                    <p className="hover:underline cursor-pointer">Contate-nos</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className={`${LibreFont.className} text-white`}>Social</h1>
                    <p className="hover:underline cursor-pointer">Instagram</p>
                    <p className="hover:underline cursor-pointer">Facebook</p>
                    <p className="hover:underline cursor-pointer">LinkedIn</p>
                    <p className="hover:underline cursor-pointer">Twitter</p>
                    <p className="hover:underline cursor-pointer">YouTube</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className={`${LibreFont.className} text-white`}>Legal</h1>
                    <p className="hover:underline cursor-pointer">Termos de Serviço</p>
                    <p className="hover:underline cursor-pointer">Política de Privacidade</p>
                    <p className="hover:underline cursor-pointer">Política de Cookies</p>
                </div>
            </div>
        </footer>
    )
}