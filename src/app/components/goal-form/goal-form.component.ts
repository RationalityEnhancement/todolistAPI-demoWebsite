import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { GoalService } from 'src/app/provider/goal.service';
import { Goal } from '../../interfaces/item'

@Component({
  selector: 'goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.scss']
})
export class GoalFormComponent implements OnInit {

  @Input() public goal: Goal;
  @Output() public close = new EventEmitter<void>();

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
    private formBuilder: FormBuilder,
    private goalService: GoalService
  ) {
    this.initForm();
  }

  public ngOnInit(): void {
    this.hydrateForm(this.goal);
  }

  public editGoal(): void {
    const updatedValues = this.form.value;

    const goal = { ...this.goal, ...updatedValues };

    this.goalService.editGoal(goal);
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

  private hydrateForm(goal: Goal): void {
    this.form.patchValue({
      name: goal.name,
      value: goal.value,
      time_est: goal.time_est,
      deadline: goal.deadline
    })
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
