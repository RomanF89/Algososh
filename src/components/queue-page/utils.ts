interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    getQueue: () => (T | undefined)[];
}

export class Queue<T> implements IQueue<T> {
    private container: (T | undefined)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }

    getHead = () => {
        return this.head;
    }

    getTail = () => {
        return this.tail - 1;
    }

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        this.container[this.tail % this.size] = item;
        this.tail++;
        this.length++;
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        this.container[this.head % this.size] = undefined;
        this.length--;
        this.head++;
    };

    getQueue = (): (T | undefined)[] => {
        return this.container;
    };

    clear = () => {
        this.container = Array(this.size);
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    }

    isEmpty = () => this.length === 0;
}