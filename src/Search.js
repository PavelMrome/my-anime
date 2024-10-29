import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

function AnimeSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate(); // Создаем экземпляр navigate

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value) {
            try {
                const response = await axios.get(`https://api.anilibria.tv/v3/title/search?search=${value}&limit=10`);
                console.log("Response from API:", response.data);
                if (Array.isArray(response.data)) {
                    setSuggestions(response.data);
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                console.error("Ошибка при поиске аниме:", error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (anime) => {
        navigate(`/anime/${anime.id}`); // Переходим на страницу деталей аниме
        setSearchTerm('');
        setSuggestions([]);
    };

    return (
        <div className="anime-search">
            <input 
                type="text" 
                value={searchTerm} 
                onChange={handleInputChange} 
                className="App-search" 
                placeholder="Поиск аниме..." 
            />
            {suggestions.length > 0 && (
                <div className="suggestions">
                    {suggestions.map(anime => (
                        <div 
                            key={anime.id} 
                            className="suggestion" 
                            onClick={() => handleSuggestionClick(anime)} 
                            onMouseEnter={() => console.log(`Hovered over: ${anime.names.ru || anime.names.en}`)} // Для отладки
                        >
                            {anime.names.ru || anime.names.en}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AnimeSearch;

