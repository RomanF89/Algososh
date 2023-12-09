import React, { ChangeEvent, useMemo, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack-page.module.css';
import { Stack } from "./utils";

export const StackPage: React.FC = () => {
  const [stackArray, setStackArray] = useState<string[]>();
  const [inputState, setInputState] = useState('');
  const [isChangeState, setIsChangeState] = useState(false);
  const [loadingbutton, setLoadingButton] = useState('');


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value)
  }

  const stack = useMemo(() => new Stack<string>(), []);

  const push = () => {
    if (inputState.startsWith(' ') || inputState === '') {
      console.log('Введите корректное значение')
      return
    }
    setLoadingButton('pushButton');
    setInputState('');
    stack.push(inputState);
    setStackArray([...stack.getContainer()]);
    setIsChangeState(true);
    setTimeout(() => {
      setIsChangeState(false);
      setLoadingButton('');
    }, 500)
  }

  const pop = () => {
    setIsChangeState(true);
    setLoadingButton('popButton');
    setTimeout(() => {
      stack.pop();
      setStackArray([...stack.getContainer()]);
      setIsChangeState(false);
      setLoadingButton('');
    }, 500)
  }

  const clear = () => {
    stack.clear();
    setStackArray([...stack.getContainer()]);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.input_area}>
        <Input disabled={Boolean(loadingbutton)} onChange={handleChange} maxLength={4} type={"text"} isLimitText={true} extraClass={styles.stack_input} value={inputState}></Input>
        <Button isLoader={loadingbutton === 'pushButton'} disabled={Boolean(loadingbutton)} onClick={push} text={"Добавить"} extraClass={styles.stack_add_button}></Button>
        <Button isLoader={loadingbutton === 'popButton'} disabled={Boolean(loadingbutton)} onClick={pop} text={"Удалить"} extraClass={styles.stack_delete_button}></Button>
        <Button disabled={Boolean(loadingbutton)} onClick={clear} text={"Очистить"} extraClass={styles.stack_clear_button}></Button>
      </div>
      <div className={styles.stack_area}>
        <div className={styles.stack_items}>
          {stackArray && stackArray.map((item, index) =>
            <Circle
              extraClass={styles.stack_item}
              head={index === stackArray.length - 1 ? "top" : ''} letter={item} index={index}
              state={(index === stackArray.length - 1 && isChangeState) ? ElementStates.Changing : ElementStates.Default}
            />
          )}
        </div>
      </div>

    </SolutionLayout>
  );
};
