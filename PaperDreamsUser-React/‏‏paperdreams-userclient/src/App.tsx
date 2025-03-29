
import './App.css';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { Router } from './Router';
import Store from './redux/Store';

function App() {

  return (
    <>

      <Provider store={Store}>
        <RouterProvider router={Router} />
      </Provider>

    </>
  )
}

export default App;
