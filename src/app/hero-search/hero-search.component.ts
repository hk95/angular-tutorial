import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
})
export class HeroSearchComponent implements OnInit {
  private searchTerms = new Subject<string>();

  heroes$: Observable<Hero[]> = this.searchTerms.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((term: string) => this.heroService.searchHeroes(term))
  );

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {}

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
