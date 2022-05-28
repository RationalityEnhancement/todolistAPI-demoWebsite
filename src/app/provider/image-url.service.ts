import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class ImageUrlService {

    constructor() { }

    public createImageUrl(image: string) {
        const imgDirectory = `${environment.host}/assets/images`;

        return `${imgDirectory}/${image}`;
    }

    public createImageUrls(images: string[]) {
        return images.reduce((result, image) => ({
            ...result,
            [image]: this.createImageUrl(image)
        }), {} as Record<string, string>);
    }
}