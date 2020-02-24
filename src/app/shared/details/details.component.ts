import {CrudService} from "../../core/crud/services/crud.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';

export abstract class DetailsComponent<INSTANCE_DTO> implements OnInit, OnDestroy {
    id: number;
    savedAndExit: boolean;
    form: FormGroup;
    instanceDto: INSTANCE_DTO;
    protected formBuilder: FormBuilder = new FormBuilder();
    constructor(
        private service: CrudService<INSTANCE_DTO, undefined>,
        private route: ActivatedRoute,
        protected router: Router,
        private location: Location,
        protected toastrService: ToastrService
    ) {
        this.id = Number(this.route.snapshot.paramMap.get("id"));
    }

    async ngOnInit(): Promise<void> {
        this.instanceDto = await this.service.getInstance(this.id).toPromise();
        this.configForm();
        this.setForm();
    }

    ngOnDestroy(): void {
        if (this.form.dirty && !this.savedAndExit) {
            this.toastrService.warning('Changes are not saved!');
        }
    }

    abstract onDeleteSuccessful(): void;

    abstract onUpdateSuccessful(): void;

    protected configForm() {
        this.form = this.formBuilder.group({});
        const keys = Object.getOwnPropertyNames(this.instanceDto);
        keys.forEach(key => {
            this.form.addControl(key, new FormControl())
        });
    }

    protected setForm() {
        const keys = Object.getOwnPropertyNames(this.instanceDto);
        keys.forEach(key => {
            if (this.form.controls[key]) {
                this.form.controls[key].patchValue(this.instanceDto[key]);
            }
        });
    }


    public delete(): void {
        this.service.deleteInstance(this.id).subscribe((success: boolean) => {
            if (success) {
                this.toastrService.success('Successful deleted!');
                this.savedAndExit = true;
                this.location.back();
                this.onDeleteSuccessful();
            } else {
                this.toastrService.error('An error occurred during deleting');
            }
        });
    }

    public update(): void {
        this.service.update(this.id, this.form.value).subscribe((success: boolean) => {
            if (success) {
                this.toastrService.success('Successful saved!');
                this.savedAndExit = true;
                this.location.back();
                this.onUpdateSuccessful();
            } else {
                this.toastrService.error('An error occurred during saving');
            }
        });
    }

    public goBack(): void {
        this.location.back();
    }


}