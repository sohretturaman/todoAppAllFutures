import { Provider } from 'react-redux';
import NavigationPage from './NavigationPage';
import { Store } from './components/redux/store/Store';

const App = () => {


  return (
    <Provider store={Store}>
       <NavigationPage  /> 
    </Provider>
      
  );
};

export default App;
