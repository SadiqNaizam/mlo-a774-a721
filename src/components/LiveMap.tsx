import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Bike, Home, UtensilsCrossed } from 'lucide-react';

// Define a type for a position on the map
type Position = {
  top: string;
  left: string;
};

// A mock path for the courier to follow from the restaurant to the user's home
const mockPath: Position[] = [
  { top: '20%', left: '15%' },
  { top: '25%', left: '30%' },
  { top: '40%', left: '45%' },
  { top: '55%', left: '50%' },
  { top: '70%', left: '65%' },
  { top: '80%', left: '80%' },
];

const LiveMap: React.FC = () => {
  console.log('LiveMap component loaded');

  const [courierPositionIndex, setCourierPositionIndex] = useState(0);

  useEffect(() => {
    // Simulate the courier moving along the path every 3 seconds
    const interval = setInterval(() => {
      setCourierPositionIndex(prevIndex => {
        // Stop moving once the last point is reached
        if (prevIndex >= mockPath.length - 1) {
          clearInterval(interval);
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 3000); // Update position every 3 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const currentPosition = mockPath[courierPositionIndex];
  const restaurantPosition: Position = { top: '15%', left: '10%' };
  const userPosition: Position = { top: '85%', left: '85%' };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Live Delivery Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 
          This is a placeholder for a real map implementation (e.g., Google Maps, Mapbox).
          It simulates a courier's movement with animated icons on a grid background.
        */}
        <div
          className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden bg-gray-100 border"
          style={{
            backgroundImage: `url('data:image/svg+xml;utf8,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(204, 204, 204, 0.5)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>')`,
            backgroundSize: '25px 25px',
          }}
        >
          {/* Restaurant Icon */}
          <div
            className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-full"
            style={{ top: restaurantPosition.top, left: restaurantPosition.left, zIndex: 10 }}
            title="Restaurant"
          >
            <UtensilsCrossed className="h-8 w-8 text-red-500 bg-white rounded-full p-1.5 shadow-md" />
            <span className="text-xs font-semibold text-gray-700 mt-1">Restaurant</span>
          </div>

          {/* User/Home Icon */}
          <div
            className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-full"
            style={{ top: userPosition.top, left: userPosition.left, zIndex: 10 }}
            title="Your Location"
          >
            <Home className="h-8 w-8 text-blue-500 bg-white rounded-full p-1.5 shadow-md" />
            <span className="text-xs font-semibold text-gray-700 mt-1">Home</span>
          </div>

          {/* Courier Icon */}
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1500 ease-linear"
            style={{ top: currentPosition.top, left: currentPosition.left, zIndex: 20 }}
            title="Courier"
          >
            <Bike className="h-10 w-10 text-green-600 bg-white rounded-full p-2 shadow-lg animate-pulse" />
          </div>

          {/* Dotted line representing the path (optional visual) */}
          <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 5 }}>
            <path
              d={`M ${parseFloat(restaurantPosition.left)}% ${parseFloat(restaurantPosition.top)}% 
                 C 30% 20%, 60% 70%, ${parseFloat(userPosition.left)}% ${parseFloat(userPosition.top)}%`}
              stroke="#a0aec0"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveMap;