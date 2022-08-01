import { Inject, Injectable } from '@angular/core';
import { ColorConfig, COLOR_CONFIG } from '../constants/colors';
import { Goal } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(
    @Inject(COLOR_CONFIG)
    private colors: ColorConfig,
  ) { }

  public getGoalColor(goals: Goal[]): string {
    const alreadyUsedColors = goals.map(goal => goal.color);
    const availableColors = this.colors.filter(color => !alreadyUsedColors.includes(color));

    const randomColor = availableColors.length ? this.chooseRandomColor(availableColors) : '#8e44ad';

    return randomColor;
  }

  private chooseRandomColor(colors: string[]) {
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
