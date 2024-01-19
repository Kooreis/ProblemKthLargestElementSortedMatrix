Here is a TypeScript solution using a min heap:

```typescript
class MinHeap {
    heap: number[];

    constructor() {
        this.heap = [];
    }

    getLeftChildIndex(parentIndex: number) {
        return 2 * parentIndex + 1;
    }

    getRightChildIndex(parentIndex: number) {
        return 2 * parentIndex + 2;
    }

    getParentIndex(childIndex: number) {
        return Math.floor((childIndex - 1) / 2);
    }

    hasLeftChild(index: number) {
        return this.getLeftChildIndex(index) < this.heap.length;
    }

    hasRightChild(index: number) {
        return this.getRightChildIndex(index) < this.heap.length;
    }

    hasParent(index: number) {
        return this.getParentIndex(index) >= 0;
    }

    leftChild(index: number) {
        return this.heap[this.getLeftChildIndex(index)];
    }

    rightChild(index: number) {
        return this.heap[this.getRightChildIndex(index)];
    }

    parent(index: number) {
        return this.heap[this.getParentIndex(index)];
    }

    swap(indexOne: number, indexTwo: number) {
        let temp = this.heap[indexOne];
        this.heap[indexOne] = this.heap[indexTwo];
        this.heap[indexTwo] = temp;
    }

    peek() {
        if (this.heap.length === 0) {
            throw new Error('Heap is empty');
        }
        return this.heap[0];
    }

    poll() {
        if (this.heap.length === 0) {
            throw new Error('Heap is empty');
        }
        let item = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();
        return item;
    }

    add(item: number) {
        this.heap.push(item);
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (this.hasParent(index) && this.parent(index) > this.heap[index]) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) && this.rightChild(index) < this.leftChild(index)) {
                smallerChildIndex = this.getRightChildIndex(index);
            }

            if (this.heap[index] < this.heap[smallerChildIndex]) {
                break;
            } else {
                this.swap(index, smallerChildIndex);
            }
            index = smallerChildIndex;
        }
    }
}

function findKthLargest(matrix: number[][], k: number) {
    let minHeap = new MinHeap();
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            minHeap.add(matrix[i][j]);
            if (minHeap.heap.length > k) {
                minHeap.poll();
            }
        }
    }
    return minHeap.peek();
}

let matrix = [[1, 5, 9], [10, 11, 13], [12, 13, 15]];
let k = 8;
console.log(findKthLargest(matrix, k));
```

This solution uses a min heap to keep track of the kth largest element. It iterates through the matrix and adds each element to the heap. If the heap size exceeds k, it removes the smallest element. After iterating through the entire matrix, the top of the heap will be the kth largest element.