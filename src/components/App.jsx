import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Layout from './Layout';
import Plans from './Plans';

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/users" exact element={<Plans />} />
      </Route>
    </Routes>
  );
}

export default App;
