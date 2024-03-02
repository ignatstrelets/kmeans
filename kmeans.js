function initCentroids(k) {
    var centroids = new Array();
    let i = 0;
    while (i < k) {
        centroids[i] = new Array();
        let j = 0
        while (j < 3) {
            centroids[i][j] = Math.random()
            j++
        }
        i++
    }
    return centroids
}

function evaluateAllDistances(centroids, dataset) {
    var distances = new Array();
    let i = 0;
    while (i < dataset.length) {
        distances[i] = new Array();
        let j = 0;
        while (j < centroids.length) {
            distances[i][j] = distance(dataset[i], centroids[j]);
            j++;
        }
        i++;
    }
    return distances;
}

function distance(a, b) {
    linearDistances = new Array();
    let i = 0;
    while (i < 3) {
        linearDistances[i] = a[i] - b[i];
        i++
    }
    dx = linearDistances[0];
    dy = linearDistances[1];
    dz = linearDistances[2];
    return Math.sqrt( dx * dx + dy * dy + dz * dz );
}

class LabeledPoint {
    constructor(point, label) {
        this.point = point;
        this.label = label;
    }
}

function labelPoints(dataset, distances) {
    labeledPoints = new Array();
    let i = 0;
    while (i < distances.length) {
        let minimalDistance = Math.min.apply(Math, distances[i]);
        nearestCentroidIndex = distances[i].indexOf(minimalDistance)
        labeledPoints[i] = new LabeledPoint(dataset[i], nearestCentroidIndex)
        i++;
    }
    return labeledPoints
}

function reevaluateCentroids(labeledPoints, k) {
    let i = 0;
    var clusters = new Array();
    while (i < k) {
        let j = 0;
        clusters[i] = new Array();
        while (j < labeledPoints.length) {
            if (labeledPoints[j].label === i) {
                clusters[i].push(labeledPoints[j].point)
            }
            j++
        }
        i++;
    }
    clusters = validateClusters(clusters, k)
    i = 0;
    var centroids = new Array();
    while (i < clusters.length) {
        let j = 0;
        let sumByDimension = 0;
        if (clusters[i].length === 0) { i++; continue; }
        let clusterCentroid = new Array();
        let sumByX = 0;
        let sumByY = 0;
        let sumByZ = 0;
        while (j < clusters[i].length) {
            let dimension = 0;
            sumByX += clusters[i][j][0]
            sumByY += clusters[i][j][1]
            sumByZ += clusters[i][j][2]
            j++
            }
        meanByX = sumByX / clusters[i].length
        meanByY = sumByY / clusters[i].length
        meanByZ = sumByZ / clusters[i].length

        clusterCentroid = [meanByX,meanByY,meanByZ]
        if (clusterCentroid.length === 0) { i++; continue; }
        centroids.push(clusterCentroid)
        i++
    }
    return centroids
}

function validateClusters(clusters, k) {
    i = 0;
    while (i < k) {
        if (clusters[i].length === 0) {
            randomPointCluster = [[Math.random(), Math.random(), Math.random()]]
            clusters[i] = randomPointCluster
        }
        i++
    }
    return clusters
}

function clusterize(k, dataset, centroids) {
    distances = evaluateAllDistances(centroids, dataset);
    labeledPoints = labelPoints(dataset, distances);
    reevaluatedCentroids = reevaluateCentroids(labeledPoints, k);
    while (centroids.toString() != reevaluatedCentroids.toString()) {
        centroids = clusterize(k, dataset, reevaluatedCentroids)
    }
    return centroids
}

function kmeans(k, dataset) {
    centroids = initCentroids(k);
    centroids = clusterize(k, dataset, centroids)
    return centroids
}

// example:
// input:
// dataset = [[1,3,4],[2,1,23],[4,3,42],[5,4,32],[6,7,242],[8,9,2424]]
// console.log(kmeans(2, dataset))
//
// output:
// [ [ 3.6, 3.6, 68.6 ], [ 8, 9, 2424 ] ]

dataset = [[1,3,4],[2,1,23],[4,3,42],[5,4,32],[6,7,242],[8,9,2424]]
console.log(kmeans(2, dataset))





