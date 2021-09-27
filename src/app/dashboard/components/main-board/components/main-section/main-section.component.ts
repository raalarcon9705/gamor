import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from "@angular/core";
import { interval, timer } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { ICharacter } from "src/app/interfaces/character";
import { IGame } from "src/app/interfaces/game";
import { CharactersService } from "src/app/services/characters.service";

@Component({
  selector: "app-main-section",
  templateUrl: "./main-section.component.html",
  styleUrls: ["./main-section.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSectionComponent {
  @Input() characters: ICharacter[] = [];
  @Input() game?: IGame;
  @Output() removeCharacter = new EventEmitter<ICharacter>();
  characters$ = this.characterService.characters$.pipe(
    tap((characters) => {
      if (!this.selectedCharacter && characters?.length) {
        this.selectCharacter(characters[0]);
      }
    })
  );
  selectedCharacter?: ICharacter;

  time = 15 * 60;
  timer$ = timer(this.time * 1000);
  countDown$ = interval(1000).pipe(
    take(this.time),
    map((val) => this.time - val),
    map((val) => {
      if (val) {
        const minutes = Math.floor(val / 60);
        const seconds = val % 60;
        return ` ${minutes < 10 ? 0 : ""}${minutes} : ${
          seconds < 10 ? 0 : ""
        }${seconds}`;
      }
      return "START";
    })
  );

  constructor(
    private cdr: ChangeDetectorRef,
    private characterService: CharactersService
  ) {}

  clearCharacter(character: ICharacter) {
    this.removeCharacter.emit(character);
    this.cdr.detectChanges();
  }

  selectCharacter(character: ICharacter) {
    if (
      !this.selectedCharacter ||
      this.selectedCharacter.uid !== character.uid
    ) {
      this.selectedCharacter = character;
    }
  }
}
