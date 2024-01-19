```cpp
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

struct Node {
    int val;
    int i;
    int j;
    Node(int val, int i, int j) : val(val), i(i), j(j) {}
};

struct compare {
    bool operator()(const Node &a, const Node &b) {
        return a.val > b.val;
    }
};

int kthSmallest(vector<vector<int>> &matrix, int k) {
    int n = matrix.size();
    priority_queue<Node, vector<Node>, compare> pq;
    for (int i = 0; i < n; i++) {
        pq.push(Node(matrix[i][0], i, 0));
    }
    for (int count = 0; count < k - 1; count++) {
        Node node = pq.top();
        pq.pop();
        if (node.j < n - 1) {
            pq.push(Node(matrix[node.i][node.j + 1], node.i, node.j + 1));
        }
    }
    return pq.top().val;
}

int main() {
    vector<vector<int>> matrix = {{1, 5, 9}, {10, 11, 13}, {12, 13, 15}};
    int k = 8;
    cout << kthSmallest(matrix, k) << endl;
    return 0;
}
```