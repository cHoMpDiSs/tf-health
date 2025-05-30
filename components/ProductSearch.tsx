import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProductSearchProps {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}

export function ProductSearch({ onSearch, searchTerm }: ProductSearchProps) {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search products by name or description..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="pl-9"
      />
    </div>
  );
} 