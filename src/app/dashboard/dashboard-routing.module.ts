import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { PartyComponent } from './views/party/party.component';
import { PremiumComponent } from './views/premium/premium.component';
import { StreamsComponent } from './views/streams/streams.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'streams',
        component: StreamsComponent,
      },
      {
        path: 'party',
        component: PartyComponent,
      },
      {
        path: 'premium',
        component: PremiumComponent,
      },
      {
        path: '',
        component: HomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
