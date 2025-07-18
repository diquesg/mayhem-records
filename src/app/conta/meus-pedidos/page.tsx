"use client"

import Link from 'next/link'
import BackButton from '@/src/components/backButton'
import { Check, ClipboardList, Truck } from 'lucide-react'

const orders = [
    {
      id: "VNL-25002",
      date: "03/05/2025",
      status: "Em transporte",
      items: [
        { title: "Thriller - Michael Jackson", price: 95.50 },
        { title: "Mayhem - Lady Gaga", price: 195.90 }
      ],
      total: 95.50
    },
  {
    id: "VNL-25001",
    date: "15/03/2025",
    status: "Entregue",
    items: [
      { title: "OK Computer - Radiohead", price: 89.90 }
    ],
    total: 209.90
  },
]

export default function OrdersPage() {
  return (
    <main className="max-w-md mx-auto p-3 mt-16">
      <BackButton/>
      <header className='fixed top-0 z-20 w-full justify-center items-center flex gap-1 text-center my-4 text-xl font-bold text-white'>
        <ClipboardList strokeWidth={2}/>
        <h1>Meus Pedidos</h1>
      </header>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="border border-neutral-700 rounded-lg p-4 bg-neutral-900 shadow-lg shadow-black">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-white">Pedido #{order.id}</h3>
                <p className="text-sm text-neutral-500">{order.date}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                order.status === "Entregue" 
                  ? "bg-green-200 text-green-800" 
                  : "bg-blue-200 text-blue-800"
              }`}>
                {order.status === "Entregue" &&  (<div className='flex items-center gap-1'><Check width={16}/> {order.status}</div>)}
                {order.status === "Em transporte" &&  (<div className='flex items-center gap-1'><Truck width={16}/> {order.status}</div>)}
              </span>
            </div>

            <div className="my-3 border-t pt-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm mb-2 gap-4">
                  <span className='flex items-baseline gap-1'><span className='text-neutral-500'>1</span> {item.title}</span>
                  <span className='text-nowrap'>R$ {item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-semibold border-t pt-3">
              <span>Total</span>
              <span>R$ {order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-10">
            <p className="text-neutral-500 mb-4">Nenhum pedido encontrado</p>
            <Link 
              href="/catalogo" 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Explorar Catálogo
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}