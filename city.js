class City
{
  constructor(pos)
  {
    this.pos=pos;
  }

  update()
  {
    if(!this.finished)
     {
       this.velocity.rotate(this.dna.genes[this.genesIndex]);
       this.position.sub(this.velocity);

       if(this.genesIndex<this.dna.genes.length-1)
         this.genesIndex++;
       else
         this.finished=true;
     }
  }

  draw()
  {
      stroke(255,0,0);
      strokeWeight(15);
      point(this.pos.x,this.pos.y);
  }

  drawMin()
  {
    var dim=300;
    noStroke();
    fill(255,0,0);

    stroke(255,0,0)
    strokeWeight(7);
    var x=map(this.pos.x,0,width,0,dim);
    var y=map(this.pos.y,0,width,height-dim,height);

    point(x,y);

  }

  crossover(parent2)
  {
    return this.dna.crossover(parent2.dna);
  }

  calculateFitness()
  {
    let vel = this.time;
    if(vel<1) vel=1;

    let mult = 1;

    let d = dist(this.position.x, this.position.y, target.x, target.y);

    //reaches the target
    if(this.hitTarget)
    {
      mult=2;
      this.finished=true;
    }
    //hits the margins
    if(this.position.x<-(width/2)||this.position.x>(width/2)||this.position.y>height||this.position.y<0)
    {
      mult=0.01;
      vel=1000000;
      this.finished=true;
    }
    //hits the obstacle
    if(this.collision)
    {
      vel=1000000;
      mult=0.01;
      this.finished=true;
    }

    this.fitness = pow( 1/(d*(this.time)), 4)*mult;
  }


}
