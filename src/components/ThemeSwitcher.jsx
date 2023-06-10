import { useEffect, useState } from "react";
// import iconMoon from '../../images/icon-moon.svg';
// import iconSun from '../../images/icon-sun.svg';

import iconMoon from 'https://res.cloudinary.com/dt0foxzt0/image/upload/v1686362880/todo-app-main-frontend-mentor/icon-moon_niuwb3.svg';
import iconSun from 'https://res.cloudinary.com/dt0foxzt0/image/upload/v1686362880/todo-app-main-frontend-mentor/icon-sun_ufrfif.svg';

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
