import {OnDestroy} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CrudService} from "../../core/crud/services/crud.service";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";

export abstract class AddComponent<INSTANCE_DTO, INSTANCE_CREATE_DTO> implements OnDestroy {
    savedAndExit: boolean;
    form: FormGroup;
    instanceCreateDto: INSTANCE_CREATE_DTO;
    protected formBuilder: FormBuilder = new FormBuilder();

    abstract onCreateSuccessfully();

    constructor(
        private service: CrudService<INSTANCE_DTO, INSTANCE_CREATE_DTO>,
        private location: Location,
        protected toastrService: ToastrService
    ) {
        this.configForm();
    }

    public ngOnDestroy(): void {
        if (this.form.dirty && !this.savedAndExit) {
            this.toastrService.warning('The creating process has been abandoned');
        }
    }

    public create(): void {
        this.service.add(this.form.value).subscribe((success: boolean) => {
            if (success) {
                this.toastrService.success('Creating process completed');
                this.savedAndExit = true;
                this.onCreateSuccessfully();
                this.location.back();
            } else {
                this.toastrService.error('Creating process failed');
            }
        });
    }

    public goBack(): void {
        this.location.back();
    }


    protected configForm() {
        this.form = this.formBuilder.group({});
        const keys = Object.getOwnPropertyNames(this.instanceCreateDto);
        keys.forEach(key => {
            this.form.addControl(key, new FormControl('', Validators.required))
        });
    }
}