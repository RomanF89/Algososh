import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack-page.module.css';
import { Stack } from "./utils";

interface IForm {
  values : {
    inputStack?: string,
  }
  handleChange: (event: any) => void,
  setValues: Dispatch<SetStateAction<{}>>,
}

export const StackPage: React.FC = () => {
  const [stackArray, setStackArray] = useState<string[]>();
  const [isChangeState, setIsChangeState] = useState(false);
  const [loadingbutton, setLoadingButton] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const {values, handleChange, setValues}: IForm  = useForm({inputStack: ''});

  const stack = useMemo(() => new Stack<string>(), []);

  const push = () => {
    if ( values.inputStack && values.inputStack.startsWith(' ') || values.inputStack === '') {
      console.log('Введите корректное значение')
      return
    }
    setLoadingButton('pushButton');
    setValues({inputStack: ''});
    values.inputStack && stack.push(values.inputStack);
    setStackArray([...stack.getContainer()]);
    setIsChangeState(true);
    setTimeout(() => {
      setIsChangeState(false);
      setLoadingButton('');
    }, 500)
  }

  const pop = () => {
    if (!stackArray?.length) return
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

  useEffect(() => {
    if (values.inputStack !== '' && values.inputStack!.length <= 4) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [values.inputStack])

  return (
    <SolutionLayout title="Стек">
      <form onSubmit={(e) => e.preventDefault()} className={styles.input_area}>
        <Input disabled={Boolean(loadingbutton)} onChange={handleChange} maxLength={4} type={"text"} name={"inputStack"} isLimitText={true} extraClass={styles.stack_input} value={values.inputStack}></Input>
        <Button isLoader={loadingbutton === 'pushButton'} disabled={isSubmitDisabled || Boolean(loadingbutton)} onClick={push} text={"Добавить"} extraClass={styles.stack_add_button}></Button>
        <Button isLoader={loadingbutton === 'popButton'} disabled={Boolean(loadingbutton)} onClick={pop} text={"Удалить"} extraClass={styles.stack_delete_button}></Button>
        <Button disabled={Boolean(loadingbutton)} onClick={clear} text={"Очистить"} extraClass={styles.stack_clear_button}></Button>
      </form>
      <div className={styles.stack_area}>
        <div className={styles.stack_items}>
          {stackArray && stackArray.map((item, index) =>
            <Circle
              key={index}
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
