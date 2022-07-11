import './App.css';
import "normalize.css/normalize.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";

import TopNav from './components/TopNav';
import Content from './components/Content';

function App() {
  return (
    <div className="app">
      <div className='top-nav'>
        <TopNav />
      </div>
      <div className='main-content'>
        <Content />
      </div>
    </div>
  );
}

export default App;
