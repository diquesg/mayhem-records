/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useCart } from '@/lib/contexts/cartContext';
import { Check, Clipboard, CreditCard, Disc3, MapPin, QrCode, User2 } from 'lucide-react';
import BackButton from '@/src/components/backButton';
import Link from 'next/link';
import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import Image from 'next/image';
import { processPayment } from '@/src/components/PaymentProcessor';
import { useState } from 'react';
import { Progress } from "@/components/ui/progress"

export default function Pagamento(){
    const { total, itemCount, cartItems, clearCart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('card1');
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null | undefined>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [transactionDetails, setTransactionDetails] = useState<any>(null);
    const [showPixQrCode, setShowPixQrCode] = useState(false);
    const [copyAlert, setCopyAlert] = useState(false);
    const [progressValue, setProgressValue] = useState(0)

    const handlePayment = async() => {
        setIsProcessing(true);
        setPaymentError(null);

        try{
            const result = await processPayment(paymentMethod, total);

            if(result.success){
                setTransactionDetails({
                    ...result,
                    method: paymentMethod,
                    items: cartItems,
                    total,
                    date: new Date().toLocaleString()
                });
            } else{
                setPaymentError(result.error);
            }
        } catch(error){
            setPaymentError("Erro inesperado ao processar pagamento.")
        } finally{
            setIsProcessing(false);
        }
    };

    const handlePixPayment = async () => {
        setPaymentMethod('pix');
        setIsProcessing(true);

        const result = await processPayment('pix', total);

        if (result.success) {
                setTransactionDetails({
                success: false,
                transactionId: `PIX-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
                method: 'pix',
                items: cartItems,
                total,
                date: new Date().toLocaleString(),
                qrCode: "00020101021226860014BR.GOV.BCB.PIX2560qrcodes.banco.com.br/qr/v2/9d36b84fc70b478fb95c233a80d8a1c8520400005303986540510.005802BR5925EMPRESA EXEMPLO SA6008BRASILIA62070503***6304E3A0"
                });
                
                setShowPixQrCode(true);
                setIsProcessing(false);
        } else {
            setTransactionDetails({
            success: false,
            method: 'pix',
            items: cartItems,
            total,
            date: new Date().toLocaleString(),
            error: result.error
            });
            setPaymentError(result.error)
        }

        setIsProcessing(false);
    };

    const confirmPixPayment = () => {
        setIsProcessing(true);
        
        setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setTransactionDetails((prev: any) => ({
            ...prev,
            success: true,
            timestamp: new Date().toISOString()
            }));
            setShowPixQrCode(false);
            setIsProcessing(false);
        }, 3000);
    };

    const handleCopyPix = () => {
        navigator.clipboard.writeText(transactionDetails.qrCode)
        setCopyAlert(true)
        setProgressValue(0)
        const start = Date.now()

        const duration = 3000
        const interval = setInterval(() => {
        const elapsed = Date.now() - start
        const percentage = Math.min((elapsed / duration) * 100, 100)
        setProgressValue(percentage)

        if (elapsed >= duration) {
            clearInterval(interval)
            setCopyAlert(false)
        }
        }, 50)
    }

    if(itemCount === 0){
        return(
                <div className="mx-auto mt-79 text-center h-full">
                <h1 className='flex gap-2 text-xl items-center justify-center font-bold p-3 mb-1 fixed top-0 z-20 mt-1 w-full'><CreditCard strokeWidth={2} width={28} height={28}/>Pagamento</h1>
                <BackButton/>
                <Disc3 className='mx-auto my-2 animate-spin' width={40} height={40}/>
                <h1 className="text-2xl font-bold mb-1 mt-5">Ops! Seu carrinho está vazio.</h1>
                <p className='text-neutral-400 max-w-80 mx-auto mb-6'>Adicione seus discos favoritos ao carrinho e volte aqui!</p>
                <Link href="/catalogo" className='p-3 rounded-full border border-neutral-400 active:bg-neutral-600 active:scale-90'>Voltar ao catálogo</Link>
            </div>
        )
    }

    return(
        <div>
            <h1 className='fixed top-0 z-20 justify-center w-full flex text-xl font-bold gap-2 items-center mt-4'><CreditCard width={28} height={28} strokeWidth={2}/> Pagamento</h1>

            <main className='mt-16'>
                <section className='border-b pb-5 pt-3'>
                    <div className='mx-3'>
                        <div className='flex gap-1 items-center text-white justify-between'>
                            <div className='flex gap-1 items-center'>
                                <MapPin width={20} height={20}/>
                                <h2>Endereço de Entrega</h2>
                            </div>
                            <p className='text-blue-500 opacity-70'>Alterar</p>
                        </div>
                        <div className='bg-[#1C1C1C] h-20 border border-neutral-700 rounded-lg mt-3 flex items-center p-2'>
                            <div className='bg-[#2F2F2F] min-h-16 min-w-16 rounded-md flex justify-center items-center'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C11.7667 22 11.5667 21.9333 11.4 21.8C11.2333 21.6667 11.1083 21.4917 11.025 21.275C10.7083 20.3417 10.3083 19.4667 9.825 18.65C9.35833 17.8333 8.7 16.875 7.85 15.775C7 14.675 6.30833 13.625 5.775 12.625C5.25833 11.625 5 10.4167 5 9C5 7.05 5.675 5.4 7.025 4.05C8.39167 2.68333 10.05 2 12 2C13.95 2 15.6 2.68333 16.95 4.05C18.3167 5.4 19 7.05 19 9C19 10.5167 18.7083 11.7833 18.125 12.8C17.5583 13.8 16.9 14.7917 16.15 15.775C15.25 16.975 14.5667 17.975 14.1 18.775C13.65 19.5583 13.275 20.3917 12.975 21.275C12.8917 21.5083 12.7583 21.6917 12.575 21.825C12.4083 21.9417 12.2167 22 12 22ZM12 11.5C12.7 11.5 13.2917 11.2583 13.775 10.775C14.2583 10.2917 14.5 9.7 14.5 9C14.5 8.3 14.2583 7.70833 13.775 7.225C13.2917 6.74167 12.7 6.5 12 6.5C11.3 6.5 10.7083 6.74167 10.225 7.225C9.74167 7.70833 9.5 8.3 9.5 9C9.5 9.7 9.74167 10.2917 10.225 10.775C10.7083 11.2583 11.3 11.5 12 11.5Z" fill="#C53D3D"/>
                                </svg>
                            </div>
                            <div className='flex-col flex m-2 text-sm text-neutral-300 truncate'>
                                <p>Rua Capitão Zuca Neves, 121</p>
                                <p>Jardim Paraíso</p>
                                <p>13425-020 São Paulo, SP</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='border-b pb-5 pt-3'>
                    <div className='mx-3'>
                        <div className='flex gap-1 items-center text-white justify-between'>
                            <div className='flex gap-1 items-center'>
                                <CreditCard width={20} height={20}/>
                                <h2>Método de Pagamento</h2>
                            </div>
                            <p className='text-blue-500 opacity-70'>Alterar</p>
                        </div>
                        <div className='rounded-lg mt-3 flex items-center w-full'>
                            <RadioGroup 
                            value={paymentMethod} 
                            onValueChange={setPaymentMethod}
                            className='w-full'
                            >
                            <div className="flex items-center gap-3 border border-neutral-800 p-3 rounded-md focus:border-neutral-100">
                                <RadioGroupItem value="card1" id="r1" />
                                <Label htmlFor="r1">•••• •••• •••• 5225 (Crédito)</Label>
                                <Image src="/mastercard.png" width={28} height={15} alt={"mastercard"}/>
                            </div>
                            <div className="flex items-center gap-3 border border-neutral-800 p-3 rounded-md">
                                <RadioGroupItem value="card2" id="r2" />
                                <Label htmlFor="r2">•••• •••• •••• 7223 (Débito)</Label>
                                <Image src="/mastercard.png" width={28} height={15} alt={"mastercard"}/>
                            </div>
                            <div className="flex items-center gap-3 border border-neutral-800 p-3 rounded-md">
                                <RadioGroupItem value="pix" id="r3" />
                                <Label htmlFor="r3">Pix</Label>
                                <Image src="/pix.png" width={20} height={20} alt={"pix"}/>
                            </div>
                            </RadioGroup>
                        </div>
                    </div>
                </section>
                <section className='border-b pb-5 pt-3'>
                    <div className='mx-3'>
                        <div className='flex gap-1 items-center text-white justify-between'>
                            <div className='flex gap-1'>
                                <User2 width={20} height={20}/>
                                <h2>Informações Gerais</h2>
                            </div>
                            <p className='text-blue-500 opacity-70'>Alterar</p>
                        </div>
                        <div className='text-sm font-normal mt-2 flex flex-col gap-2'>
                            <p>Eduarda da Silva</p>
                            <p>227.•••.•••.532-20</p>
                            <p>eduardasilva@gmail.com</p>
                            <p>(11) 95623 - 6233</p>
                        </div>
                    </div>
                </section>

                    {paymentError && (
                    <div className="fixed bottom-4 left-4 right-4 bg-red-900 text-white p-4 rounded-lg flex items-center z-50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{paymentError}</span>
                        <button 
                        onClick={() => setPaymentError(null)}
                        className="ml-auto text-neutral-300 hover:text-white"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        </button>
                    </div>
                    )}
                {showPixQrCode && (
                <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-3">
                    <div className="bg-neutral-900 rounded-lg p-6 max-w-md w-full border border-neutral-700">
                    <div className='flex gap-2 mb-5 justify-center items-center'>
                        <Image src="/pix.png" alt='pix logo' width={32} height={32} className=''/>
                        <h2 className="text-2xl font-bold text-center text-nowrap shrink">Pagamento via PIX</h2>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg mb-4 flex flex-col items-center">
                        <div className="bg-neutral-200 w-48 h-48 flex items-center justify-center">
                            <Image src="/fake-qr-code.png" alt='fake qr code' height={200} width={200} className=''/>
                        </div>
                        
                        <p className="text-black text-md font-semibold text-center">Escaneie com seu app de banco</p>
                        <p className='text-neutral-700 mt-1'>ou</p>
                        <div className="w-full bg-neutral-200 p-3 rounded break-all border border-neutral-300 mt-1">
                        <p className="text-xs text-black font-mono">{transactionDetails.qrCode}</p>
                        </div>
                        
                        <button 
                        onClick={handleCopyPix} disabled={copyAlert}
                        className={`mt-3 text-blue-600 text-md font-semibold border p-1 px-3 border-blue-700 rounded-full cursor-pointer hover:bg-blue-100   ${copyAlert ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                        Copiar código PIX
                        </button>
                        {copyAlert && 
                            <div className='fixed bottom-0 h-fit rounded-md  bg-neutral-950 border m-3 w-fit'>
                                <Progress value={progressValue} className=" rounded-none rounded-t-md border-b"/>
                                <div className='gap-3 p-3 flex justify-center items-center'>
                                    <Clipboard/>
                                    <p>Código PIX copiado para a área de transferência.</p>
                                </div>
                            </div>}
                    </div>
                    
                    <div className="flex gap-3">
                        <button
                        onClick={() => {
                            setShowPixQrCode(false);
                            setTransactionDetails(null);
                        }}
                        className="flex-1 py-2 border border-neutral-600 rounded-lg"
                        >
                        Cancelar
                        </button>
                        <button
                        onClick={confirmPixPayment}
                        disabled={isProcessing}
                        className={`flex-1 py-2 rounded-lg text-black font-semibold active:bg-[#297e75] active:scale-90 items-center ${
                            isProcessing ? 'bg-neutral-500' : 'bg-[#4DB5AB] hover:bg-[#297e75]'
                        }`}
                        >
                        {isProcessing ? (
                            <>
                                <Disc3 className="animate-spin inline mr-1" size={20} />
                                <p>Confirmando...</p>
                            </>
                        ) : 'Já paguei'}
                        </button>
                    </div>
                    </div>
                </div>
                )}
                {transactionDetails?.success && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center">
                        <div className="bg-[#1a1a1a] rounded-lg p-6 max-w-md w-full m-3 border border-neutral-800">
                        <div className="text-center mb-6">
                            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" strokeWidth={1.5} />
                            <h2 className="text-2xl font-bold">Pagamento Aprovado!</h2>
                            <p className="text-neutral-400 mt-2">Seu pedido foi processado com sucesso.</p>
                        </div>

                        <div className="bg-neutral-900 rounded-lg p-4 mb-6 border border-neutral-600 flex flex-col gap-3 text-neutral-400">
                            <div className="flex justify-between">
                                <span className='font-bold'>ID da Transação:</span>
                                <span className="font-mono truncate">{transactionDetails.transactionId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Data:</span>
                                <span className='text-right'>{transactionDetails.date}</span>
                            </div>
                            <div className="flex justify-between">
                            <span>Método:</span>
                            <span>
                                {transactionDetails.method === 'pix' ? 'PIX' : 
                                transactionDetails.method === 'card1' ? 'Cartão de Crédito' : 
                                'Cartão de Débito'}
                            </span>
                            </div>
                            <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-neutral-700">
                            <span>Total:</span>
                            <span>R$ {total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="text-center">
                            <Link 
                            href="/catalogo" onClick={() => clearCart()}
                            className="inline-block bg-blue-600 hover:bg-blue-700 active:scale-90 active:bg-blue-800 text-white py-3 px-6 rounded-full font-medium"
                            >
                            Continuar Comprando
                            </Link>
                            <button className="mt-4 text-neutral-200 hover:text-white block w-full" onClick={() => {
                                    clearCart();
                                    setTransactionDetails(null);
                            }}>Fechar</button>
                        </div>
                        </div>
                    </div>
                </div>
                )}
            </main>
          <div className="bg-[#171717] rounded-lg p-6 border-t border-neutral-600 fixed z-40 w-full left-0 bottom-0 rounded-b-none lg:static lg:rounded-md">
            <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} itens)</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Frete</span>
                <span>Grátis</span>
              </div>
              
              <div className="flex border-t items-baseline border-neutral-700 justify-between pt-2 gap-3">
                    <div className='flex flex-col items-center mt-3'>
                        <span className='mr-auto'>Total</span>
                        <span className='truncate font-bold text-2xl max-w-fit'>R$ {total.toFixed(2)}</span>
                    </div>
                    {paymentMethod === 'pix' ? (
                        <button 
                            onClick={handlePixPayment}
                            disabled={isProcessing}
                            className={`mt-auto ml-auto w-fit font-bold px-5 truncate text-lg text-black p-3 rounded-full flex gap-3 justify-center items-center ${
                            isProcessing 
                                ? 'bg-neutral-500 cursor-not-allowed' 
                                : 'bg-[#4DB5AB] hover:bg-[#297e75]'
                            }`}
                        >
                            {isProcessing ? (
                            <>
                                <Disc3 className="animate-spin" width={24} height={24} />
                                Gerando...
                            </>
                            ) : (
                            <>
                                <QrCode/>
                                Gerar QR Code
                            </>
                            )}
                        </button>
                        ) : (
                            <button className={`mt-auto w-fit truncate bg-blue-600 font-bold text-lg hover:bg-blue-700 text-white p-3 px-5 rounded-full flex gap-2 justify-center items-center ${isProcessing ? 'bg-neutral-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`} onClick={handlePayment} disabled={isProcessing}>{isProcessing ? (<Disc3 className='animate-spin'/>) :(<Check />)} {isProcessing ? "Processando..." : "Finalizar Compra"}</button>
                        )}
              </div>
            </div>
          </div>
          <BackButton/>
        </div>
    )
}