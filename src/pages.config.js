import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Dealer from './pages/Dealer';
import Resources from './pages/Resources';
import Learn from './pages/Learn';
import DesignCenter from './pages/DesignCenter';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "About": About,
    "Contact": Contact,
    "Dealer": Dealer,
    "Resources": Resources,
    "Learn": Learn,
    "DesignCenter": DesignCenter,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};