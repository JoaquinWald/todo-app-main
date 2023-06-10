import { useEffect, useState } from "react";
import iconMoon from '../images/icon-moon.svg';
import iconSun from '../images/icon-sun.svg';

export const ThemeSwitcher = () => {

  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    window.matchMedia('prefer-color-scheme: dark').matches ? setTheme('dark') : setTheme('light');
  }, []);

  useEffect(() => {
    theme === 'dark' ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  const themeTypeImage = theme === 'dark' ? iconSun : iconMoon;


  return (
    <button
      onClick={handleThemeSwitch}
    >
      <img
        src={themeTypeImage}
        alt=""
      />
    </button>
  )
}
