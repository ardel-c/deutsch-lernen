import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WordProvider } from './context/WordContext';
import Login from './components/Login';
import Navbar from './components/Navbar';
import WordList from './components/WordList';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import AnkiReview from './components/AnkiReview';
import GrammarReference from './components/GrammarReference';
import DataManagement from './components/DataManagement';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function AppContent() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <PrivateRoute>
            <WordList />
          </PrivateRoute>
        } />
        <Route path="/add" element={<PrivateRoute><AddItem /></PrivateRoute>} />
        <Route path="/edit/:collectionName/:id" element={<PrivateRoute><EditItem /></PrivateRoute>} />
        <Route path="/review" element={<PrivateRoute><AnkiReview /></PrivateRoute>} />
        <Route path="/grammar" element={<PrivateRoute><GrammarReference /></PrivateRoute>} />
        <Route path="/data" element={<PrivateRoute><DataManagement /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WordProvider>
        <AppContent />
      </WordProvider>
    </AuthProvider>
  );
}
