import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = 
  | "featured" 
  | "price-high-to-low" 
  | "price-low-to-high" 
  | "name-a-z" 
  | "name-z-a" 
  | "best-sellers";

interface ProductSortProps {
  onSort: (value: SortOption) => void;
  currentSort: SortOption;
}

export function ProductSort({ onSort, currentSort }: ProductSortProps) {
  return (
    <div className="flex items-center gap-3 mb-6 justify-center md:justify-end">
      <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by</span>
      <Select value={currentSort} onValueChange={onSort}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="price-high-to-low">Price: High to Low</SelectItem>
          <SelectItem value="price-low-to-high">Price: Low to High</SelectItem>
          <SelectItem value="name-a-z">Name: A to Z</SelectItem>
          <SelectItem value="name-z-a">Name: Z to A</SelectItem>
          <SelectItem value="best-sellers">Best Sellers First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
} 