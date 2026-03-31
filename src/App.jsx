import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import './styles/globals.css';
import './styles/animations.css';

function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    });
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.style.background = '#030712';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.background = '#f8fafc';
    }
  }, [isDark]);

  return (
    <BrowserRouter>
      <div className={isDark ? 'dark' : ''}>
        <Navbar isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />
        <main>
          <Home />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
