import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './list-page.module.css';
import { LinkedList, TСircleChange } from "./utils";


export const ListPage: React.FC = () => {
  const [array, setArray] = useState<string[]>([]);
  const [inputState, setInputState] = useState<string>('');
  const [indexInputState, setIndexInputState] = useState<string>('');
  const [circleToChange, setCircleToChange] = useState<TСircleChange>({ num: null, index: null, operation: undefined });
  const [greenIndex, setGreenIndex] = useState<number>();
  const [changingIndex, setChangingIndex] = useState<number>();
  const [loadingbutton, setLoadingButton] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  }

  const handleIndexChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIndexInputState(e.target.value);
  }

  const list = useMemo(() => new LinkedList<string>(), []);
  useEffect(() => {
    list.append('0');
    list.append('34');
    list.append('8');
    list.append('1');
    setArray(list.print());
  }, [])


  const addToHead = () => {
    if (inputState === '' || inputState.startsWith(' ')) {
      console.log('Введите корректное значение');
      return
    }
    setLoadingButton('addToHeadButton');
    setInputState('');
    setCircleToChange({ num: +inputState, index: 0, operation: 'add' });
    setTimeout(() => {
      if (array.length === 0) {
        list.append(inputState);
      } else {
        list.insertAt(inputState, 0);
      }
      setArray(list.print());
      setCircleToChange({ num: null, index: null });
      setGreenIndex(0);
    }, 1000);
    setTimeout(() => {
      setLoadingButton('');
      setGreenIndex(undefined);
    }, 2000)
  }

  const addToTail = () => {
    if (inputState === '' || inputState.startsWith(' ')) {
      console.log('Введите корректное значение');
      return
    }
    setLoadingButton('addToTailButton');
    setInputState('');
    setCircleToChange({ num: +inputState, index: array.length - 1, operation: 'add' });
    setTimeout(() => {
      list.append(inputState)
      setArray(list.print());
      setCircleToChange({ num: null, index: null });
      setGreenIndex(array.length);
    }, 1000);
    setTimeout(() => {
      setLoadingButton('');
      setGreenIndex(undefined);
    }, 2000)
  }

  const deleteHead = () => {
    setLoadingButton('deleteFromHeadButton');
    setCircleToChange({ num: +array[0], index: 0, operation: 'delete' });
    setTimeout(() => {
      list.deleteHead();
      setArray(list.print());
      setCircleToChange({ num: null, index: null });
      setLoadingButton('');
    }, 1000);
  }

  const deleteTail = () => {
    setLoadingButton('deleteFromTailButton');
    setCircleToChange({ num: +array[array.length - 1], index: array.length - 1, operation: 'delete' });
    setTimeout(() => {
      if (array.length === 1) {
        list.deleteHead();
      } else {
        list.deleteTail();
      }
      setArray(list.print());
      setCircleToChange({ num: null, index: null });
      setLoadingButton('');
    }, 1000);
  }

  const handleAddFromIndex = () => {
    if (inputState === '' || inputState.startsWith(' ')) {
      console.log('Введите корректное значение');
      return
    }
    if (!+indexInputState || +indexInputState > array.length) {
      console.log('Введите корректное значение индекса');
      return
    }
    setLoadingButton('addFromIndexButton');
    setInputState('');
    setIndexInputState('');
    for (let i = 0; i < +indexInputState + 1; i++) {
      setTimeout(() => {
        setCircleToChange({ num: +inputState, index: i, operation: 'add' });
      }, (i) * 800)
      setTimeout(() => {
        setChangingIndex(i);
      }, (i + 1) * 800)
    }
    setTimeout(() => {
      list.insertAt(inputState, +indexInputState);
      setArray(list.print());
      setChangingIndex(undefined);
      setCircleToChange({ num: null, index: null });
      setGreenIndex(+indexInputState);
    }, (+indexInputState + 1) * 800)

    setTimeout(() => {
      setGreenIndex(undefined);
      setLoadingButton('');
    }, (+indexInputState + 1) * 1300)
  }

  const handleDeleteFromIndex = () => {
    if (!+indexInputState || +indexInputState > array.length - 1) {
      console.log('Введите корректное значение индекса')
      return
    }
    setInputState('');
    setIndexInputState('');
    setLoadingButton('deleteFromIndexButton');
    for (let i = 0; i < +indexInputState + 1; i++) {
      setTimeout(() => {
        setChangingIndex(i);
      }, (i + 1) * 800)
    }
    setIndexInputState('');
    setTimeout(() => {
      setCircleToChange({ num: +array[+indexInputState], index: +indexInputState, operation: 'delete' });
    }, (+indexInputState + 2) * 800)
    setTimeout(() => {
      list.deleteIndex(+indexInputState);
      setArray(list.print());
      setChangingIndex(undefined);
      setCircleToChange({ num: null, index: null });
      setLoadingButton('');
    }, (+indexInputState + 3) * 800)
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.change_list_area}>
        <Input disabled={Boolean(loadingbutton)} placeholder={'Введите значение'} onChange={handleChange} maxLength={4} type={"text"} isLimitText={true} extraClass={styles.change_input} value={inputState}></Input>
        <Button isLoader={loadingbutton === 'addToHeadButton'} disabled={Boolean(loadingbutton)}  text={'Добавить в head'} onClick={addToHead} extraClass={styles.add_head_button}></Button>
        <Button isLoader={loadingbutton === 'addToTailButton'} disabled={Boolean(loadingbutton)}  text={'Добавить в tail'} onClick={addToTail} extraClass={styles.add_tail_button}></Button>
        <Button isLoader={loadingbutton === 'deleteFromHeadButton'} disabled={Boolean(loadingbutton)}  text={'Удалить из head'} onClick={deleteHead} extraClass={styles.delete_head_button}></Button>
        <Button isLoader={loadingbutton === 'deleteFromTailButton'} disabled={Boolean(loadingbutton)}  text={'Удалить из tail'} onClick={deleteTail} extraClass={styles.delete_tail_button}></Button>
      </div>
      <div className={styles.change_index_area}>
        <Input disabled={Boolean(loadingbutton)}  placeholder={'Введите индекс'} onChange={handleIndexChange} maxLength={4} type={"number"} extraClass={styles.change_index_input} value={indexInputState}></Input>
        <Button isLoader={loadingbutton === 'addFromIndexButton'}  disabled={Boolean(loadingbutton)}  text={'Добавить по индексу'} onClick={handleAddFromIndex} extraClass={styles.add_index_button}></Button>
        <Button isLoader={loadingbutton === 'deleteFromIndexButton'}  disabled={Boolean(loadingbutton)}  text={'Удалить по индексу'} onClick={handleDeleteFromIndex} extraClass={styles.delete_index_button}></Button>
      </div>
      <div className={styles.list_area}>
        {array && array.map((item, index) =>
          <div key={index} className={styles.list_item_area}>
            {circleToChange && index === circleToChange.index && circleToChange.operation === 'add' && <Circle state={ElementStates.Changing} extraClass={styles.item_small_top} isSmall={true} letter={circleToChange.num?.toString()} />}
            <div className={styles.list_item}>
              <Circle
                head={index === 0 ? 'head' : ''}
                tail={index === array.length - 1 ? 'tail' : ''}
                index={index}
                letter={circleToChange.operation === 'delete' && circleToChange.index === index ? '' : item}
                state={greenIndex === index ? ElementStates.Modified : changingIndex === index ? ElementStates.Changing : ElementStates.Default}
              />
              {index === array.length - 1 ? '' : <ArrowIcon />}
            </div>
            {circleToChange && index === circleToChange.index && circleToChange.operation === 'delete' && <Circle state={ElementStates.Changing} extraClass={styles.item_small_bottom} isSmall={true} letter={circleToChange.num?.toString()} />}
          </div>
        )}
      </div>
    </SolutionLayout>
  );
};
