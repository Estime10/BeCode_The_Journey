import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import BuildingPage from "./pages/BuildingPage";
import FavoritesPage from "./pages/FavoritesPage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import UploadedPage from "./pages/UploadedPage";
import UploadPage from "./pages/UploadPage";
import FiltersPage from "./pages/FiltersPage";
import TermsPage from "./pages/TermsPage";
import DiscussionsPage from "./pages/DiscussionsPage";
const App = () => {
  return (
    <div className="h-screen w-full p-0 m-0">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage className="homepage" />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route
            path="/building/:id" element= {<BuildingPage/>}
          />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/discussions" element={<DiscussionsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/uploaded" element={<UploadedPage/>}/>
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/filters" element={<FiltersPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
