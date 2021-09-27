import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-ad-section",
  templateUrl: "./ad-section.component.html",
  styleUrls: ["./ad-section.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdSectionComponent {
  isAnonymous$ = this.authService.isLoggedIn$.pipe(
    map((isLoggedIn) => !isLoggedIn)
  );

  constructor(private authService: AuthService) {}
}
