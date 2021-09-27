import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartyComponent {
  constructor() {}
}
