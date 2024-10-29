import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AnimeDetail.css';
import HlsPlayer from 'react-hls-player'; // Импортируем HlsPlayer

function AnimeDetail() {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [videoUrl, setVideoUrl] = useState(''); // Состояние для видео URL
    const [selectedEpisode, setSelectedEpisode] = useState(1); // Состояние для выбранного эпизода

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const response = await axios.get(`https://api.anilibria.tv/v3/title?id=${id}`);
                setAnime(response.data);

                // Получаем HLS для первого эпизода по умолчанию
                const initialEpisode = response.data.player.list[selectedEpisode];
                const videoPath = `https://cache.libria.fun${initialEpisode.hls.hd}`; // Используем hd
                setVideoUrl(videoPath);
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchAnime();
    }, [id]);

    useEffect(() => {
        if (anime) {
            const episodeData = anime.player.list[selectedEpisode];
            if (episodeData) {
                const videoPath = `https://cache.libria.fun${episodeData.hls.hd}`; // Используем hd
                setVideoUrl(videoPath);
            }
        }
    }, [selectedEpisode, anime]);

    if (!anime) return <div>Загрузка...</div>;

    return (
        <div className='anime-detail'>
            <div className='detail-wrapper'>
                <h1 className='detail-title'>{anime.names.ru || anime.names.en}</h1>
                <img className='detail-img' src={`https://www.anilibria.tv${anime.posters.small.url}`} alt={anime.names.ru} />

                <div className='detail-info'>
                    <h1 className='detail-info-word'>Информация</h1>
                    <p className='detail-genres'>Жанры: {anime.genres.join(', ')}</p>
                    <p className='detail-genres'>Эпизоды: {anime.player.episodes.string}</p>
                    <p className='detail-time'>Дата выхода: {anime.season.year}</p>
                    <p className='detail-status'>Статус: {anime.status.string}</p>
                </div>

                <div className='detail-description'>
                    <p>{anime.description}</p>
                </div>

                {/* Выпадающее меню для выбора эпизода */}
                <div className="episode-selector">
                    <label htmlFor="episode-select"></label>
                    <select
                        id="episode-select"
                        value={selectedEpisode}
                        onChange={(e) => setSelectedEpisode(Number(e.target.value))}
                    >
                        {Array.from({ length: anime.player.episodes.last }, (_, index) => (
                            <option className='option-episode' key={index + 1} value={index + 1}>
                                Эпизод {index + 1}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Воспроизведение видео */}
                {videoUrl && (
                    <HlsPlayer className='video-player'
                        src={videoUrl}
                        autoPlay={false}
                        controls={true}
                        width="100%"
                        height="auto"
                    />
                )}
            </div>
        </div>
    );
}

export default AnimeDetail;
