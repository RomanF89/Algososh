import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css';
import { Queue } from "./utils";

export const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState<(string | undefined)[]>();
  const [inputState, setInputState] = useState<string>('');
  const [head, setHead] = useState<string>('');
  const [tail, setTail] = useState<string>('');
  const [isTailChange, setIsTailChange] = useState(false);
  const [isHeadChange, setIsHeadCahnge] = useState(false);
  const [loadingbutton, setLoadingButton] = useState('');


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value)
  }

  const newQueue = useMemo(() => new Queue<string>(10), []);

  const enqueue = () => {
    if (queue && +tail === queue.length - 1) {
      return
    }
    if (inputState === '' || inputState.startsWith(' ')) {
      return
    }
    setLoadingButton('enqueueButton');
    setInputState('');
    setIsTailChange(true);
    setTimeout(() => {
      newQueue.enqueue(inputState);
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


  return (
    <SolutionLayout title="Очередь">
      <div className={styles.input_area}>
        <Input disabled={Boolean(loadingbutton)} onChange={handleChange} maxLength={4} type={"text"} isLimitText={true} extraClass={styles.queue_input} value={inputState}></Input>
        <Button isLoader={loadingbutton === 'enqueueButton'} disabled={Boolean(loadingbutton)} onClick={enqueue} text={"Добавить"} extraClass={styles.queue_add_button}></Button>
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
