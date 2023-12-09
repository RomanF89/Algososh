import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./string.module.css";
import { Button } from "../ui/button/button";
import { reverseArr } from "./utils";



export const StringComponent: React.FC = () => {
  const [inputState, setInputState] = useState('');
  const [array, setArr] = useState<string[][]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  }

  const createArr = () => {
    const arr: string[][] = []
    for (let i = 0; i < inputState.length; i++) {
      arr[i] = [inputState[i]]
    }
    return arr;
  }

  const handleClick = () => {
    if (inputState === '') {
      return
    }
    const arr = createArr();
    setArr(arr);
    const newArr = reverseArr(arr);
    RenderArr(newArr);
  }

  const RenderArr = (arr: string[][]) => {
    setInputState('');
    setIsLoading(true);
    const green = 'green';
    const red = 'red';
    const array = createArr();
    // Сравнение изменного и первоначального массива и отрисовка элементов
    for (let i = 0; i < Math.floor((arr.length) / 2); i++) {

      //Замена цвета выбранных элементов
      setTimeout(() => {
        setArr((prevArr) => {
          let newArray = [...prevArr];
          newArray[i][1] = red
          newArray[array.length - (i + 1)][1] = red;
          return newArray
        });
        //Замена цвета отсортированных элементов
        setTimeout(() => {
          if (arr[i] !== array[i]) {
            setArr((prevArr) => {
              let newArray = [...prevArr];
              newArray[i] = arr[i];
              newArray[i][1] = green;
              newArray[array.length - (i + 1)] = arr[arr.length - (i + 1)]
              newArray[array.length - (i + 1)][1] = green;
              //Замена цвета среднего элемента
              if (i === Math.floor((arr.length) / 2) - 1) {
                newArray[Math.floor((arr.length) / 2)][1] = green
              }
              //Остановка лоадера
              if (i === Math.floor((arr.length) / 2) - 1) {
                setIsLoading(false);
              }
              return newArray;
            });
          }
        }, 1000 * ((i + 1) / 4))
      }, 1000 * (i + 1))
    }
    // Замена цвета в массиве из 1 элемента
    setTimeout(() => {
      if (arr.length === 1) {
        setArr((prevArr) => {
          let newArray = [...prevArr];
          newArray[0][1] = green
          return newArray;
        })
        setIsLoading(false);

      }
    }, 1000)
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.string_content}>
        <div className={styles.input_area}>
          <Input disabled={isLoading} onChange={handleChange} extraClass={'input_string'} isLimitText={true} maxLength={11} value={inputState}></Input>
        </div>
        <Button isLoader={isLoading} onClick={handleClick} text="Развернуть"></Button>
      </div>
      <div className={styles.reverse_area}>
        <div className={styles.string_items}>
          {array.map((item, index) =>
            <p key={index} className={item[1] === 'green' ? styles.string_item_green : item[1] === 'red' ? styles.string_item_red : styles.string_item}>
              {item[0]}
            </p>)}

        </div>
      </div>
    </SolutionLayout>
  );
};


