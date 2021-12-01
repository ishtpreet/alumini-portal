
import {AuthProvider} from './Context/AuthContext'
import './App.css';

function App() {
  return (
    <>
    <AuthProvider>
      <div>Hello</div>
      </AuthProvider>
    </>
  );
}

export default App;
