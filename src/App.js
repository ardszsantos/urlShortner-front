import './App.css';
import MainPage from './pages/mainPage';
import ThemeProvider from './ThemeProvider';  // Import the ThemeProvider

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <MainPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
