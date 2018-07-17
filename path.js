//it's the DNA

class Path
{
    constructor(cities,child)
    {
      this.cities = cities;
      this.fitness=0;
      this.inedit=Path.initInedit(this.cities.length);

      if(child==undefined)
      {
        this.route=Path.initRoute(this.cities.length,this.inedit);
      }
      else
      {
        this.route=child;
      }
    }

    draw(color)
    {
      stroke(color)
      for(var i=0;i<this.route.length-1;i++)
      {
        strokeWeight(2);

        line(this.cities[this.route[i]].pos.x,this.cities[this.route[i]].pos.y,this.cities[this.route[i+1]].pos.x,this.cities[this.route[i+1]].pos.y);
      }
    }

    drawMin()
    {
      var dim=300;
      noStroke();
      fill(40);
      rect(0,height-dim,dim,dim)

      stroke(0,255,0)
      for(var i=0;i<this.route.length-1;i++)
      {
        strokeWeight(1);
        var x1=map(this.cities[this.route[i]].pos.x,0,width,0,dim);
        var y1=map(this.cities[this.route[i]].pos.y,0,width,height-dim,height);

        var x2=map(this.cities[this.route[i+1]].pos.x,0,width,0,dim);
        var y2=map(this.cities[this.route[i+1]].pos.y,0,width,height-dim,height);


        line(x1,y1,x2,y2);
      }
    }

    calculateFitness()
    {
      var d = 0;
      for(var i=0;i<this.route.length-1;i++)
      {
        d += dist(this.cities[this.route[i]].pos.x,this.cities[this.route[i]].pos.y,this.cities[this.route[i+1]].pos.x,this.cities[this.route[i+1]].pos.y);
      }

      this.fitness = pow(1/d,2);
    }

    crossover(partner)
    {
      var start = floor(random(this.route.length))
      var end = floor(random(start+1,this.route.length))

      var child = partner.route.slice(start,end);

      for(var i = 0;i<this.route.length;i++)
      {
        if(!child.includes(this.route[i]))
        {
          child.push(this.route[i]);
        }
      }
      var temp = new Path(this.cities,child);

      return temp;
    }

    mutate(mr)
    {
        var buff;

        for(var i=0;i<this.route.length;i++)
        {
          if(random(1)<mr)
          {
            buff = this.route[i];
            this.route.splice(i,1);
            this.route.push(buff);

          }
        }

    }

    static initRoute(dim,inedit)
    {
      var route = [];
      for(var i=0;i<dim;i++)
      {
        do
        {
          var quit = false;
          var r = floor(random(dim));
          if(!inedit[r])
          {
            quit=true;
            route[i] = r;
            inedit[r] = true;
          }
          else
            quit=false;
        }
        while(!quit);
      }

      return route;
    }

    static initInedit(dim)
    {
      var inedit = [];

      for(var i=0;i<dim;i++)
      {
          inedit[i] = false;
      }
      return inedit;
    }
}
