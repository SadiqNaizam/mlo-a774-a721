import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Soup, Bike, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the possible statuses for the order
export type OrderStatus = 'confirmed' | 'preparing' | 'delivery' | 'delivered';

// Define the props for the OrderTracker component
interface OrderTrackerProps {
  status: OrderStatus;
}

// Define the structure for each stage in the tracker
const stages = [
  {
    id: 'confirmed',
    label: 'Order Confirmed',
    icon: <CheckCircle2 className="h-6 w-6" />,
  },
  {
    id: 'preparing',
    label: 'Preparing Food',
    icon: <Soup className="h-6 w-6" />,
  },
  {
    id: 'delivery',
    label: 'Out for Delivery',
    icon: <Bike className="h-6 w-6" />,
  },
  {
    id: 'delivered',
    label: 'Delivered',
    icon: <Home className="h-6 w-6" />,
  },
];

const OrderTracker: React.FC<OrderTrackerProps> = ({ status = 'confirmed' }) => {
  console.log(`OrderTracker loaded with status: ${status}`);

  const currentStageIndex = stages.findIndex(stage => stage.id === status);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Track Your Order</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-start md:items-center relative">
          {stages.map((stage, index) => {
            const isCompleted = index < currentStageIndex;
            const isActive = index === currentStageIndex;

            return (
              <React.Fragment key={stage.id}>
                <div className="flex flex-col items-center text-center z-10">
                  <div
                    className={cn(
                      'flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300',
                      isCompleted ? 'bg-green-500 border-green-600 text-white' : '',
                      isActive ? 'bg-blue-500 border-blue-600 text-white' : '',
                      !isCompleted && !isActive ? 'bg-gray-100 border-gray-300 text-gray-400' : ''
                    )}
                  >
                    {stage.icon}
                  </div>
                  <p
                    className={cn(
                      'mt-2 text-xs md:text-sm font-medium',
                      (isCompleted || isActive) ? 'text-gray-800' : 'text-gray-500'
                    )}
                  >
                    {stage.label}
                  </p>
                </div>
                {/* Connector line, not shown after the last item */}
                {index < stages.length - 1 && (
                  <div className={cn(
                    'flex-1 h-1 self-start mt-6 transition-colors duration-300',
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  )}></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracker;