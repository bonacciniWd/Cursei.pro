import { Drink } from "@/types/drinks";
import { TagIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface DrinkCardProps {
  drink: Drink;
}

export default function DrinkCard({ drink }: DrinkCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100 animate-fade-in-up h-full flex flex-col">
      <div className="relative h-52 sm:h-64">
        <Image
          src={drink.imagem}
          alt={drink.nome}
          className="transition-transform duration-300 hover:scale-105"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute top-3 right-3 bg-green-600 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1 shadow-lg transform transition-transform hover:scale-110">
          <TagIcon className="w-4 h-4 text-white" />
          <span className="text-white font-bold text-sm">
            R$ {drink.preco.toFixed(2).replace('.', ',')}
          </span>
        </div>
        {drink.categoria && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full px-3 py-1 shadow-lg transform transition-transform hover:scale-110">
            <span className="text-white text-xs font-medium">{drink.categoria}</span>
          </div>
        )}
        
        {/* Bandeira italiana para sodas italianas */}
        {drink.nome.includes('Soda Italiana') && (
          <div className="absolute bottom-3 right-3 overflow-hidden flex shadow-lg">
            <div className="w-4 h-7 bg-green-600"></div>
            <div className="w-4 h-7 bg-white"></div>
            <div className="w-4 h-7 bg-red-600"></div>
          </div>
        )}
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{drink.nome}</h3>
        <p className="text-gray-600 text-sm leading-relaxed flex-grow">
          {drink.descricao}
        </p>
        <div className="mt-4 pt-2 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs text-gray-500">{drink.categoria || 'Clássico'}</span>
          <span className="text-sm font-medium text-emerald-600">
            R$ {drink.preco.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>
    </div>
  );
}
