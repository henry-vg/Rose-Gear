const scaleFactor = 400,
  velocity = 1,
  roseDiameterRatio = 0.9, //related to n
  vertexes = [];

let n = 1, //first circle diameter
  k = 3.1,
  d = n / k, //second circle diameter
  nAngle = 0,
  dAngle = 0,
  center, //first circle center
  pause = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  n *= scaleFactor;
  d *= scaleFactor;
  if ((height - d) / 2 < n / 2) {
    center = createVector(width / 2, n / 2);
  }
  else {
    center = createVector(width / 2, (height - d) / 2);
  }
}

function draw() {
  background(255);

  fill(200, 200, 200);
  stroke(0);
  strokeWeight(1);

  circle(center.x, center.y, n); //contains rose
  line((n / 2) * cos(nAngle) + center.x, (n / 2) * sin(nAngle) + center.y, -(n / 2) * cos(nAngle) + center.x, -(n / 2) * sin(nAngle) + center.y); //abscissa
  line((n / 2) * cos(nAngle + 90) + center.x, (n / 2) * sin(nAngle + 90) + center.y, -(n / 2) * cos(nAngle + 90) + center.x, -(n / 2) * sin(nAngle + 90) + center.y); //ordinate

  fill(125, 125, 125);

  circle(center.x, ((n + d) / 2) + center.y, d); //doesn't contains rose
  line((d / 2) * cos(dAngle) + center.x, (d / 2) * sin(dAngle) + ((n + d) / 2) + center.y, -(d / 2) * cos(dAngle) + center.x, -(d / 2) * sin(dAngle) + ((n + d) / 2) + center.y); //abscissa
  line((d / 2) * cos(dAngle + 90) + center.x, (d / 2) * sin(dAngle + 90) + ((n + d) / 2) + center.y, -(d / 2) * cos(dAngle + 90) + center.x, -(d / 2) * sin(dAngle + 90) + ((n + d) / 2) + center.y); //ordinate

  stroke(0, 0, 255);
  strokeWeight(7);

  const rotatingPoint = createVector(center.x + (((n / 2) * roseDiameterRatio) * cos(dAngle)), ((n + d) / 2) + center.y + (((n / 2) * roseDiameterRatio) * sin(dAngle))),
    currentPoint = createVector(rotatingPoint.x, center.y);

  point(rotatingPoint.x, rotatingPoint.y);
  point(currentPoint.x, currentPoint.y);

  vertexes.push(currentPoint);

  strokeWeight(2);

  line(center.x, ((n + d) / 2) + center.y, rotatingPoint.x, rotatingPoint.y);

  strokeWeight(0.5);

  line(currentPoint.x, currentPoint.y, rotatingPoint.x, rotatingPoint.y);
  line(center.x - ((n / 2) * roseDiameterRatio), center.y, center.x + ((n / 2) * roseDiameterRatio), center.y);

  stroke(255, 0, 0);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let i = 0; i < vertexes.length; i++) //draw rose
  {
    const r = vertexes[i].x - center.x,
      vertexAngle = (i * (velocity / k)) + nAngle;
    vertex(r * cos(vertexAngle) + center.x, r * sin(vertexAngle) + center.y);
  }
  endShape();

  dAngle += velocity;
  nAngle -= velocity / k;
}

function mouseClicked() {
  pause = !pause;
  if (pause) {
    noLoop();
  }
  else {
    loop();
  }
}