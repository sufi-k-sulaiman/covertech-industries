import About from './pages/About';
import Contact from './pages/Contact';
import Dealer from './pages/Dealer';
import DesignCenter from './pages/DesignCenter';
import Home from './pages/Home';
import Learn from './pages/Learn';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Resources from './pages/Resources';
import Warranties from './pages/Warranties';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Contact": Contact,
    "Dealer": Dealer,
    "DesignCenter": DesignCenter,
    "Home": Home,
    "Learn": Learn,
    "ProductDetails": ProductDetails,
    "Products": Products,
    "Resources": Resources,
    "Warranties": Warranties,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};