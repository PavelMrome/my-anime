import React from'react';
import './App.css';
import './Reset.css';
import UpdatesSlider from './Slider.js';
import './Main.css';




function App() {
    return (
        <div className="App">
            <header className="App-header">
                <nav className="App-nav">
                    <ul className="App-nav-links">
                        <li><img className='img' src='\cat.jpg'></img></li>
                        <li><a href="#">Главная</a></li>
                        <li><a href="#">Аниме</a></li>
                        <li><a href="#">Не придумал</a></li>
                    </ul>

                    <div className='App-input'>
                    <input type="text" className="App-search" placeholder="Search..." />
                    <button className="App-button">Search</button>
                    </div>
                </nav>

            </header>
            <main className='App-main'>


                <UpdatesSlider/>
            </main>

            <footer className="App-footer">

            </footer>

        </div>
    );
}

export default App;