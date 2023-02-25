import { ThemeProvider } from '@mui/material';
import { restClient } from 'apis/restClient';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from 'routes';
import './App.scss';
import store from './store';
import themes from './themes';

restClient.initRequest();
restClient.injectCallbacks({
  onCatchUnauthorizedError: async () => {},
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={themes}>
        <Router>
          <Routes />
          <ToastContainer />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
