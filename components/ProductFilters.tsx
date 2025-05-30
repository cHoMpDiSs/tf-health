import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface ProductFiltersProps {
  categories: string[];
  onFilterChange: (filters: {
    categories: string[];
    priceRange: [number, number];
    bestSellersOnly: boolean;
  }) => void;
  minPrice: number;
  maxPrice: number;
}

export function ProductFilters({
  categories,
  onFilterChange,
  minPrice,
  maxPrice,
}: ProductFiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [bestSellersOnly, setBestSellersOnly] = useState(false);

  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(updatedCategories);
    onFilterChange({
      categories: updatedCategories,
      priceRange,
      bestSellersOnly,
    });
  };

  const handlePriceChange = (value: number[]) => {
    const newPriceRange: [number, number] = [value[0], value[1]];
    setPriceRange(newPriceRange);
    onFilterChange({
      categories: selectedCategories,
      priceRange: newPriceRange,
      bestSellersOnly,
    });
  };

  const handleBestSellerChange = (checked: boolean) => {
    setBestSellersOnly(checked);
    onFilterChange({
      categories: selectedCategories,
      priceRange,
      bestSellersOnly: checked,
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label htmlFor={category} className="capitalize">
                    {category.replace('-', ' ')}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Price Range</h3>
            <div className="px-2">
              <Slider
                min={minPrice}
                max={maxPrice}
                step={1}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={handlePriceChange}
                className="mt-2"
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="bestSellers"
                checked={bestSellersOnly}
                onCheckedChange={(checked) => handleBestSellerChange(checked as boolean)}
              />
              <Label htmlFor="bestSellers">Best Sellers Only</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 