import { Route, Routes } from 'react-router-dom';
import Confirm from './pages/Confirm';
import NotFound from './pages/NotFound';
import Schedule from './pages/Schedule';
import Home from './pages/Home';
import Layout from './components/Layout';
import GuestProvider from './context/GuestProvider';
import Menu from './pages/Menu';
import LogInPage from './pages/LogInPage';
// import NotAllowed from './pages/NotAllowed';
import Dashboard from './pages/Dashboard';
import AdminLayout from './pages/AdminLayout';
import AddGuest from './pages/AddGuest';
import GalleryPage from './pages/GalleryPage';

function App() {
  return (
    <>
      <GuestProvider>
        <Routes>
          <Route path='/admn-lgn' element={<LogInPage />} />
          <Route path='/admn' element={<AdminLayout />}>
            <Route index element={<AddGuest />} />
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
          <Route path='/:id' element={<Layout />}>
            <Route index element={<Confirm />} />
            <Route path='wellcome' element={<Home />} />
            <Route path='gallery' element={<GalleryPage />} />
            <Route path='schedule' element={<Schedule />} />
          </Route>
          <Route path='*' element={<NotFound />} />
          {/* <Route path='ntalwd' element={<NotAllowed />} /> */}
        </Routes>
      </GuestProvider>
    </>
  );
}

export default App;
