import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

interface TransactionStatus {
  success: boolean;
  message: string;
}

const ConfirmTransaction: React.FC = () => {
  const [status, setStatus] = useState<TransactionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { orderCode } = useParams<{ orderCode: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTransactionStatus = async () => {
      try {
        const encodedOrderCode = encodeURIComponent(orderCode || '');
        const response = await axios.get(`https://localhost:7251/api/orders/payment/status/${encodedOrderCode}`);
        setStatus(response.data);
      } catch (error) {
        console.error('Error fetching transaction status:', error);
        setStatus({ success: false, message: 'Error checking transaction status' });
      } finally {
        setIsLoading(false);
      }
    };

    checkTransactionStatus();

    // Redirect to home page after 5 seconds
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, [orderCode, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-semibold">Checking transaction status...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* {status?.success ? (
        <div className="text-green-600 text-2xl font-bold mb-4">Transaction Successful!</div>
      ) : (
        <div className="text-red-600 text-2xl font-bold mb-4">Transaction Failed</div>
      )} */}
      <div className="text-lg mb-8">{status?.message}</div>
      <div className="text-gray-600">Redirecting to home page in 5 seconds...</div>
    </div>
  );
};

export default ConfirmTransaction;