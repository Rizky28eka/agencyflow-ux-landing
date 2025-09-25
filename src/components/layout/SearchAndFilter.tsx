import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';

interface FilterOption {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

interface SearchAndFilterProps {
  searchPlaceholder?: string;
  filters?: FilterOption[];
  onSearch?: (query: string) => void;
  onFilter?: (filters: Record<string, string>) => void;
  onClear?: () => void;
}

export const SearchAndFilter = ({ 
  searchPlaceholder = "Search...", 
  filters = [], 
  onSearch, 
  onFilter, 
  onClear 
}: SearchAndFilterProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilter?.(newFilters);
  };

  const handleClear = () => {
    setSearchQuery('');
    setActiveFilters({});
    onClear?.();
  };

  const hasActiveFilters = searchQuery || Object.keys(activeFilters).length > 0;

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Select
            key={filter.key}
            value={activeFilters[filter.key] || ''}
            onValueChange={(value) => handleFilterChange(filter.key, value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={filter.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All {filter.label}</SelectItem>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={handleClear}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};