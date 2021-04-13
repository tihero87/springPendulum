// Функция возвращает координаты пружины в состоянии покоя т.е. при х0 = 0
export function drawPeace(x0, points) {
    let pointsArray = points.split(' ');
    let newArray = [pointsArray[0], pointsArray[1]];

    for (let i = 2; i < pointsArray.length; i++ ){
        let pointArray = pointsArray[i].split(',');
        let newPoint = pointArray[0] + "," + (pointArray[1] - parseInt(x0));
        newArray.push(newPoint);
    }

    return newArray;
}