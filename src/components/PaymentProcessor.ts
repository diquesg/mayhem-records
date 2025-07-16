// components/PaymentProcessor.ts
export const processPayment = async (method: string, amount: number) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  let isSuccess = true;
  
  if (method === 'pix' && amount > 5000) {
    isSuccess = false;
  } else if (method.includes('card') && amount > 3000) {
    isSuccess = false;
  }
  
  if (isSuccess) {
    isSuccess = Math.random() > 0.1;
  }

  if (isSuccess) {
    return {
      success: true,
      transactionId: `TRX-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      timestamp: new Date().toISOString(),
      method,
      amount
    };
  } else {
    let errorMessage = "Pagamento recusado. Por favor, tente novamente.";
    
    if (method === 'pix' && amount > 5000) {
      errorMessage = "Limite excedido para PIX (R$ 5.000,00)";
    } else if (method.includes('card') && amount > 3000) {
      errorMessage = "Limite excedido para cartões (R$ 3.000,00)";
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
};