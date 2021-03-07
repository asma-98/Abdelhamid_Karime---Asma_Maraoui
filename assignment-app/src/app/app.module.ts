import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignment/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { EditAssigmentComponent } from './assignments/edit-assigment/edit-assigment.component';
import { AuthGuard } from './shared/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { AuthentificationComponent } from './authentification/authentification.component';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { NavComponent } from './nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { ListAssignmentComponent } from './assignment/list-assignment/list-assignment.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { ListMatiersComponent } from './matiers/list-matiers/list-matiers.component';
import { AddMatiereComponent } from './matiers/add-matiere/add-matiere.component';
import { UpdateMatiereComponent } from './matiers/update-matiere/update-matiere.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ListUserComponent } from './users/list-user/list-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { UpdateAssignmentComponent } from './assignment/update-assignment/update-assignment.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const routes: Routes = [
 // { path: '', component: AssignmentsComponent },
  { path: '', component: AuthentificationComponent },
//  { path: 'home', component: AssignmentsComponent },
  { path: 'listAssignment', component: ListAssignmentComponent,canActivate: [AuthGuard]},
  { path: 'addAssignment', component: AddAssignmentComponent ,canActivate: [AuthGuard]},
  { path: 'addUser', component: AddUserComponent,canActivate: [AuthGuard] },
  { path: 'listUser', component: ListUserComponent,canActivate: [AuthGuard] },
  { path: 'addMatiere', component: AddMatiereComponent ,canActivate: [AuthGuard]},
  { path: 'updateMatiere/:id', component: UpdateMatiereComponent,canActivate: [AuthGuard] },
  { path: 'updateUser/:id', component: UpdateUserComponent ,canActivate: [AuthGuard]},
  { path: 'updateAssignment/:id', component: UpdateAssignmentComponent ,canActivate: [AuthGuard]},
  { path: 'listMatiere', component: ListMatiersComponent ,canActivate: [AuthGuard]},
  { path: 'assignment/:id', component: AssignmentDetailComponent,canActivate: [AuthGuard] },
  {
    path: 'assignment/:id/edit',
    component: EditAssigmentComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssigmentComponent,
    AuthentificationComponent,
    NavComponent,
    ListAssignmentComponent,
    ListMatiersComponent,
    AddMatiereComponent,
    UpdateMatiereComponent,
    AddUserComponent,
    ListUserComponent,
    UpdateUserComponent,
    UpdateAssignmentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ScrollingModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatTabsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
