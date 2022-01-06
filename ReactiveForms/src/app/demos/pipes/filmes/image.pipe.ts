import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'imageformater'
})

export class ImageFormaterPipe implements PipeTransform {
    transform(imageName: string, caminho: string = '', substituir: boolean) {
        if (caminho == 'default') {
            caminho = 'assets/';
        }


        if (imageName.length == 0 && substituir) {
            imageName = 'semCapa.png';
        }

        return "/" + caminho + imageName;
    }

}