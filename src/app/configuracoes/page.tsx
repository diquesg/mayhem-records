"use client"

import { useState } from 'react'
import {  Bell, Lock, Globe, Shield, User, CreditCard, CircleAlert, ArrowRight, Settings } from 'lucide-react'
import BackButton from '@/src/components/backButton'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [language, setLanguage] = useState('pt-BR')
  const [email, setEmail] = useState('eduarda@gmail.com')

  return (
    <div className="max-w-md mx-auto p-3 pb-26 mt-15">
        <BackButton/>
        <div className='fixed flex gap-1 top-0 w-full justify-center text-white text-xl font-bold items-center z-20 my-4'>
            <Settings strokeWidth={2}/>
            <h1>Configurações</h1>
        </div>
      <div className="space-y-3">
        <div className="border rounded-lg p-4 bg-neutral-900">
          <h2 className="flex items-center gap-2 text-white font-medium text-lg mb-4">
            <User size={20} />
            Perfil
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Nome</span>
              <span className="text-neutral-500">Eduarda</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>E-mail</span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-b border-neutral-500 text-right py-1 px-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-neutral-900">
          <h2 className="flex items-center gap-2 font-medium mb-4 text-white text-lg">
            <Bell size={20} />
            Notificações
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Notificações por e-mail</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-neutral-900 border border-neutral-700 peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Notificações push</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-neutral-900 border border-neutral-700 peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-neutral-900">
          <h2 className="flex items-center gap-2 font-medium mb-4 text-lg text-white">
            <CreditCard size={20} />
            Métodos de Pagamento
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="bg-neutral-950 border rounded w-8 h-8 flex items-center justify-center">
                  <CreditCard size={16} />
                </div>
                <span>•••• •••• •••• 5225</span>
              </div>
              <span className="text-blue-500">Editar</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="bg-neutral-950 border rounded w-8 h-8 flex items-center justify-center">
                  <CreditCard size={16} />
                </div>
                <span>•••• •••• •••• 7223</span>
              </div>
              <span className="text-blue-500">Editar</span>
            </div>
            
            <button className="mt-2 text-blue-500 flex items-center gap-2">
              <span>+</span> Adicionar novo cartão
            </button>
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-neutral-900">
          <h2 className="flex items-center gap-2 font-medium mb-4 text-lg text-white">
            <Lock size={20} />
            Privacidade e Segurança
          </h2>
          
          <div className="space-y-3">
            <button className="w-fit text-left p-2 border rounded-md border-neutral-400">
              Alterar senha
            </button>
            <button className="w-fit text-left p-2 border rounded-md border-neutral-400">
              Configurações de privacidade
            </button>
            <button className="w-fit flex gap-1 rounded-md text-left border-red-400 border p-2 text-red-400">
                <CircleAlert width={18}/>
              Excluir minha conta
            </button>
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-neutral-900">
          <h2 className="flex items-center gap-2 font-medium mb-4 text-lg text-white">
            <Globe size={20} />
            Idioma e Região
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Idioma</span>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-neutral-950 border border-neutral-700 rounded-md p-2 text-sm">
                <option value="pt-BR">Português (BR)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español (ES)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-neutral-900">
          <h2 className="flex items-center gap-2 font-medium mb-4 text-lg text-white">
            <Shield size={20} />
            Sobre o App
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span>Versão</span>
              <span className="text-neutral-500">1.0.0</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Termos de Uso</span>
              <ArrowRight width={18} height={18}/>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Política de Privacidade</span>
              <ArrowRight width={18} height={18}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}