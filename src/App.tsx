import React from 'react';
import Converter from './components/entities/Converter/Converter';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Converter />
    </div>
  );
};

export default App;
