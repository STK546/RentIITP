import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App; 