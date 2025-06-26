import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

interface MenuItemCardProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  onAddToCart?: (item: { id: string | number; name: string; price: number }) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
}) => {
  console.log('MenuItemCard loaded for:', name);

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart({ id, name, price });
    }
    toast.success(`${name} has been added to your cart!`);
  };

  return (
    <Card className="flex w-full overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/50">
      <div className="flex-1 p-4 flex justify-between items-start gap-4">
        <div className="flex flex-col justify-between h-full">
            <div>
                <h3 className="text-lg font-semibold mb-1">{name}</h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{description}</p>
            </div>
            <p className="text-base font-bold text-foreground">${price.toFixed(2)}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
             <div className="w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden flex-shrink-0">
                <img
                    src={imageUrl || 'https://via.placeholder.com/150'}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>
            <Button size="sm" className="w-full" onClick={handleAddToCartClick}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add
            </Button>
        </div>
      </div>
    </Card>
  );
};

export default MenuItemCard;