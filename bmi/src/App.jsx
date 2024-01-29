import { useState } from "react";
function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState("");
  const [bmiMessage, setBMIMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  function handelSubmit() {
    if (weight === "") return setErrorMessage("Enter the Weight");
    if (height === "") return setErrorMessage("Enter the height");
    setErrorMessage("");
    if (!isNaN(height) && !isNaN(weight) && height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const bmiResult = weight / (heightInMeters * heightInMeters);
      setBMI(bmiResult.toFixed(2));
      const bmiCategories = [
        {
          category: "Underweight",
          max: 18.5,
          message: "You are underweight. Consider gaining some weight.",
        },
        {
          category: "Normal weight",
          max: 24.9,
          message: "You have a normal weight. Keep it up!",
        },
        {
          category: "Overweight",
          max: 29.9,
          message:
            "You are overweight. Consider losing some weight for better health.",
        },
        {
          category: "Obesity",
          max: Infinity,
          message:
            "You are in the obesity range. Consult a healthcare professional for advice.",
        },
      ];

      const category = bmiCategories.find((item) => bmiResult <= item.max);
      setBMIMessage(category ? category.message : "Invalid BMI calculation.");
    } else {
      setErrorMessage(
        "Invalid input. Please enter valid numeric values for height and weight."
      );
    }
  }

  function handleReset() {
    setHeight("");
    setWeight("");
    setBMI("");
    setBMIMessage("");
    setErrorMessage("");
  }

  return (
    <>
      <div className="rounded-xl shadow-[0px_0px_20px] shadow-white border-stone-100 border flex flex-col md:w-[30rem]  p-4 gap-4 flex-wrap mx-auto">
        <h1 className="mt-3 border-b p-2 text-center font-mono text-xl">
          BMI CALCULATOR
        </h1>
        <label htmlFor="weight">Weight (kg)</label>
        <input
          type="text"
          value={weight}
          name="weight"
          id="weight"
          onChange={(e) => setWeight(Number(e.target.value))}
          placeholder="Enter your weight"
          className="h-10 text-stone-900 text-lg p-2 mb-2 w-full rounded-full"
        />
        <label htmlFor="height">Height (cms)</label>
        <input
          type="text"
          value={height}
          name="height"
          id="height"
          onChange={(e) => setHeight(Number(e.target.value))}
          placeholder="Enter your height"
          className="h-10 text-stone-900 text-lg p-2 mb-2 w-full rounded-full"
        />
        <div className="flex flex-col md:flex-row md:justify-between">
          <button
            className="bg-green-900 h-10 w-full md:w-[48%] rounded-full"
            onClick={handelSubmit}
          >
            Calculate
          </button>
          <button
            className="bg-stone-400 h-10 w-full md:w-[48%] rounded-full"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

        {bmi === "" ? (
          ""
        ) : (
          <div className="mt-2 mb-2">
            Your BMI : <strong>{bmi}</strong> 👉
            <span className="text-green-100">{bmiMessage}</span>
          </div>
        )}
        {errorMessage && <div className="text-red-800">{errorMessage}</div>}
      </div>
    </>
  );
}

export default App;
