import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import './Reset.css';
import UpdatesSlider from './Slider.js';
import './Main.css';
import AnimeList from './AnimeList.js';
import AnimeDetail from './AnimeDetail.js';
import AnimeSearch from './Search.js';

function App() {
    const navigate = useNavigate();
    const [animeList, setAnimeList] = useState([]);

    const handleSelectAnime = (anime) => {
        navigate(`/anime/${anime.id}`);
    };

    return (
        
            <div className="App">
                <header className="App-header">
                    <nav className="App-nav">
                        <ul className="App-nav-links">
                            <li><img className='img' src='/cat.jpg' alt="Logo" /></li>
                            <li><a href="/">Главная</a></li>
                            <li><a href="/anime">Аниме</a></li>
                            <li><a href="#">Не придумал</a></li>
                        </ul>

                        <AnimeSearch onSelectAnime={handleSelectAnime} />
                    </nav>
                </header>

                <main className='App-main'>
                    <Routes>
                        <Route path="/" element={<>
                            <UpdatesSlider />
                            <AnimeList />
                        </>} />
                        <Route path="/anime/:id" element={<AnimeDetail />} />
                    </Routes>
                </main>

                <footer className="App-footer">
                    {/* Контент футера */}
                </footer>
            </div>
        
    );
}

export default App;
