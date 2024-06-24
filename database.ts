import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
import firestore, { FieldValue } from '@react-native-firebase/firestore';
import { resolver } from './metro.config';



export interface joueur{
  mail:string,
  name:string
}

export interface partie{
  hote:string,
  joueurs:joueur[]
}

export const collectionPartie='partie'


export const createPartie=()=>{
  console.log(auth().currentUser)
  const mailUser=auth().currentUser?.email
  let nameUser=mailUser?.split('@')[0]
  if(nameUser==null || mailUser==null)
    return false;
  const data:partie={
    hote: nameUser,
    joueurs: [{
      name:nameUser,
      mail:mailUser
    }]
  }
  const partieRef=firestore().collection(collectionPartie).doc(nameUser).set(data)
  .then((ok)=>{console.log('reussit:'+ok);return true})
  .catch((error)=>{console.log('erreur:'+error); return false})
  return false;
}

export type NavigateFunction = (url: string) => void;

export const rejoindrePartie=async (id:string)=>{
  const mailUser=auth().currentUser?.email
  let nameUser=mailUser?.split('@')[0]
  if(nameUser==null || mailUser==null)
    return false;
  const data:joueur={
    name:nameUser,
    mail:mailUser
  }
  firestore().collection(collectionPartie).doc(id).update({
    joueurs:FieldValue.arrayUnion(data)})
    .then((ok)=>{console.log("reussite:"+ok); return true    })
    .catch((error)=>{console.log('erreur: '+error); return false})
    return false;
}

export async function  ecouteEventParties():Promise<string[]> {
  const mailUser=auth().currentUser?.email
  return new Promise((resolve,reject)=>{
    firestore().collection(collectionPartie).onSnapshot(
      snapshot=>{ 
        const documentIds: string[] = [];
        snapshot.forEach((doc) => {
          documentIds.push(doc.id);
        });
        console.log(documentIds);
      resolve(documentIds)}
     ,
      error=>{console.log('erreur de lecture de la collection des partie'+error); reject(error)}
    )
  }) 
 
}

export const ecouteEventPartie=(id:string):joueur[]=>{
  firestore().collection(collectionPartie).doc(id).onSnapshot(
    snapshot=>{ console.log('collection  lu avec succes: '+snapshot.data);  return snapshot.data}
   ,
    error=>{console.log('erreur de lecture de la collection des partie'+error); return []}
  )
  return []
}

