import PriorityQueue from './priority-queue'

/**
 * Pathfinding starts here
 */
export default function Graph(vertices) {
    let INFINITY  = 1 / 0;
    this.vertices = vertices;

    this.addVertex = function (name, edges) {
        this.vertices[name] = edges;
    };

    this.shortestPath = function (start, finish) {
        let nodes     = new PriorityQueue(),
            distances = {},
            previous  = {},
            path      = [],
            smallest, vertex, neighbor, alt;

        for (vertex in this.vertices) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(0, vertex);
            } else {
                distances[vertex] = INFINITY;
                nodes.enqueue(INFINITY, vertex);
            }

            previous[vertex] = null;
        }

        while (!nodes.isEmpty()) {
            smallest = nodes.dequeue();

            if (smallest === finish) {
                path = [];

                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }

                break;
            }

            if (!smallest || distances[smallest] === INFINITY) {
                continue;
            }

            for (neighbor in this.vertices[smallest]) {
                alt = distances[smallest] + this.vertices[smallest][neighbor];

                if (alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    previous[neighbor]  = smallest;

                    nodes.enqueue(alt, neighbor);
                }
            }
        }

        return path;
    };
}