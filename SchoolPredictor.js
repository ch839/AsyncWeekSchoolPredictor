import React, { useState } from "react";
import brain from "brain.js";

const SchoolPredictor = () => {
  // define the input and output size of the neural network
  const inputSize = 1;
  const outputSize = 1;

  // define the initial hyperparameters of the neural network 
  const [learningRate, setLearningRate] = useState(0.1);
  const [activation, setActivation] = useState("sigmoid");
  const [hiddenLayers, setHiddenLayers] = useState([5]);
  const [regularization, setRegularization] = useState("none");

  // create the neural network using the hyperparameters
  const net = new brain.NeuralNetwork({
    learningRate,
    activation,
    hiddenLayers,
    regularization,
  });

  // train the neural network with the sample data
  net.train([
    { input: { gpa: 2.5 }, output: { school: "Community College" } },
    { input: { gpa: 3.0 }, output: { school: "State University" } },
    { input: { gpa: 3.5 }, output: { school: "State University" } },
    { input: { gpa: 4.0 }, output: { school: "Private University" } },
    { input: { gpa: 4.5 }, output: { school: "Private University" } },
    { input: { gpa: 5.0 }, output: { school: "Ivy League University" } },
  ]);

  // define the gpa of the student we want to predict
  const [gpa, setGpa] = useState(3.7);

  // make a prediction using the neural network
  const prediction = net.run({ gpa });

  // handle changes to the learning rate input
  const handleLearningRateChange = (event) => {
    setLearningRate(event.target.value);
  };

  // handle changes to the activation function input
  const handleActivationChange = (event) => {
    setActivation(event.target.value);
  };

  // handle changes to the hidden layers input
  const handleHiddenLayersChange = (event) => {
    setHiddenLayers(
      event.target.value.split(",").map((layer) => Number(layer))
    );
  };

  // handle changes to the regularization input
  const handleRegularizationChange = (event) => {
    setRegularization(event.target.value);
  };

  // handle changes to the gpa input
  const handleGpaChange = (event) => {
    setGpa(event.target.value);
  };

  return (
    <div>
      <h2>School Predictor</h2>
      <form>
        <label>Learning Rate:</label>
        <input
          type="number"
          value={learningRate}
          onChange={handleLearningRateChange}
        />
        <br />
        <label>Activation Function:</label>
        <select value={activation} onChange={handleActivationChange}>
          <option value="sigmoid">Sigmoid</option>
          <option value="relu">ReLU</option>
          <option value="leaky-relu">Leaky ReLU</option>
          <option value="tanh">Tanh</option>
        </select>
        <br />
        <label>Hidden Layers:</label>
        <input
          type="text"
          value={hiddenLayers}
          onChange={handleHiddenLayersChange}
        />
        <br />
        <label>Regularization:</label>
        <select value={regularization} onChange={handleRegularizationChange}>
          <option value="none">None</option>
          <option value="l2">L2</option>
          <option value="l1">L1</option>
        </select>
      </form>
      <br />
      <label>GPA:</label>
      <input type="number" value={gpa} onChange={handleGpaChange} />
      <br />
      <label>Predicted School:</label>
      <p>{prediction.school}</p>
    </div>
  );
};

export default SchoolPredictor;
