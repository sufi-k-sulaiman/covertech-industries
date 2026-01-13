import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Dealer from './pages/Dealer';
import Resources from './pages/Resources';
import Learn from './pages/Learn';
import DesignCenter from './pages/DesignCenter';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "About": About,
    "Contact": Contact,
    "Dealer": Dealer,
    "Resources": Resources,
    "Learn": Learn,
    "DesignCenter": DesignCenter,
    "Products": Products,
    "ProductDetails": ProductDetails,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};