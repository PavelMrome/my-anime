import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './anime-list.css';
import { Link } from 'react-router-dom'; // Импортируем Link для навигации

const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

const AnimeList = () => {
  const [animeSchedule, setAnimeSchedule] = useState([]);
  const [selectedDay, setSelectedDay] = useState(5); // По умолчанию, день - суббота (индекс 5)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeSchedule = async () => {
      try {
        const response = await axios.get('https://api.anilibria.tv/v3/title/schedule?days=0,1,2,3,4,5,6');
        setAnimeSchedule(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке расписания аниме:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeSchedule();
  }, []);

  if (loading) return <p>Загрузка...</p>;

  const handleDayChange = (dayIndex) => {
    setSelectedDay(dayIndex);
  };

  return (
    <div className='anime-list'>
      <div className='list-buttons'>
        {daysOfWeek.map((dayName, index) => (
          <button 
            key={index} 
            onClick={() => handleDayChange(index)} 
            style={{
              margin: '0 5px', 
              padding: '8px 12px', 
              backgroundColor: selectedDay === index ? '#007bff' : '#e0e0e0',
              color: selectedDay === index ? '#fff' : '#000',
            }}
          >
            {dayName}
          </button>
        ))}
      </div>

      <ul className='anime-list-card'>
        {animeSchedule
          .filter(day => day.day === selectedDay)
          .flatMap(day => day.list)
          .map(anime => (
            <li key={anime.id}>
              <Link to={`/anime/${anime.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img className='list-img' src={`https://www.anilibria.tv${anime.posters.medium.url}`} alt={anime.names.ru || anime.names.en} />
                <h4>{anime.names.ru || anime.names.en}</h4>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AnimeList;
