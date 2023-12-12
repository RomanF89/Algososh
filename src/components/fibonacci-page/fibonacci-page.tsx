import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./fibonacci-page.module.css";
import { Button } from "../ui/button/button";
import { createFibonacci } from "./utils";
import { useForm } from "../../hooks/useForm";

interface IForm {
  values : {
    fiboInput?: string,
  }
  handleChange: (event: any) => void,
  setValues: Dispatch<SetStateAction<{}>>,
}

export const FibonacciPage: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const {values, handleChange, setValues}: IForm  = useForm({fiboInput: ''});


  const onClick = () => {
    if (values.fiboInput === '' || values.fiboInput === '0') {
      return
    }
    setArray([]);
    values.fiboInput && fibIterative(+values.fiboInput);
  }


  const fibIterative = (n: number): void => {
    setIsLoading(true);
    setValues({fiboInput :''});
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

  useEffect(() => {
    if ( values.fiboInput && values.fiboInput !== '' && +values.fiboInput >= 1 && +values.fiboInput <= 19) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [values.fiboInput])


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form onSubmit={(e) => e.preventDefault()} className={styles.fibo_content}>
        <div className={styles.input_area}>
          <Input disabled={isLoading} placeholder={'Введите число'} onChange={handleChange} name={'fiboInput'} min={1} type={"number"} max={19} isLimitText={true} value={values.fiboInput}></Input>
        </div>
        <Button disabled={isSubmitDisabled} isLoader={isLoading} onClick={onClick} text="Рассчитать"></Button>
      </form>
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
