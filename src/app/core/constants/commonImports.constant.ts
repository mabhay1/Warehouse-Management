import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GetValidationErrorPipe } from "../../shared/pipes/get-validation-error-pipe";
import { AsyncPipe, NgClass, NgFor, NgIf } from "@angular/common";
import { MyButton } from "../../shared/reusableComponents/my-button/my-button";
import { FormField } from "@angular/forms/signals";
import { RouterLink } from "@angular/router";

export const COMMON_IMPORTS={
    FORMS:[
        FormsModule,
        ReactiveFormsModule,
        FormField,
        GetValidationErrorPipe,
        NgClass,
        NgIf,
        NgFor,
        AsyncPipe,
        MyButton,
        RouterLink
    ]
}