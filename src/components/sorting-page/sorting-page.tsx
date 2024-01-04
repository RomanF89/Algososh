import React, { useEffect, useState } from "react";
import styles from './sorting-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { bubbleSort, selectionSort } from "./utils";

export const SortingPage: React.FC = () => {

  const [startArray, setStartArray] = useState<number[]>([]);
  const [renderArray, setRenderArray] = useState<number[]>([]);
  const [sortArr, setSortArr] = useState<number[][]>([]);
  const [reverseSortArr, setReverseSortArr] = useState<number[][]>([]);
  const [red, setRed] = useState<number[]>([]);
  const [green, setGreen] = useState<number[]>([]);
  const [redSelect, setRedSelect] = useState<number>();
  const [sortMethod, setSortMethod] = useState<string>('');
  const [loadingbutton, setLoadingButton] = useState('');

  const randomArr = () => {
    setGreen([]);
    setRed([]);
    setRedSelect(undefined);

    const createCounter = (): number => {
      let count = Math.round(Math.random() * 17);
      if (count < 3) return createCounter();
      return count;
    }
    let arr = [];
    for (let i = 0; i < createCounter(); i++) {
      let randomNum = Math.round(Math.random() * 100);
      arr.push(randomNum);
    }
    setRenderArray(arr);
    setStartArray(arr);
  }


  const renderSelectionArr = (method?: string) => {
    if (!startArray.length) return;
    if (!sortMethod) return;
    const renderArr = method === "reverse" ? reverseSortArr : sortArr;
    setGreen([]);
    setLoadingButton( method === "reverse" ? "onDecreaseButton" : "onIncreaseButton" );
    setTimeout(() => {
      setRenderArray(([...prevArr]) => [...renderArr[0]]);
    }, 1)
    for (let i = 0; i < renderArr.length - 1; i++) {
      // eslint-disable-next-line no-loop-func
      setTimeout(() => {
        for (let j = 0; j < startArray.length - 1; j++) {
          if (j === startArray.length - 2) {
            setGreen(([...prevItem]) => [...prevItem, i - 1]);
          }
          if (renderArr[i][j] !== renderArr[i + 1][j]) {
            setRenderArray(([...prevArr]) => renderArr[i + 1]);
          }
          setTimeout(() => {
            setRedSelect((prevItem) => j + 1);
          }, j * 250)
        }
        setRed(([...prevItem]) => [...prevItem, i]);
        if (i === renderArr.length - 2) {
          setGreen(([...prevItems]) => [1000]);
          setRed([]);
          setRedSelect(undefined);
          setLoadingButton('');
        }
      }, i * 3000);
    }
  }

  const RenderBubbleArr = () => {
    if (!startArray.length) return;
    if (!sortMethod) return;
    setGreen([]);
    setLoadingButton("onIncreaseButton");
    let red: number;
    let green = renderArray.length - 3;
    for (let i = 0; i < sortArr.length - 1; i++) {
      // eslint-disable-next-line no-loop-func
      setTimeout(() => {
        if (red) {
          setGreen(([...prevItems]) => [...prevItems, green + 3]);
        }
        for (let j = 0; j < renderArray.length - 1; j++) {
          if (red === green + 1) {
            green--;
          }
          if (sortArr[i][j] !== sortArr[i + 1][j]) {
            setRed(([...prevItem]) => [j]);

            red = j;
            setRenderArray(([...prevArr]) => sortArr[i + 1]);
          }
        }
      }, i * 500);
    }
    setTimeout(() => {
      setGreen(([...prevItems]) => [1000]);
      setRed([]);
      setLoadingButton('');
    }, (sortArr.length - 1) * 500)
  }

  const RenderBubbleReverseArr = () => {
    if (!startArray.length) return;
    if (!sortMethod) return;
    setGreen([]);
    setLoadingButton("onDecreaseButton");
    let red: number;
    let green = 1;
    for (let i = 0; i < reverseSortArr.length - 1; i++) {
      // eslint-disable-next-line no-loop-func
      setTimeout(() => {
        for (let j = 0; j < renderArray.length - 1; j++) {
          if (reverseSortArr[i][j] !== reverseSortArr[i + 1][j]) {
            setRed(([...prevItem]) => [j]);
            red = j;
            setRenderArray(([...prevArr]) => reverseSortArr[i + 1])
          }
        }
        if (red === green) {
          setGreen(([...prevItems]) => [...prevItems, green - 1]);
          green++;
        }
      }, i * 500);
    }
    setTimeout(() => {
      setGreen(([...prevItems]) => [1000]);
      setRed([]);
      setLoadingButton('');
    }, (reverseSortArr.length - 1) * 500)
  }

  useEffect(() => {
    if (sortMethod === 'bubble') {
      setSortArr(bubbleSort(startArray).bubbleArray);
      setReverseSortArr(bubbleSort(startArray).reverseBubbleArray);
    } else {
      setSortArr(selectionSort(startArray).selectionArray);
      setReverseSortArr(selectionSort(startArray).reverseSelectionArrays);
    }
  }, [sortMethod, startArray]);

  useEffect(() => {
    randomArr();
  },[])

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.buttons_area}>
        <RadioInput disabled={Boolean(loadingbutton)} onChange={(e) => setSortMethod('select')} checked={sortMethod === 'select' ? true : false} extraClass={styles.radio_button} label={'Выбор'}></RadioInput>
        <RadioInput disabled={Boolean(loadingbutton)} onChange={(e) => setSortMethod('bubble')} checked={sortMethod === 'bubble' ? true : false} extraClass={styles.radio_button} label={'Пузырек'}></RadioInput>
        <Button isLoader={loadingbutton === 'onIncreaseButton'} disabled={Boolean(loadingbutton)} onClick={sortMethod === 'select' ? (e) => { renderSelectionArr() } : RenderBubbleArr} extraClass={styles.sorting_button} text={'По возрастанию'}></Button>
        <Button isLoader={loadingbutton === 'onDecreaseButton'} disabled={Boolean(loadingbutton)} onClick={sortMethod === 'select' ? (e) => { renderSelectionArr('reverse') } : RenderBubbleReverseArr} extraClass={styles.sorting_button} text={'По убыванию'}></Button>
        <Button disabled={Boolean(loadingbutton)} onClick={randomArr} extraClass={styles.array_button} text={'Новый Массив'}></Button>
      </div>

      <div className={styles.sorting_items}>
        {renderArray && renderArray.map((item, index) =>
          <div key={index} className={styles.sorting_item}>
            {sortMethod === 'select' ?
              <div style={{ height: `${(340 * item) / 100}px` }}
                className={
                  green[0] === 1000 ? styles.item_column_green :
                    green.indexOf(index) !== -1 ? styles.item_column_green :
                      index === redSelect ? styles.item_column_red_plus :
                        red.indexOf(index) !== -1 ? styles.item_column_red :
                          styles.item_column
                }> </div> :
              <div style={{ height: `${(340 * item) / 100}px` }}
                className={
                  red.indexOf(index) !== -1 ? styles.item_column_red :
                    red.indexOf(index + 1) !== -1 ? styles.item_column_red :
                      green[0] === 1000 ? styles.item_column_green :
                        green.indexOf(index) !== -1 ? styles.item_column_green :
                          styles.item_column
                }></div>}

            <p className={styles.item_value}>{item}</p>
          </div>
        )}

      </div>
    </SolutionLayout>
  );
};
