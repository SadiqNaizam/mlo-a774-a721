import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface RestaurantCardProps {
  id: string | number;
  slug: string;
  name: string;
  imageUrl: string;
  cuisine: string;
  rating: number;
  deliveryTime: number; // in minutes
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  slug,
  name,
  imageUrl,
  cuisine,
  rating,
  deliveryTime,
}) => {
  console.log('RestaurantCard loaded for:', name);

  // As per the App.tsx, the route to the menu is static.
  // The 'slug' prop is included for future-proofing if routes become dynamic,
  // e.g., `/restaurant-menu/${slug}`.
  const restaurantUrl = '/restaurant-menu';

  return (
    <Link to={restaurantUrl} className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg">
      <Card className="w-full overflow-hidden transition-all duration-300 group-hover:shadow-xl">
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225'}
              alt={`Image of ${name}`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold leading-tight truncate pr-2">{name}</h3>
            <Badge variant="secondary">{cuisine}</Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground space-x-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{deliveryTime} min</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;