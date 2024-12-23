import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, 
  ScatterChart, Scatter, ZAxis, Label 
} from 'recharts';

// Datenschema-Definition für bessere Typsicherheit und Dokumentation
/**
 * @typedef {Object} PopulationData
 * @property {string} country - Name des Landes
 * @property {number} population_in_millions - Bevölkerung in Millionen
 * @property {number} netMigration - Netto-Migration
 * @property {string} category - Regionale Kategorie
 */

/** @type {PopulationData[]} */
const demoTopPopulation = [
  { country: "China", population_in_millions: 1439, netMigration: -348399, category: "Asien" },
  { country: "Indien", population_in_millions: 1380, netMigration: -532687, category: "Asien" },
  { country: "USA", population_in_millions: 331, netMigration: 954806, category: "Nordamerika" },
  { country: "Indonesien", population_in_millions: 274, netMigration: -98955, category: "Asien" },
  { country: "Pakistan", population_in_millions: 221, netMigration: -233379, category: "Asien" },
  { country: "Brasilien", population_in_millions: 213, netMigration: 21200, category: "Südamerika" },
  { country: "Nigeria", population_in_millions: 206, netMigration: -60000, category: "Afrika" },
  { country: "Bangladesch", population_in_millions: 165, netMigration: -369501, category: "Asien" },
  { country: "Russland", population_in_millions: 146, netMigration: 182456, category: "Eurasien" },
  { country: "Mexiko", population_in_millions: 129, netMigration: -60000, category: "Nordamerika" }
].sort((a, b) => b.population_in_millions - a.population_in_millions);

/** @type {PopulationData[]} */
const demoTopImmigration = [
  { country: "USA", population_in_millions: 331, netMigration: 954806, category: "Hohe Immigration" },
  { country: "Deutschland", population_in_millions: 83, netMigration: 543822, category: "Hohe Immigration" },
  { country: "UK", population_in_millions: 67, netMigration: 260650, category: "Mittlere Immigration" },
  { country: "Kanada", population_in_millions: 38, netMigration: 242032, category: "Mittlere Immigration" },
  { country: "Australien", population_in_millions: 25, netMigration: 182456, category: "Mittlere Immigration" },
  { country: "Spanien", population_in_millions: 47, netMigration: 174523, category: "Mittlere Immigration" },
  { country: "Italien", population_in_millions: 60, netMigration: 148943, category: "Mittlere Immigration" },
  { country: "Japan", population_in_millions: 126, netMigration: 71560, category: "Niedrige Immigration" },
  { country: "Niederlande", population_in_millions: 17, netMigration: 16000, category: "Niedrige Immigration" },
  { country: "Schweden", population_in_millions: 10, netMigration: 40000, category: "Niedrige Immigration" }
];

/**
 * Custom Tooltip für das Bevölkerungsdiagramm
 * @param {Object} props - Tooltip Eigenschaften
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border rounded-lg shadow-lg">
        <h3 className="font-bold text-lg mb-2">{data.country}</h3>
        <div className="space-y-1">
          <p className="text-sm"><span className="font-medium">Region:</span> {data.category}</p>
          <p className="text-sm"><span className="font-medium">Bevölkerung:</span> {data.population_in_millions.toLocaleString()} Mio.</p>
          <p className="text-sm"><span className="font-medium">Migration:</span> {data.netMigration.toLocaleString()}</p>
        </div>
      </div>
    );
  }
  return null;
};

const PopulationMigrationViz = () => {
  return (
    <div className="space-y-12 p-6 bg-gray-50">
      {/* Bevölkerungsdiagramm */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Globale Bevölkerungsverteilung</h2>
        <p className="text-gray-600 mb-6">
          Top 10 Länder nach Bevölkerungsgröße mit Migrationsindikatoren
        </p>
        <div className="h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={demoTopPopulation}
              margin={{ top: 20, right: 30, left: 60, bottom: 100 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="country" 
                angle={-45} 
                textAnchor="end" 
                height={120} 
                tick={{ fill: '#374151', dy: 40 }}
                tickLine={{ transform: 'translate(0, 20)' }}
              >
                <Label value="Länder" offset={-20} position="insideBottom" />
              </XAxis>
              <YAxis 
                tick={{ fill: '#374151' }}
              >
                <Label 
                  value="Bevölkerung (Millionen)" 
                  angle={-90} 
                  position="insideLeft" 
                  style={{ textAnchor: 'middle' }}
                  offset={-45}
                />
              </YAxis>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top" 
                height={36}
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Bar 
                dataKey="population_in_millions" 
                name="Bevölkerung (Mio.)"
                fill="#4f46e5" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Migrationsdiagramm */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Migrations-Bevölkerungs-Verhältnis</h2>
        <p className="text-gray-600 mb-6">
          Vergleich von Bevölkerungsgröße und Netto-Migration nach Ländern
        </p>
        <div className="h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 30, left: 80, bottom: 100 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="population_in_millions" 
                name="Bevölkerung"
                type="number"
                domain={[0, 'dataMax + 10']}
                tick={{ fill: '#374151', dy: 10 }}
                tickLine={{ transform: 'translate(0, 0)' }}
                tickFormatter={(value) => `${value}M`}
              >
                <Label 
                  value="Bevölkerung in Millionen" 
                  offset={-50}
                  position="insideBottom"
                  style={{ 
                    textAnchor: 'middle',
                    fill: '#374151',
                    fontSize: 14
                  }}
                />
              </XAxis>
              <YAxis 
                dataKey="netMigration" 
                name="Netto-Migration"
                tick={{ fill: '#374151' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              >
                <Label 
                  value="Netto-Migration (in Tausend)" 
                  angle={-90} 
                  position="insideLeft"
                  style={{ 
                    textAnchor: 'middle',
                    fill: '#374151',
                    fontSize: 14
                  }}
                  offset={-60}
                />
              </YAxis>
              <ZAxis range={[100, 800]} />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ strokeDasharray: '3 3' }}
              />
              <Legend 
                verticalAlign="top" 
                height={50}
                wrapperStyle={{ 
                  paddingTop: '20px',
                  fontSize: '14px'
                }}
              />
              <Scatter 
                name="Länder" 
                data={demoTopImmigration.map(item => ({
                  ...item,
                  size: Math.abs(item.netMigration) / 10000 + 100
                }))} 
                fill="#4f46e5"
                fillOpacity={0.7}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legende für die Interpretation */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Interpretationshilfe</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            <li>Größe der Punkte entspricht dem absoluten Migrations-Volumen</li>
            <li>Position auf der X-Achse zeigt die Gesamtbevölkerung</li>
            <li>Position auf der Y-Achse zeigt die Netto-Migration</li>
            <li>Positive Werte bedeuten Netto-Zuwanderung, negative Werte Netto-Abwanderung</li>
          </ul>
        </div>
      </div>

      {/* Analyseergebnisse */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Analyseergebnisse</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Bevölkerungstrends</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Asiatische Länder dominieren die Top 10 der bevölkerungsreichsten Nationen</li>
              <li>Die Top 3 Länder machen zusammen über 3 Milliarden Menschen aus</li>
              <li>Große Bevölkerungsdiversität zwischen den Top 10 (von 129 bis 1439 Millionen)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Migrationsmuster</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Negative Nettozuwanderung in den bevölkerungsreichsten Ländern</li>
              <li>Entwickelte Länder zeigen überwiegend positive Migrationsraten</li>
              <li>Keine direkte Korrelation zwischen Bevölkerungsgröße und Migrationssaldo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopulationMigrationViz;