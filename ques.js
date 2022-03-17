// graph for creating hash map
class Graph {
    constructor() {
        this.dependencyList = {};
    }
    addTask(task) {
        if (!this.dependencyList[task]) {
            this.dependencyList[task] = [];
        }
    }
    addDependencies(d1, d2) {
        this.dependencyList[d1].push(d2);
    }
}

function recursiveSortHelper(graph, tasks, tLength, visited, topNums) {
    visited[tasks] = true;
    // hash map dependencies
    const taskDependent = graph.dependencyList[tasks];
    for (const dependent of taskDependent) {
        if (!visited[dependent]) {
            tLength = recursiveSortHelper(graph, dependent, tLength, visited, topNums);
        }
    }
    topNums[tasks] = tLength;
    return tLength - 1;
}
function taskSort(graph) {
    const taskArray = Object.keys(graph.dependencyList);
    const visited = {};
    const topNums = {};
    let tasksLength= taskArray.length - 1;
    for (const task of taskArray) {
        if (!visited[task]) {
            tasksLength = recursiveSortHelper(graph, task, tasksLength, visited, topNums)
        }
    }
    return topNums;
}
function SortingResult(taskArray, depencencies) {
    const g = new Graph();
    // add task graph
    taskArray.forEach((task) => g.addTask(task));
    // spilt dependencies and add in graph
    depencencies.forEach(curDepen => {
        g.addDependencies(curDepen.substr(0, 1), curDepen.substr(-1, 1));
    })
    if (isCyclic(g)) {
        return "Error - this is a cyclic dependency";
    }
    return Object.keys(taskSort(g));
}

function isCyclic(graph) {
    // Mark all the task as not visited and not part of recursion stack
    let length = Object.keys(graph.dependencyList).length
    let visited = {};
    let recStack = {};
    for (let i = 0; i < length; i++) {
        visited[Object.keys(graph.dependencyList)[i]] = false;
        recStack[Object.keys(graph.dependencyList)[i]] = false;
    }

    // Call the recursive helper function to
    for (let i = 0; i < length; i++)
        if (isCyclicUtil(graph, Object.keys(graph.dependencyList)[i], visited, recStack))
            return true;

    return false;
}
function isCyclicUtil(graph, i, visited, recStack) {
    // Mark the current task node as visited as part of recursion
    if (recStack[i])
        return true;
    if (visited[i])
        return false;
    visited[i] = true;
    recStack[i] = true;
    let children = 0;
    if (i)
        children = graph.dependencyList[i];
    for (let c = 0; c < children.length; c++)
        if (isCyclicUtil(graph, children[c], visited, recStack))
            return true;
    recStack[i] = false;
    return false;
}

module.exports = SortingResult;