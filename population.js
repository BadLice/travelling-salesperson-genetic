class Population
{
      constructor(cities,mutationRate,maxPop)
      {
        this.population = [];
        this.generation=0;
        this.mutationRate=mutationRate;
        this.cities=cities;
        this.prob=0;

        for(var i=0;i<maxPop;i++)
        {
          this.population[i] = new Path(this.cities);
        }
      }

      normalizeFitness()
      {
        var sum = 0;
        for(var o of this.population)
        {
          sum+=o.fitness;
        }
        //normalizing the probability into the range 0-1
        for(var i=0;i<this.population.length;i++)
        {
          this.population[i].prob=this.population[i].fitness/sum;
        }
      }

      generate()
      {
        var best = this.getBest();

        var newPop = []
        for(var i = 0;i<this.population.length;i++)
        {

          var parent1 = this.pickOne();
          var parent2 = this.pickOne();

          var child = parent1.crossover(parent2);

          newPop[i] = new Path(this.cities,child.route);
          newPop[i].mutate(this.mutationRate);
        }
        this.population=newPop;
        this.generation++;
      }

      calculateFitness()
      {
        for(var i=0;i<this.population.length;i++)
        {
          this.population[i].calculateFitness();
        }
      }

      maxFitness()
      {
        let maxFitness = 0;
        for (let i = 0; i < this.population.length; i++) {
          if (this.population[i].fitness > maxFitness) {
            maxFitness = this.population[i].fitness;
          }
        }
        return maxFitness;
      }

      currentMax()
      {
        let maxFitness = -1;
        var current;
        for (let i = 0; i < this.population.length; i++)
        {
          if (this.population[i].fitness > maxFitness)
          {
            maxFitness = this.population[i].fitness;
            current = this.population[i];
          }
        }
        return current;

      }

      getBest()
      {
        var max = -100;
        var maxo;
        for(var o of this.population)
          {
            if(o.fitness>max)
            {
              maxo=o;
              max=o.fitness;
            }
          }
        return maxo;
      }

      draw(color)
      {
        for(var o of this.population)
            o.drawMin(color);
      }

    //pick one element of the population basing on its fitness and so to its probability
    pickOne()
    {
      //normalizes the probability
      this.normalizeFitness();

      var select = 0;
      var selector = Math.random();
      while(selector > 0)
      {
          selector-=this.population[select].prob;
          select++;
      }
      select--;
      return this.population[select];
    }

}
