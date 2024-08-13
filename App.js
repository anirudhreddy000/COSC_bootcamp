import React, { useState } from 'react';

function PlacementForm() {
  const [year, setyear] = useState('');
  const [prediction, setPrediction] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        year: parseInt(year),
      }),
    });

    const data = await response.json();
    setPrediction(data['the prediction is:']);
  };

  return (
    <div>
      <h1>Placement Predictor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setyear(e.target.value)}
          />
        </div>
        <button type="submit">Predict</button>
      </form>
      {prediction && (
        <div>
          <h2>Prediction:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
}

export default PlacementForm;
