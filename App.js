import { Provider } from 'react-redux';
import NavigationPage from './screens/NavigationPage';
import { Store } from './components/redux/store/Store';

const App = () => {


  return (
    <Provider store={Store}>
       <NavigationPage  /> 
    </Provider>
      
  );
};

export default App;

// add dark theme with redux you can do it .
// before that you have to ask firebase for saving notes and tasks 
// configure delete task after firebase
// add a second theme 
//add translator 
// add youtube stram to notes for creating your own videos for motivation creae a stream !!!
//adding pictures as note 
// add voice recorder 
//share note and multi delete and multi selecet 
