import AppRoutes from 'routes/AppRoutes.tsx';
import { store } from 'redux/store.ts';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
