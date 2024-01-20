class MinHeap {
    constructor() {
        this.heap = [];
    }

    getMin() {
        return this.heap[0];
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    getSize() {
        return this.heap.length;
    }
}