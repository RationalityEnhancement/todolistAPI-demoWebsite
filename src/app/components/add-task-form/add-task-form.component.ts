import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Goal } from '../../interfaces/item';

@Component({
  selector: 'add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss']
})
export class AddTaskFormComponent implements OnInit {

  @Input() public goal: Goal;
  
  @Output() public close = new EventEmitter<void>();
  @Output() public submitTask = new EventEmitter<Goal>();

  public form: FormGroup;

  public get name() {
    return this.form.get('name');
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
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public submitForm(): void {
    const goalProperties = this.form.value;

    this.submitTask.emit(goalProperties);
    this.closeForm();
  }

  public closeForm(): void {
    this.close.emit();
  }

  private initForm(): void {
    const nameValidators = [Validators.required];
    const estimateValidators = [Validators.required, Validators.min(0.1)];
    const deadlineValidators = [this.deadlineValidator()];

    this.form = this.formBuilder.group({
      name: ['', nameValidators],
      time_est: ['', estimateValidators],
      deadline: ['', deadlineValidators],
    });
  }

  private deadlineValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const deadlineDate = new Date(control.value);
      const goalDeadline = new Date(this.goal.deadline);
      const todayDate = new Date(new Date().toISOString().substring(0, 10));

      const deadlineInPast = deadlineDate < todayDate;
      const afterGoalDeadline = deadlineDate > goalDeadline;

      if (deadlineInPast) {
        return { deadlineInPast: { value: control.value } };
      }
      
      if (afterGoalDeadline) {
        return { afterGoalDeadline: { value: control.value } };
      }
      
      return null;
    };
  } 
}
