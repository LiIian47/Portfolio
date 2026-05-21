// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Desktop from './pages/desktop/desktop';
import { WindowProvider } from './context/windowContext';
import { ThemeProvider } from './context/themeContext';

function App() {
  return (
    <ThemeProvider>
      <WindowProvider>
        <Desktop />
      </WindowProvider>
    </ThemeProvider>
  );
}

export default App;
