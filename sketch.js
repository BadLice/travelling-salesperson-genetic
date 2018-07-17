var mutationRate = 0.01;
var maxPop = 500;
var people;
var info;
var nCities = 4;
var cities=[];
var people = [];
var bestPath;
var precBest=0;

function setup()
{

  createCanvas(800,600);
  background(0);

  initCities();

  initVar();

  info=createP()
  up = createButton('Add city');
  down = createButton('Remove city');

  up.mousePressed(addCity);
  down.mousePressed(removeCity);

}

function draw()
{
  background(0)


  people.generate();
  people.calculateFitness();
  people.draw();

  drawCities();
  displayInfo();

}

function initVar()
{
  bestPath=null;
  perecBest=0;
  people = new  Population(cities,mutationRate,maxPop);
  bestPath = new Path(cities);
}

function initCities()
{
  cities=[];
  for(var i=0;i<nCities;i++)
  {
    cities[i] = new City(createVector(random(1,width),random(1,height)));
  }
}

function drawCities()
{
  for(var o of cities)
  {
    o.draw();
    o.drawMin();
  }
}

function displayInfo()
{
  var temp = people.currentMax();
  if(temp.fitness>bestPath.fitness)
    bestPath=temp;

  bestPath.draw(color(0,0,255));

  infostr="Best fitness: "+sqrt(bestPath.fitness)/100+" <br>Generation: "+people.generation+" <br>Improve rate: "+map(bestPath.fitness,0,precBest,0,1)+"<br>Mutation rate: "+(mutationRate*100)+"%<br>Cities number: "+cities.length+"<br>Population: "+maxPop;

  info.html(infostr);

  precBest=bestPath.fitness;

}

function addCity()
{
    nCities++;
    cities.push(new City(createVector(random(1,width),random(1,height))));
    initVar();
}

function removeCity()
{
    nCities--;
    cities.splice(cities.length-1)
    initVar();
}
