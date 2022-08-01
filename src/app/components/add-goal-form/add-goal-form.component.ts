import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Goal } from 'src/app/interfaces/item';

@Component({
  selector: 'add-goal-form',
  templateUrl: './add-goal-form.component.html',
  styleUrls: ['./add-goal-form.component.scss']
})
export class AddGoalFormComponent implements OnInit {

  @Input() public goal: Goal;
  
  @Output() public close = new EventEmitter<void>();
  @Output() public submitGoal = new EventEmitter<Goal>();

  public form: FormGroup;

  public get name() {
    return this.form.get('name');
  }

  public get value() {
    return this.form.get('value');
  }

  public get estimate() {
    return this.form.get('time_est');
  }

  public get deadline() {
    return this.form.get('deadline');
  }


  constructor(
    private formBuilder: FormBuilder
  ) {
    this.initForm();
  }

  public ngOnInit(): void {
    this.hydrateForm();
  }

  public submitForm(): void {
    const goalProperties = this.form.value;

    this.submitGoal.emit(goalProperties);
    this.closeForm();
  }

  public closeForm(): void {
    this.close.emit();
  }

  private initForm(): void {
    const goalNameValidators = [Validators.required];
    const goalValueValidators = [Validators.required, Validators.min(1), Validators.max(100)];
    const goalEstimateValidators = [Validators.required, Validators.min(0.1)];
    const goalDeadlineValidators = [this.deadlineValidator()];

    this.form = this.formBuilder.group({
      name: ['', goalNameValidators],
      value: ['', goalValueValidators],
      time_est: ['', goalEstimateValidators],
      deadline: ['', goalDeadlineValidators]
    });
  }

  private hydrateForm(): void {
    this.form.patchValue({
      deadline: this.getDefaultDeadline()
    });
  }

  private getDefaultDeadline(): string {
    const dateInOneWeek = new Date(Date.now() + 12096e5 / 2);
    const defaultDeadline = dateInOneWeek.toISOString().substring(0, 10);

    return defaultDeadline;
  }

  private deadlineValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const deadlineDate = new Date(control.value);
      const todayDate = new Date(new Date().toISOString().substring(0, 10));

      const deadlineInPast = deadlineDate < todayDate;
      return deadlineInPast ? { invalidDeadline: { value: control.value } } : null;
    };
  }
}
