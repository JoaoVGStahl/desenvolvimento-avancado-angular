import { FileSizePipe } from "./filesize.pipe";
import {ComponentFixture, TestBed} from '@angular/core/testing';

describe('FileSizePipe', () =>{
    describe('Teste Isolada', () =>{
        const pipe = new FileSizePipe();

        it('Deve converter Bytes para MB', () =>{
            expect(pipe.transform(123456789)).toBe('117.74 MB');
            expect(pipe.transform(341259059.2)).toBe('325.45 MB');
        });

        it('Deve converter Bytes para GB', () =>{
            expect(pipe.transform(2727304232.96)).toBe('2.54 GB');
            expect(pipe.transform(2147483648)).toBe('2.00 GB');
        });
    })
})