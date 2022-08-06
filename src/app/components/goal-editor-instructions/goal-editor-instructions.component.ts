import { Component, OnInit } from '@angular/core';
import { ImageUrlService } from 'src/app/provider/image-url.service';

@Component({
  selector: 'goal-editor-instructions',
  templateUrl: './goal-editor-instructions.component.html',
  styleUrls: ['./goal-editor-instructions.component.scss']
})
export class GoalEditorInstructionsComponent implements OnInit {

  public currentInformationPopup: 'goalExample' | 'information' | 'finishGoals' | 'legend' | 'none';

  public imageUrls: Record<string, string>;

  private images = ['information.png'];

  constructor(
    private imageUrlService: ImageUrlService
  ) { 
    this.imageUrls = this.imageUrlService.createImageUrls(this.images);
  }

  ngOnInit(): void {
  }
  
  public toggleInformationPopup(popup) {
    if (this.currentInformationPopup === popup) {
      this.currentInformationPopup = 'none';
    } else {
      this.currentInformationPopup = popup;
    }
  }

}
