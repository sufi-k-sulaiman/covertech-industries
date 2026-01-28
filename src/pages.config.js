import About from './pages/About';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import Dealer from './pages/Dealer';
import DesignCenter from './pages/DesignCenter';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import Learn from './pages/Learn';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Resources from './pages/Resources';
import TermsOfService from './pages/TermsOfService';
import Warranties from './pages/Warranties';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Admin": Admin,
    "Contact": Contact,
    "Dealer": Dealer,
    "DesignCenter": DesignCenter,
    "Gallery": Gallery,
    "Home": Home,
    "Learn": Learn,
    "PrivacyPolicy": PrivacyPolicy,
    "ProductDetails": ProductDetails,
    "Products": Products,
    "Resources": Resources,
    "TermsOfService": TermsOfService,
    "Warranties": Warranties,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};