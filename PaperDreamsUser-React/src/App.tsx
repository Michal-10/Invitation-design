
import './App.css';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { Router } from './Router';
import Store from './redux/Store';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={Store}>
          <RouterProvider router={Router} />
        </Provider>
      </ThemeProvider>

    </>
  )
}

export default App;
