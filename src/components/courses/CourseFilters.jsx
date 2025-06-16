import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CourseFilters = ({ filters, setFilters, categories, resetFilters, isMobileFiltersOpen, setIsMobileFiltersOpen }) => {
  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleCategoryChange = (categoryId) => {
    const updatedCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
    
    setFilters({ ...filters, categories: updatedCategories });
  };

  const handleSortChange = (value) => {
    setFilters({ ...filters, sort: value });
  };

  const handlePriceChange = (value) => {
    setFilters({ ...filters, price: value });
  };

  return (
    <>
      {/* Mobile Filters Toggle */}
      <div className="flex lg:hidden justify-between items-center mb-4">
        <div className="relative w-full mr-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cursos..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setIsMobileFiltersOpen(true)}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Mobile Filters Sidebar */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background p-6 shadow-lg border-l">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filtros</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label className="text-base">Ordenar por</Label>
                <Select value={filters.sort} onValueChange={handleSortChange}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Mais populares</SelectItem>
                    <SelectItem value="recent">Mais recentes</SelectItem>
                    <SelectItem value="price-asc">Preço: menor para maior</SelectItem>
                    <SelectItem value="price-desc">Preço: maior para menor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-base">Preço</Label>
                <Select value={filters.price} onValueChange={handlePriceChange}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os preços</SelectItem>
                    <SelectItem value="free">Somente gratuitos</SelectItem>
                    <SelectItem value="paid">Somente pagos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-base mb-2 block">Categorias</Label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`mobile-category-${category.id}`} 
                        checked={filters.categories.includes(category.id)}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <label
                        htmlFor={`mobile-category-${category.id}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button onClick={resetFilters} variant="outline" className="w-full">
                Limpar filtros
              </Button>
              
              <Button onClick={() => setIsMobileFiltersOpen(false)} className="w-full">
                Aplicar filtros
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Filters */}
      <div className="hidden lg:block space-y-6">
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cursos..."
              value={filters.search}
              onChange={handleSearchChange}
              className="pl-9"
            />
          </div>
        </div>
        
        <div>
          <Label className="text-base">Ordenar por</Label>
          <Select value={filters.sort} onValueChange={handleSortChange}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Mais populares</SelectItem>
              <SelectItem value="recent">Mais recentes</SelectItem>
              <SelectItem value="price-asc">Preço: menor para maior</SelectItem>
              <SelectItem value="price-desc">Preço: maior para menor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-base">Preço</Label>
          <Select value={filters.price} onValueChange={handlePriceChange}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os preços</SelectItem>
              <SelectItem value="free">Somente gratuitos</SelectItem>
              <SelectItem value="paid">Somente pagos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-base mb-2 block">Categorias</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`category-${category.id}`} 
                  checked={filters.categories.includes(category.id)}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <Button onClick={resetFilters} variant="outline" className="w-full">
          Limpar filtros
        </Button>
      </div>
    </>
  );
};

export default CourseFilters;