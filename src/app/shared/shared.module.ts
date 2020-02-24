import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogComponent} from './dialog/components/dialog.component';
import {MatDialogModule, MatIconModule, MatTooltipModule} from '@angular/material';
import {DialogService} from './dialog/services/dialog.service';
import {InfoIconComponent} from './info-icon/info-icon.component';
import {H2Component} from './headings/h2/h2.component';
import {H3Component} from './headings/h3/h3.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,

        // Material
        MatDialogModule,
        MatIconModule,
        MatTooltipModule,
    ],
    providers: [DialogService],
    declarations: [DialogComponent, InfoIconComponent, H2Component, H3Component],
    exports: [InfoIconComponent, H2Component, H3Component],
    entryComponents: [DialogComponent],
})
export class SharedModule {
}
