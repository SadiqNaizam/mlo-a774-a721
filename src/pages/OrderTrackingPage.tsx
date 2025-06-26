import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTracker, { OrderStatus } from '@/components/OrderTracker';
import LiveMap from '@/components/LiveMap';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Clock, ShoppingBag } from 'lucide-react';

const OrderTrackingPage: React.FC = () => {
  console.log('OrderTrackingPage loaded');

  const [status, setStatus] = useState<OrderStatus>('confirmed');

  // Simulate order progress
  useEffect(() => {
    const statuses: OrderStatus[] = ['preparing', 'delivery', 'delivered'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < statuses.length) {
        setStatus(statuses[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 8000); // Change status every 8 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const getStatusMessage = () => {
    switch (status) {
      case 'confirmed':
        return { title: 'Order Confirmed!', description: "We've received your order and the restaurant is getting ready." };
      case 'preparing':
        return { title: 'Food is being prepared!', description: 'The chef is working on your delicious meal.' };
      case 'delivery':
        return { title: 'On its way!', description: 'Your courier is heading towards you. Track them on the map!' };
      case 'delivered':
        return { title: 'Enjoy your meal!', description: 'Your order has been delivered.' };
      default:
        return { title: 'Order Status', description: 'Checking for the latest updates.' };
    }
  };

  const statusMessage = getStatusMessage();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Your Order is in Progress</h1>
            <p className="text-muted-foreground mt-2">Order #DD-123456</p>
          </div>

          <div className="mb-8">
            <OrderTracker status={status} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LiveMap />
            </div>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>Estimated Arrival: 7:30 PM</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert className={
                    status === 'delivery' ? 'border-blue-500' :
                    status === 'delivered' ? 'border-green-500' : ''
                  }>
                    <Clock className="h-4 w-4" />
                    <AlertTitle>{statusMessage.title}</AlertTitle>
                    <AlertDescription>
                      {statusMessage.description}
                    </AlertDescription>
                  </Alert>

                  <div>
                    <h3 className="font-semibold flex items-center mb-2">
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Your Items
                    </h3>
                    <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                      <li>1x Volcano Roll</li>
                      <li>1x California Roll</li>
                      <li>2x Miso Soup</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTrackingPage;