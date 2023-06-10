import { ThemeSwitcher } from "./ThemeSwitcher";
import { PropTypes } from "prop-types";



export const Header = ({ anchoPantalla, bgImageDesktop, bgImageMobile, onThemeSwitch }) => {

  Header.propTypes = {
    anchoPantalla: PropTypes.number.isRequired,
    bgImageDesktop: PropTypes.string.isRequired,
    bgImageMobile: PropTypes.string.isRequired,
    onThemeSwitch: PropTypes.func.isRequired,
  }

  return (
    <header className='relative'>
      <div className={`${anchoPantalla >= 768 ? 'block' : 'flex justify-center'}`}>

        <picture className='relative grid'>

          <source media='(min-width: 768px)' srcSet={bgImageDesktop} />
          <img className='h-48 w-screen object-cover bg-cover m-0' src={bgImageMobile} alt="background image" />

          <div className='absolute w-[90%] sm:w-[70%] lg:w-[50%] grid grid-cols-[minmax(50%,_1fr)_minmax(50%,_2fr)] justify-items-center justify-self-center mt-14'>
            <h1 className="justify-self-start text-3xl tracking-more font-bold text-gray-100">
              TODO
            </h1>
            <span
              onClick={onThemeSwitch}
              className='justify-self-end object-contain cursor-pointer'
            >
              <ThemeSwitcher />
            </span>
          </div>

        </picture>

      </div>
    </header>
  )
};