import Main from "./Main";
import { AuthProvider } from "./auth/AuthContext";
import EventProvider from "./components/Pages/EventContext";
import CategoriesProvider from "./components/Pages/CategoriesContext";

function App() {
  return (
    <div className="page">
      <AuthProvider>
        <EventProvider>
          <CategoriesProvider>
            <Main />
          </CategoriesProvider>
        </EventProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
