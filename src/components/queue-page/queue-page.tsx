import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css';
import { Queue } from "./utils";

interface IForm {
  values : {
    inputQueue?: string,
  }
  handleChange: (event: any) => void,
  setValues: Dispatch<SetStateAction<{}>>,
}

export const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState<(string | undefined)[]>();
  const [head, setHead] = useState<string>('');
  const [tail, setTail] = useState<string>('');
  const [isTailChange, setIsTailChange] = useState(false);
  const [isHeadChange, setIsHeadCahnge] = useState(false);
  const [loadingbutton, setLoadingButton] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const {values, handleChange, setValues}: IForm  = useForm({inputQueue: ''});

  const newQueue = useMemo(() => new Queue<string>(10), []);

  const enqueue = () => {
    if (queue && +tail === queue.length - 1) {
      return
    }
    if (values.inputQueue === '' || values.inputQueue!.startsWith(' ')) {
      return
    }
    setLoadingButton('enqueueButton');
    setValues({inputQueue: ''});
    setIsTailChange(true);
    setTimeout(() => {
      values.inputQueue && newQueue.enqueue(values.inputQueue);
      setHead(newQueue.getHead().toString());
      setTail(newQueue.getTail().toString());
      setQueue([...newQueue.getQueue()]);
      setIsTailChange(false);
      setLoadingButton('');
    }, 500)
  }

  const dequeue = () => {
    if (queue && queue[+head] === '') {
      return
    }
    setLoadingButton('dequeueButton');
    setIsHeadCahnge(true);
    setTimeout(() => {
      newQueue.dequeue();
      setQueue([...newQueue.getQueue()]);
      setHead(newQueue.getHead().toString());
      setTail(newQueue.getTail().toString());
      setIsHeadCahnge(false);
      setLoadingButton('');
    }, 500)
  }

  const clear = () => {
    newQueue.clear();
    setQueue(newQueue.getQueue().fill(''));
    setHead('');
    setTail('');
    setIsHeadCahnge(false);
  }

  useEffect(() => {
    setQueue(newQueue.getQueue().fill(''));
  }, [])

  useEffect(() => {
    if (values.inputQueue !== '' && values.inputQueue!.length <= 4) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [values.inputQueue])


  return (
    <SolutionLayout title="Очередь">
      <div className={styles.input_area}>
        <Input disabled={Boolean(loadingbutton)} onChange={handleChange} maxLength={4} type={"text"} isLimitText={true} extraClass={styles.queue_input} name={'inputQueue'} value={values.inputQueue}></Input>
        <Button isLoader={loadingbutton === 'enqueueButton'} disabled={ isSubmitDisabled || Boolean(loadingbutton)} onClick={enqueue} text={"Добавить"} extraClass={styles.queue_add_button}></Button>
        <Button isLoader={loadingbutton === 'dequeueButton'} disabled={Boolean(loadingbutton)} onClick={dequeue} text={"Удалить"} extraClass={styles.queue_delete_button}></Button>
        <Button disabled={Boolean(loadingbutton)} onClick={clear} text={"Очистить"} extraClass={styles.queue_clear_button}></Button>
      </div>
      <div className={styles.queue_area}>
        <div className={styles.queue_items}>
          {queue && queue.map((item, index) =>
            <Circle key={index}
              index={index}
              extraClass={styles.queue_item}
              head={+head === index && queue[0] !== '' ? <p className={styles.queue_head}>{'head'}</p> : null}
              tail={+tail === index && queue[0] !== '' ? <p className={styles.queue_tail}>{'tail'}</p> : null}
              letter={item}
              state={
                queue[0] === '' && index === 0 && isTailChange ? ElementStates.Changing :
                  (queue[0] !== '' && (index === +tail + 1) && isTailChange) ? ElementStates.Changing :
                    index === +head && isHeadChange ? ElementStates.Changing :
                      ElementStates.Default}
            />
          )}
        </div>
      </div>
    </SolutionLayout>
  );
};
