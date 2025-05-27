import { Routes } from '@angular/router';
import { AuthComponent } from '../components/auth/auth.component';
import { UsersComponent } from '../components/users/users.component';
import { TemplatesComponent } from '../components/add-templates/templates.component';
import { TemplatesListComponent } from '../components/templates-list/templates-list.component';
import { AuthGuard } from '../guard/auth.guard';
import { FieldPlacementComponent } from '../components/field-positioner/field-positioner.component';
import { AnalyticsComponent } from '../components/analytics/analytics.component';
import { MarketingEmailComponent } from '../components/marketing-email/marketing-email.component';
import { HomePageComponent } from '../components/home-page/home-page.component';

export const routes: Routes = [
    { path: '',component: HomePageComponent },
    { path: 'login', component: AuthComponent },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'templates', component: TemplatesComponent, canActivate: [AuthGuard] },
    { path: 'template-list', component: TemplatesListComponent, canActivate: [AuthGuard] },
    {
        path: 'positions/:id',
        component: FieldPlacementComponent, canActivate: [AuthGuard]
    }
    , { path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard] }
    , { path: 'sendEmail', component: MarketingEmailComponent, canActivate: [AuthGuard] }



];
