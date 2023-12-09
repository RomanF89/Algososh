export type TСircleChange = {
    num: number | null;
    index: number | null;
    operation?: string | undefined;
  };

class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
      this.value = value;
      this.next = (next === undefined ? null : next);
    }
  }

  interface ILinkedList<T> {
    append: (element: T) => void;
    getSize: () => number;
    print: () => void;
  }

  export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private size: number;
    constructor() {
      this.head = null;
      this.size = 0;
    }

    insertAt(element: T, index: number) {
      if (index < 0 || index > this.size) {
        console.log('Enter a valid index');
        return;
      } else {
        const node = new Node(element);
        let currentNode = this.head
        if (index === 0) {
          node.next = currentNode;
          this.head = node;
        } else {
          let currIndex = 0;
          let previousNode;
          while (currIndex < index) {
            if (currentNode) {
              currIndex++
              previousNode = currentNode
              currentNode = currentNode.next
            }
          }
          if (previousNode) {
            node.next = currentNode;
            previousNode.next = node;
          }

        }
        this.size++;
      }
    }

    append(element: T) {
      const node = new Node(element);
      if (this.head === null) {
        this.head = node;
      } else {
        let currentNode = this.head;
        while (currentNode.next) {
          currentNode = currentNode.next
        }
        currentNode.next = node
      }
      this.size++;
    }

    deleteHead() {
      if (!this.head) return
      let curr = this.head;
      this.head = curr.next;
      this.size--;
    }

    deleteTail() {
      if (!this.head) return;
      let curr = this.head;
      let prev = curr;
      while (curr.next) {
        prev = curr;
        curr = curr.next;
      }
      prev.next = null;
      this.size--;
    }

    deleteIndex(index: number) {
      if (index < 0 || index > this.size) {
        return;
      } else {
        if (index === 0) {
          if (!this.head) return;
          let curr = this.head;
          this.head = curr.next;
          this.size--;
        } else {
          let curr = this.head;
          let currIndex = 0;

          while (currIndex < index - 1 && curr && curr.next) {
            currIndex++;
            curr = curr.next;
          }
          if (curr && curr.next) {
            curr.next = curr.next.next;
          }
          this.size--;
        }
      }
    }

    getSize() {
      return this.size;
    }

    print() {
      let curr = this.head;
      let arr = [];
      while (curr) {
        arr.push(curr.value)
        curr = curr.next;
      }
      return arr
    }
  }