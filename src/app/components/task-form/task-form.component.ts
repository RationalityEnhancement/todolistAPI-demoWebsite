import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Goal, Item } from 'src/app/interfaces/item';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Input() public goal: Goal;
  @Input() public task: Item;

  @Output() public close = new EventEmitter<void>();
  @Output() public submitTask = new EventEmitter<Item>();

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

    if (this.task) {
      this.hydrateForm();
    }
  }

  public submitForm(): void {
    const taskProperties = this.form.value;
    const task = { ...this.task, ...taskProperties }

    this.submitTask.emit(task);
    this.closeForm();
  }

  public closeForm(): void {
    this.close.emit();
  }

  private initForm(): void {
    const nameValidators = [Validators.required];
    const estimateValidators = [Validators.required, Validators.min(0.1), Validators.max(4)];
    const deadlineValidators = [this.deadlineValidator()];

    this.form = this.formBuilder.group({
      name: ['', nameValidators],
      time_est: ['', estimateValidators],
      deadline: ['', deadlineValidators],
    });
  }

  private hydrateForm(): void {
    this.form.patchValue({
      name: this.task.name,
      time_est: this.task.time_est,
      deadline: this.task.deadline
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
