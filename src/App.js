import { useState } from "react";
import "./App.scss";

export default function App() {
  const [bill, setBill] = useState(0);
  const [tipPercentage1, setTipPercentage1] = useState("0");
  const [tipPercentage2, setTipPercentage2] = useState("0");

  const tip = (bill * (tipPercentage1 + tipPercentage2)) / 2 / 100;

  function HandleReset() {
    setTipPercentage1(0);
    setTipPercentage2(0);
    setBill(0);
  }

  return (
    <div className="tip-calc">
      <Bill bill={bill} setBill={setBill} />
      <ServiceTip
        tipPercentage={tipPercentage1}
        setTipPercentage={setTipPercentage1}
      >
        {"How did you like the service?"}
      </ServiceTip>
      <ServiceTip
        tipPercentage={tipPercentage2}
        setTipPercentage={setTipPercentage2}
      >
        {"How did your friend like the service?"}
      </ServiceTip>

      {bill > 0 && (
        <>
          <Amount bill={bill} tip={tip} />

          <ResetButton reset={HandleReset} />
        </>
      )}
    </div>
  );
}

function Bill({ bill, setBill }) {
  return (
    <div>
      <label>
        <p>How much was the bill?</p>
        <input
          type="text"
          placeholder="Bill value"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />
      </label>
    </div>
  );
}

function ServiceTip({ children, tipPercentage, setTipPercentage }) {
  return (
    <div className="question-txt">
      <p>{children}</p>
      <select
        value={tipPercentage}
        onChange={(e) => setTipPercentage(parseFloat(e.target.value))}
      >
        <option value={"0"}>Dissatisfied (0%)</option>
        <option value={"5"}>It was ok (5%)</option>
        <option value={"10"}>It was good (10%)</option>
        <option value={"20"}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Amount({ bill, tip }) {
  return (
    <>
      <p className="amount">
        You pay ${bill + tip} (${bill} + ${tip} tip)
      </p>
    </>
  );
}

function ResetButton({ reset }) {
  return (
    <button onClick={reset} className="btn">
      Reset
    </button>
  );
}
