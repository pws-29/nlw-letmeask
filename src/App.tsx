
import { BrowserRouter, Route, Switch} from 'react-router-dom'

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room'

import { AuthContextProvider } from './contexts/AuthContent'
import { AdminRoom } from './pages/AdminRoom';

function App() {

  return (
    <BrowserRouter> 
      <AuthContextProvider>
        <Switch> {/* caso uma rota seja satisfeita,  ele para de buscar */}
          <Route path="/" exact component={Home} /> {/* Exact acessa exatamente o / */}
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>  
  );
}

export default App;


