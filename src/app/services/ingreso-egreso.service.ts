import { Injectable } from '@angular/core';
import { collection, collectionChanges, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { IngresoEgreso } from '../../models/ingreso-egreso-model';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

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

  initIngresoEgresoListener(uuid: string) {
    return collectionChanges(
      collection(this.firestore, uuid, 'user', 'items')
    ).pipe(map((items) => {
      return items.map(_document => {
        const data = _document.doc.data()
        console.log(data)
        return {
          uuid: _document.doc.id,
          ...data
        }
      })
    }))
  }
}
