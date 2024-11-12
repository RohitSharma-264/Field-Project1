import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users2 } from 'lucide-react';
import CreateGroup from './CreateGroup';

interface MovieCardProps {
  title: string;
  image: string;
  rating: number;
  languages: string[];
}

export default function MovieCard({ title, image, rating, languages }: MovieCardProps) {
  const navigate = useNavigate();
  const [showGroupModal, setShowGroupModal] = useState(false);

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/movie/${encodeURIComponent(title)}`);
  };

  const handleGroupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowGroupModal(true);
  };

  return (
    <>
      <div className="group cursor-pointer" onClick={handleBookClick}>
        <div className="relative overflow-hidden rounded-lg">
          <img 
            src={image} 
            alt={title}
            className="w-full h-[360px] object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <div className="flex items-center gap-2">
              <span className="bg-zinc-900/80 text-green-500 px-2 py-0.5 rounded text-sm">
                {rating}★
              </span>
              <span className="text-white text-sm">
                {languages.join(", ")}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <h3 className="font-medium text-lg">{title}</h3>
          <button
            onClick={handleGroupClick}
            className="text-rose-500 hover:text-rose-600 text-sm flex items-center gap-1"
          >
            <Users2 size={16} />
            Book as Group
          </button>
        </div>
      </div>

      {showGroupModal && (
        <CreateGroup
          totalAmount={1000} // This would be dynamic in a real app
          onClose={() => setShowGroupModal(false)}
        />
      )}
    </>
  );
}