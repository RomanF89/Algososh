interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    getContainer: () => T[] | null;
    getSize: () => number;
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];
    push = (item: T): void => {
        this.container.push(item);
    };

    pop = (): void => {
        if (this.container.length) {
            this.container.pop();
        } else {
            this.getContainer();
        }
    };

    clear = () => this.container = [];
    
    getContainer = (): T[] => {
        return this.container;
    };

    getSize = () => this.container.length;
}