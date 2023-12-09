import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./fibonacci-page.module.css";
import { Button } from "../ui/button/button";
import { createFibonacci } from "./utils";

export const FibonacciPage: React.FC = () => {

  const [inputState, setInputState] = useState('');
  const [array, setArray] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value)
  }

  const onClick = () => {
    if (inputState === '' || inputState === '0') {
      return
    }
    setArray([]);
    fibIterative(+inputState);
  }

  const fibIterative = (n: number): void => {
    setIsLoading(true);
    setInputState('');
    let arr: number[] = createFibonacci(n);
    for (let i = 0; i < arr.length; i++) {
      setTimeout(() => {
        setArray(([...prevArr]) => [...prevArr, arr[i]]);
        if (i === arr.length - 1) {
          setIsLoading(false);
        }
      }, 1000 * i)
    }
  }


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.fibo_content}>
        <div className={styles.input_area}>
          <Input disabled={isLoading} onChange={handleChange} min={1} type={"number"} max={19} isLimitText={true} value={inputState}></Input>
        </div>
        <Button isLoader={isLoading} onClick={onClick} text="Рассчитать"></Button>
      </div>
      <div className={styles.fibo_area}>
        <div className={styles.fibo_items}>
          {array.map((item, index) =>
            <div key={index} className={styles.fibo_item_area}>
              <div className={styles.fibo_item}>
                {item}
              </div>
              <p className={styles.fibo_item_position}>
                {index}
              </p>
            </div>
          )}
        </div>
      </div>
    </SolutionLayout>
  );
};
