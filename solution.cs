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