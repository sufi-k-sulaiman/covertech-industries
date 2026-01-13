import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "About": About,
    "Contact": Contact,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};