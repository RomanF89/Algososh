import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './list-page.module.css';
import { LinkedList, TСircleChange } from "./utils";

interface IForm {
  values : {
    inputList?: string,
    indexInput?: string,
  }
  handleChange: (event: any) => void,
  setValues: Dispatch<SetStateAction<{}>>,
}

export const ListPage: React.FC = () => {
  const [array, setArray] = useState<string[]>([]);
  const [circleToChange, setCircleToChange] = useState<TСircleChange>({ num: null, index: null, operation: undefined });
  const [greenIndex, setGreenIndex] = useState<number>();
  const [changingIndex, setChangingIndex] = useState<number>();
  const [loadingbutton, setLoadingButton] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isIndexSubmitDisabled, setIsIndexSubmitDisabled] = useState(true);
  const [isIndexDeleteDisabled, setIsIndexDeleteDisabled] = useState(true);
  const {values, handleChange, setValues}: IForm  = useForm({inputList: '', indexInput: ''});


  const list = useMemo(() => new LinkedList<string>(), []);
  useEffect(() => {
    list.append('0');
    list.append('34');
    list.append('8');
    list.append('1');
    setArray(list.print());
  }, [])


  const addToHead = () => {
    if (values.inputList === '' || values.inputList!.startsWith(' ')) {
      console.log('Введите корректное значение');
      return
    }
    setLoadingButton('addToHeadButton');
    setValues((prevState) => ({...prevState, inputList: ''}));
    values.indexInput && setCircleToChange({ num: +values.indexInput, index: 0, operation: 'add' });
    setTimeout(() => {
      if (array.length === 0) {
        values.inputList && list.append(values.inputList);
      } else {
        values.inputList && list.insertAt(values.inputList, 0);
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
    if ( values.inputList === '' || values.inputList && values.inputList.startsWith(' ')) {
      console.log('Введите корректное значение');
      return
    }
    setLoadingButton('addToTailButton');
    setValues((prevState) => ({...prevState, inputList: ''}));
    values.inputList && setCircleToChange({ num: values.inputList, index: array.length - 1, operation: 'add' });
    setTimeout(() => {
      values.inputList && list.append(values.inputList)
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
    setCircleToChange({ num: array[0], index: 0, operation: 'delete' });
    setTimeout(() => {
      list.deleteHead();
      setArray(list.print());
      setCircleToChange({ num: null, index: null });
      setLoadingButton('');
    }, 1000);
  }

  const deleteTail = () => {
    setLoadingButton('deleteFromTailButton');
    setCircleToChange({ num: array[array.length - 1], index: array.length - 1, operation: 'delete' });
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
    if (values.inputList === '' || values.inputList && values.inputList.startsWith(' ')) {
      console.log('Введите корректное значение');
      return
    }
    if ( values.indexInput && !+values.indexInput || values.indexInput && +values.indexInput  > array.length) {
      console.log('Введите корректное значение индекса');
      return
    }
    setLoadingButton('addFromIndexButton');
    setValues({inputList: '' ,indexInput: ''});
    if (values.indexInput) {
      for (let i = 0; i < +values.indexInput + 1; i++) {
        setTimeout(() => {
          values.inputList && setCircleToChange({ num: values.inputList, index: i, operation: 'add' });
        }, (i) * 800)
        setTimeout(() => {
          setChangingIndex(i);
        }, (i + 1) * 800)
      }
    }
    if (values.indexInput) {
      setTimeout(() => {
        values.inputList && values.indexInput && list.insertAt(values.inputList, +values.indexInput);
        setArray(list.print());
        setChangingIndex(undefined);
        setCircleToChange({ num: null, index: null });
        values.indexInput && setGreenIndex(+values.indexInput);
      }, (+values.indexInput + 1) * 800)
      setTimeout(() => {
        setGreenIndex(undefined);
        setLoadingButton('');
      }, (+values.indexInput + 1) * 1300)
    }
  }

  const handleDeleteFromIndex = () => {
    if ( values.indexInput && !+values.indexInput || values.indexInput && +values.indexInput > array.length - 1) {
      console.log('Введите корректное значение индекса')
      return
    }
    setValues({inputList: '' ,indexInput: ''});
    setLoadingButton('deleteFromIndexButton');
    if (values.indexInput) {
      for (let i = 0; i < +values.indexInput + 1; i++) {
        setTimeout(() => {
          setChangingIndex(i);
        }, (i + 1) * 800)
      }
      setValues((prevState) => ({...prevState, indexInput: ''}));
      setTimeout(() => {
        values.indexInput && setCircleToChange({ num: array[+values.indexInput], index: +values.indexInput, operation: 'delete' });
      }, (+values.indexInput + 2) * 800)
      setTimeout(() => {
        values.indexInput && list.deleteIndex(+values.indexInput);
        setArray(list.print());
        setChangingIndex(undefined);
        setCircleToChange({ num: null, index: null });
        setLoadingButton('');
      }, (+values.indexInput + 3) * 800)
    }

  }

  useEffect(() => {
      if (values.inputList !== '' && values.inputList!.length <= 4) {
        setIsSubmitDisabled(false);
      } else {
        setIsSubmitDisabled(true);
      }
      if ( values.indexInput && values.inputList !== '' && values.indexInput !== '' && +values.indexInput <= array.length - 1 && +values.indexInput >= 0) {
        setIsIndexSubmitDisabled(false);
      } else {
        setIsIndexSubmitDisabled(true);
      }
      if ( values.indexInput && values.indexInput !== '' && +values.indexInput <= array.length - 1 && +values.indexInput >= 0) {
        setIsIndexDeleteDisabled(false);
      } else {
        setIsIndexDeleteDisabled(true);
      }
  }, [values.indexInput, values.inputList])

  return (
    <SolutionLayout title="Связный список">
      <form onSubmit={(e) => e.preventDefault()} className={styles.change_list_area}>
        <Input disabled={Boolean(loadingbutton)} placeholder={'Введите значение'} onChange={handleChange} maxLength={4} type={"text"} isLimitText={true} extraClass={styles.change_input} name={'inputList'} value={values.inputList}></Input>
        <Button isLoader={loadingbutton === 'addToHeadButton'} disabled={isSubmitDisabled || Boolean(loadingbutton)} text={'Добавить в head'} onClick={addToHead} extraClass={styles.add_head_button}></Button>
        <Button isLoader={loadingbutton === 'addToTailButton'} disabled={isSubmitDisabled || Boolean(loadingbutton)} text={'Добавить в tail'} onClick={addToTail} extraClass={styles.add_tail_button}></Button>
        <Button isLoader={loadingbutton === 'deleteFromHeadButton'} disabled={Boolean(loadingbutton)} text={'Удалить из head'} onClick={deleteHead} extraClass={styles.delete_head_button}></Button>
        <Button isLoader={loadingbutton === 'deleteFromTailButton'} disabled={Boolean(loadingbutton)} text={'Удалить из tail'} onClick={deleteTail} extraClass={styles.delete_tail_button}></Button>
      </form>
      <form onSubmit={(e) => e.preventDefault()} className={styles.change_index_area}>
        <Input disabled={Boolean(loadingbutton)} placeholder={'Введите индекс'} onChange={handleChange} min={0} max={array.length - 1} maxLength={4} isLimitText={true} type={"number"} extraClass={styles.change_index_input} name={'indexInput'} value={values.indexInput}></Input>
        <Button isLoader={loadingbutton === 'addFromIndexButton'} disabled={isIndexSubmitDisabled || Boolean(loadingbutton)} text={'Добавить по индексу'} onClick={handleAddFromIndex} extraClass={styles.add_index_button}></Button>
        <Button isLoader={loadingbutton === 'deleteFromIndexButton'} disabled={isIndexDeleteDisabled || Boolean(loadingbutton)} text={'Удалить по индексу'} onClick={handleDeleteFromIndex} extraClass={styles.delete_index_button}></Button>
      </form>
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
