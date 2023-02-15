import {NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatNativeDateModule} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card'
import {MatBadgeModule} from '@angular/material/badge';
import { FlexLayoutModule } from "@angular/flex-layout";

const materialTheme = [

    MatIconModule,
    MatCardModule,
    MatSortModule,
    MatSliderModule,
    MatBadgeModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatMenuModule,
    MatGridListModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatRippleModule,
    MatChipsModule,
    MatTableModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSelectModule,
    MatExpansionModule,
    MatNativeDateModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
];

@NgModule({

  imports: [
    materialTheme
  ],
  exports: [
    materialTheme
  ]
})
export class MaterialModule { }
