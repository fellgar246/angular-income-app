import { Injectable } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { IngresoEgreso } from '../../models/ingreso-egreso-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor( private firestore: Firestore,
                private authService: AuthService) { }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ){
    const uid = this.authService.user?.uid

    const collectionIngresoEgreso = collection(this.firestore, `${uid}/ingreso-egreso/items`);
    const documentRef = doc(collectionIngresoEgreso);
    return setDoc(documentRef, { ...ingresoEgreso })
  }
}
