import { FileSizePipe } from "./filesize.pipe";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

describe('FileSizePipe', () => {

    describe('Teste Isolado', () => {

        const pipe = new FileSizePipe();

        it('Deve converter bytes para MB', () => {
            expect(pipe.transform(123456789)).toBe('117.74 MB');
            expect(pipe.transform(987654321)).toBe('941.90 MB');
        });

        it('Deve converter bytes para GB', () => {
            expect(pipe.transform(1342177280)).toBe('1.25 GB');
        });

    });

    describe('Teste comportamental Pipe', () => {
        @Component({
            template:`
                Size: {{ size | filesize}} 
            `
        })
        class TesteComponent {
            size = 123456789;
        }

        let component:  TesteComponent;
        let fixture: ComponentFixture<TesteComponent>;
        let el : HTMLElement;

        beforeEach(()=> {
            TestBed.configureTestingModule({
                declarations: [
                    FileSizePipe,
                    TesteComponent
                ]
            });

            fixture = TestBed.createComponent(TesteComponent);
            component = fixture.componentInstance;
            el = fixture.nativeElement;
        });

        it('Deve converter bytes para MB', () => {
            fixture.detectChanges();
            expect(el.textContent).toContain('Size: 117.74 MB');
            component.size = 1029281;
            fixture.detectChanges();
            expect(el.textContent).toContain('Size: 0.98 MB');
        });

        it('Deve converter bytes para GB', () => {
            component.size = 1342177280;
            fixture.detectChanges();
            expect(el.textContent).toContain('Size: 1.25 GB');
        });
    })

});