import React from 'react';
import PopulationMigrationViz from './components/PopulationMigrationViz';

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Globale Bevölkerungsmigration</h1>
      <PopulationMigrationViz />
    </div>
  );
}

export default App;