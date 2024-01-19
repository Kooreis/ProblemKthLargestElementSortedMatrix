Here is a JavaScript solution using a min heap:

```javascript
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

    insert(node) {
        this.heap.push(node);
        let current = this.heap.length - 1;
        while (current > 0 && this.heap[current][0] < this.heap[(current - 1) >> 1][0]) {
            this.swap(current, (current - 1) >> 1);
            current = (current - 1) >> 1;
        }
    }

    swap(i, j) {
        let temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    pop() {
        if (this.getSize() === 1) {
            return this.heap.pop();
        }
        let smallest = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapify();
        return smallest;
    }

    heapify() {
        let current = 0;
        let leftChild = 2 * current + 1;
        let rightChild = 2 * current + 2;
        let smallest = current;

        if (this.getSize() > leftChild && this.heap[smallest][0] > this.heap[leftChild][0]) {
            smallest = leftChild;
        }
        if (this.getSize() > rightChild && this.heap[smallest][0] > this.heap[rightChild][0]) {
            smallest = rightChild;
        }
        if (smallest !== current) {
            this.swap(smallest, current);
            this.heapify(smallest);
        }
    }
}

function findKthSmallest(matrix, k) {
    let heap = new MinHeap();
    for (let i = 0; i < matrix.length; i++) {
        heap.insert([matrix[i][0], 0, matrix[i]]);
    }
    let numberCount = 0, result = 0;
    while (!heap.isEmpty()) {
        let [num, i, row] = heap.pop();
        numberCount++;
        if (numberCount === k) {
            return num;
        }
        if (matrix.length > i + 1) {
            heap.insert([row[i + 1], i + 1, row]);
        }
    }
    return result;
}

let matrix = [
    [1, 5, 9],
    [10, 11, 13],
    [12, 13, 15]
];
let result = findKthSmallest(matrix, 8);
console.log(result);
```

This program creates a min heap and inserts the first element of each row into the heap. It then removes the smallest element from the heap and inserts the next element from the same row into the heap, until it has removed k elements. The kth element removed from the heap is the kth smallest element in the matrix.