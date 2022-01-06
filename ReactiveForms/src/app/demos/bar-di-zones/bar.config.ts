import { InjectionToken } from "@angular/core";

export interface BarUnidadeconfig{
    unidadeId: number,
    unidadeToken: string
}

export const BAR_UNIDADE_CONFIG = new InjectionToken<BarUnidadeconfig>('BAR_UNIDADE_CONFIG');

