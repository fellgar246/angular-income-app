import { ActionReducerMap } from "@ngrx/store";
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as IngresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
  ui: ui.State;
  user: auth.State;
  ingresoEgreso: IngresoEgreso.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  ingresoEgreso: IngresoEgreso.ingresoEgresoReducer
}
