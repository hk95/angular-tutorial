import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeros();
  }

  getHeros(): void {
    this.heroService
      .getHeroes()
      .pipe(take(1))
      .subscribe((heros: Hero[]) => (this.heroes = heros));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService
      .addHero({ name } as Hero)
      .pipe(take(1))
      .subscribe((hero) => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h: Hero) => h !== hero);
    this.heroService.deleteHero(hero).pipe(take(1)).subscribe();
  }
}
