import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { ImageUrlService } from "../../provider/image-url.service";

@Component({
  selector: "init",
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InitComponent {

  constructor(
    public router: Router,
    private imagUrlService: ImageUrlService
  ) { }

  public get logoUrl() {
    return this.imagUrlService.createImageUrl('logo.png');
  }

  public route() {
    this.router.navigateByUrl('/list') //skip login.component.ts
  }
}