import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'filesize'
})
export class FileSizePipe implements PipeTransform {
    
    transform(size: number) {
        
        let tamanhoCalculado = (size / (1024 * 1024))
        let extension = ' MB'

        if (tamanhoCalculado > 1024) {
            tamanhoCalculado = (tamanhoCalculado / 1024);
            extension = ' GB'
        }

        return tamanhoCalculado.toFixed(2) + extension;
    }

}