import { Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewContainerRef,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef,
} from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { ICharacter } from "src/app/interfaces/character";
import { IGame } from "src/app/interfaces/game";
import { CharactersService } from "src/app/services/characters.service";
import { GamesService } from "src/app/services/games.service";

@Component({
  selector: "app-search-section",
  templateUrl: "./search-section.component.html",
  styleUrls: ["./search-section.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSectionComponent implements OnInit {
  @ViewChild("searchDialog", { static: true, read: TemplateRef })
  searchDialogTemplate!: TemplateRef<any>;
  platform = "Party";
  overlayRef?: OverlayRef;
  characters$ = this.charactersService.characters$;
  selectedCharacters: ICharacter[] = [];

  games$?: Observable<IGame[]>;
  selectedGame: IGame = {
    name: "Fortnite New Season",
  } as any;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private charactersService: CharactersService,
    private cdr: ChangeDetectorRef,
    private gamesService: GamesService
  ) {}

  ngOnInit() {
    this.search(this.platform);
  }

  showSearchDialog() {
    const configs = new OverlayConfig({
      hasBackdrop: true,
      panelClass: ["modal"],
      backdropClass: "backdrop",
    });
    this.overlayRef = this.overlay.create(configs);
    this.overlayRef.attach(
      new TemplatePortal(this.searchDialogTemplate, this.viewContainerRef)
    );
    this.overlayRef.backdropClick().subscribe(() => this.closeDialog());
  }

  closeDialog() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

  addCharacter(character: ICharacter) {
    this.selectedCharacters = this.selectedCharacters.concat(character);
  }

  removeCharacter(character: ICharacter) {
    this.selectedCharacters = this.selectedCharacters.filter(
      (ch) => ch.uid !== character.uid
    );
    this.cdr.detectChanges();
  }

  isAvailable(character: ICharacter) {
    return (
      this.selectedCharacters.length < 4 &&
      !this.selectedCharacters.find((ch) => ch.uid == character.uid)
    );
  }

  trackByUid(idx: number, character: ICharacter) {
    return character.uid;
  }

  search(platform: string) {
    this.games$ = this.gamesService.search(platform);
  }

  setPlatform(platform: string) {
    this.search(platform);
    this.platform = platform;
  }

  setGame(game: IGame) {
    this.selectedGame = game;
    this.closeDialog();
  }
}
