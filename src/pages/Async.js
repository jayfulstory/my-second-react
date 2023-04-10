import { useState, useEffect } from 'react';

function FF() {
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);
  useEffect(() => {
    if (count > 0 && count < 3) {
      setAge(age + 1);
    }
  }, [count]);
  return (
    <div>
      <div>こんにちは {age}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        押したら+1歳
      </button>
      {count}
    </div>
  );
}

export default FF;
