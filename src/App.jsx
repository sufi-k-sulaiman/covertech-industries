import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import WinterCoverGuide from './pages/WinterCoverGuide';
import SolarBlanketGuide from './pages/SolarBlanketGuide';
import SpaCovers from './pages/SpaCovers';
import PortfolioProject from './pages/PortfolioProject';
import CustomPoolLiners from './pages/CustomPoolLiners';
import CustomInGroundLiners from './pages/CustomInGroundLiners';
import PoolVisualizer from './pages/PoolVisualizer';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
   return (
     <Routes>
       <Route path="/" element={
         <LayoutWrapper currentPageName={mainPageKey}>
           <MainPage />
         </LayoutWrapper>
       } />
       <Route path="/insulation/*" element={<Navigate to="/ProductDetails?slug=pool-insulation" replace />} />
       <Route path="/mesh/*" element={<Navigate to="/ProductDetails?slug=safety-covers" replace />} />
       <Route path="/deluxe-mesh/*" element={<Navigate to="/ProductDetails?slug=safety-covers" replace />} />
       <Route path="/standard-mesh/*" element={<Navigate to="/ProductDetails?slug=safety-covers" replace />} />
       <Route path="/commercial-mesh/*" element={<Navigate to="/ProductDetails?slug=safety-covers" replace />} />
       <Route path="/lightweight-solid/*" element={<Navigate to="/ProductDetails?slug=safety-covers" replace />} />
       <Route path="/supreme-solid/*" element={<Navigate to="/ProductDetails?slug=safety-covers" replace />} />
       <Route path="/pool-liners/*" element={<Navigate to="/ProductDetails?slug=in-ground-liners" replace />} />
       <Route path="/solar-pool-covers/*" element={<Navigate to="/ProductDetails?slug=solar-covers" replace />} />
       <Route path="/winter-pool-covers/*" element={<Navigate to="/ProductDetails?slug=winter-covers" replace />} />
       <Route path="/product-category/insulation/*" element={<Navigate to="/ProductDetails?slug=pool-insulation" replace />} />
       <Route path="/product-category/mesh/*" element={<Navigate to="/ProductDetails?slug=safety-covers" replace />} />
       <Route path="/safety-cover-warranty/*" element={<Navigate to="/Warranties" replace />} />
       <Route path="/safety-cover-registration/*" element={<Navigate to="/Warranties" replace />} />
       <Route path="/safety-warranty-1d/*" element={<Navigate to="/Warranties" replace />} />
       <Route path="/liner-warranty-inground/*" element={<Navigate to="/Warranties" replace />} />
       <Route path="/winter-cover-warranty/*" element={<Navigate to="/Warranties" replace />} />
       <Route path="/vinyl-liner-registration/*" element={<Navigate to="/Warranties" replace />} />
       <Route path="/solar-blanket-warranty-english/*" element={<Navigate to="/Warranties" replace />} />
       <Route path="/toolbox/*" element={<Navigate to="/Resources" replace />} />
       <Route path="/portfolio/detroit/*" element={<Navigate to="/portfolio/resort-pool" replace />} />
       <Route path="/portfolio/carnival/*" element={<Navigate to="/portfolio/aqua-space" replace />} />
       <Route path="/portfolio/paradiso/*" element={<Navigate to="/portfolio/carrara-marble" replace />} />
       <Route path="/portfolio/white-diffusion/*" element={<Navigate to="/portfolio/aqua-space" replace />} />
       <Route path="/portfolio/*" element={<Navigate to="/Gallery" replace />} />
       <Route path="/portfolio-type/*" element={<Navigate to="/Gallery" replace />} />
       <Route path="/author/*" element={<Navigate to="/" replace />} />
       <Route path="/25-year-limited-warranty/*" element={<Navigate to="/Warranties" replace />} />
       <Route path="/shop/insulation/*" element={<Navigate to="/ProductDetails?slug=pool-insulation" replace />} />
       <Route path="/winter-pool-safety-covers/*" element={<Navigate to="/ProductDetails?slug=winter-covers" replace />} />
       <Route path="/in-ground-pool-liners/*" element={<Navigate to="/ProductDetails?slug=in-ground-liners" replace />} />
       <Route path="/product-category/spa-covers/*" element={<Navigate to="/Products" replace />} />
       <Route path="/product-category/winter-pool-safety-covers/*" element={<Navigate to="/ProductDetails?slug=winter-covers" replace />} />
       <Route path="/product-category/in-ground-pool-liners/*" element={<Navigate to="/ProductDetails?slug=in-ground-liners" replace />} />
       <Route path="/shop/above-ground-liners/*" element={<Navigate to="/ProductDetails?slug=above-ground-liners" replace />} />
       <Route path="/shop/tarps-curing-blankets/*" element={<Navigate to="/ProductDetails?slug=curing-blankets" replace />} />
       <Route path="/shop/in-ground-pool-liners/*" element={<Navigate to="/ProductDetails?slug=in-ground-liners" replace />} />
       <Route path="/product-category/golf-green-sports-field-covers/*" element={<Navigate to="/ProductDetails?slug=golf-covers" replace />} />
       <Route path="/shop/winter-pool-covers/*" element={<Navigate to="/ProductDetails?slug=winter-covers" replace />} />
       <Route path="/shop/solar-pool-covers/*" element={<Navigate to="/ProductDetails?slug=solar-covers" replace />} />
       <Route path="/page/:page" element={<Navigate to="/Products" replace />} />
       <Route path="/wp-content/uploads/*" element={<Navigate to="/Resources" replace />} />
       <Route path="/when-to-use-and-remove-your-supreme-green-turf-cover/*" element={<Navigate to="/Resources" replace />} />
       <Route path="/shop/winter-pool-safety-covers/*" element={<Navigate to="/ProductDetails?slug=winter-covers" replace />} />
       <Route path="/shop/golf-green-sports-field-covers/*" element={<Navigate to="/ProductDetails?slug=golf-covers" replace />} />
       <Route path="/product-category/winter-pool-covers/*" element={<Navigate to="/ProductDetails?slug=winter-covers" replace />} />
       <Route path="/product-category/tarps-curing-blankets/*" element={<Navigate to="/ProductDetails?slug=curing-blankets" replace />} />
       <Route path="/product-category/solar-pool-covers/*" element={<Navigate to="/ProductDetails?slug=solar-covers" replace />} />
       <Route path="/winter-cover-installation-and-use/*" element={<Navigate to="/Learn" replace />} />
       <Route path="/solar-blanket-installation-and-use/*" element={<Navigate to="/Learn" replace />} />
       <Route path="/golf-green-sports-field-covers/*" element={<Navigate to="/ProductDetails?slug=golf-covers" replace />} />
       <Route path="/solar-blanket-warranty-online-registration/*" element={<Navigate to="/Warranties" replace />} />
       <Route path="/winter-cover-installation-and-use/*" element={<Navigate to="/WinterCoverGuide" replace />} />
       <Route path="/solar-blanket-installation-and-use/*" element={<Navigate to="/SolarBlanketGuide" replace />} />
       <Route path="/product-category/spa-covers/*" element={<Navigate to="/SpaCovers" replace />} />
       <Route path="/portfolio/:projectId" element={<LayoutWrapper currentPageName="Portfolio"><PortfolioProject /></LayoutWrapper>} />
       <Route
         path="/WinterCoverGuide"
         element={
           <LayoutWrapper currentPageName="WinterCoverGuide">
             <WinterCoverGuide />
           </LayoutWrapper>
         }
       />
       <Route
         path="/SolarBlanketGuide"
         element={
           <LayoutWrapper currentPageName="SolarBlanketGuide">
             <SolarBlanketGuide />
           </LayoutWrapper>
         }
       />
       <Route
         path="/SpaCovers"
         element={
           <LayoutWrapper currentPageName="SpaCovers">
             <SpaCovers />
           </LayoutWrapper>
         }
       />
       <Route
         path="/CustomPoolLiners"
         element={
           <LayoutWrapper currentPageName="CustomPoolLiners">
             <CustomPoolLiners />
           </LayoutWrapper>
         }
       />
       <Route
         path="/CustomInGroundLiners"
         element={
           <LayoutWrapper currentPageName="CustomInGroundLiners">
             <CustomInGroundLiners />
           </LayoutWrapper>
         }
       />
       <Route
         path="/PoolVisualizer"
         element={
           <LayoutWrapper currentPageName="PoolVisualizer">
             <PoolVisualizer />
           </LayoutWrapper>
         }
       />
       {Object.entries(Pages).map(([path, Page]) => (
         <Route
           key={path}
           path={`/${path}`}
           element={
             <LayoutWrapper currentPageName={path}>
               <Page />
             </LayoutWrapper>
           }
         />
       ))}
       <Route path="*" element={<PageNotFound />} />
     </Routes>
   );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App