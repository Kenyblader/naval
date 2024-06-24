import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
import firestore, { FieldValue } from '@react-native-firebase/firestore';
import { resolver } from './metro.config';
import { Position } from './src/game';
import { Screen } from 'react-native-screens';



export interface joueur{
  mail:string,
  name:string
}

export interface partie{
  statut:Boolean
  hote:string,
  joueurs:joueur[]
}

export const collectionPartie='partie'
export const collectionPosition='a:position'


export const createPartie=()=>{
  console.log(auth().currentUser)
  const mailUser=auth().currentUser?.email
  let nameUser=mailUser?.split('@')[0]
  if(nameUser==null || mailUser==null)
    return false;
  const data:partie={
    statut  :false,
    hote: nameUser,
    joueurs: [{
      name:nameUser,
      mail:mailUser
    }]
  }
  const partieRef=firestore().collection(collectionPartie).doc(nameUser).set(data)
  .then((ok)=>{console.log('reussit:'+ok);return nameUser})
  .catch((error)=>{console.log('erreur:'+error); return null})
  return null;
}


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


export const subscribeToFirestoreUpdates = ( onUpdate: (data: any) => void) => {
  const mailUser=auth().currentUser?.email
  let nameUser=mailUser?.split('@')[0]
  let docId=nameUser;
  if(!docId)
    console.log('docid null')
  const unsubscribe = firestore()
    .collection(collectionPartie)
    .doc(docId)
    .onSnapshot(
      documentSnapshot => {
        if (documentSnapshot.exists) {
          const data = documentSnapshot.data();
          onUpdate(data || null);
        } else {
          console.error('Document does not exist'+docId);
          onUpdate([]);
        }
      },
      error => {
        console.error('Error fetching document: ', error);
        onUpdate(null);
      }
    );

  return unsubscribe;
};

export const subscribeToPositions=(onUpdate: (data: any) => void)=>{
  const mailUser=auth().currentUser?.email
  let nameUser=mailUser?.split('@')[0]
  let docId=nameUser;
  if(!docId)
    console.log('docid null')
  const unsubscribe = firestore()
  .collection(collectionPosition)
  .doc(docId)
  .onSnapshot(
    documentSnapshot => {
      if (documentSnapshot.exists) {
        const data = documentSnapshot.data();
        onUpdate(data || null);
        console.log(data)
      } else {
        console.error('Document does not exist'+docId);
        onUpdate(null);
      }
    },
    error => {
      console.error('Error fetching document: ', error);
      onUpdate(null);
    }
  );
    return unsubscribe;

}


export const ecouteEventPartie=async():Promise<any>=>{
  const mailUser=auth().currentUser?.email
  if(!mailUser)
      return []
  return new Promise((resolve,reject)=>{
    let id:string=mailUser?.split('@')[0]
  firestore().collection(collectionPartie).doc(id).onSnapshot(
    snapshot=>{ console.log('collection  lu avec succes: '+snapshot.data());  resolve(snapshot.data())}
   ,
    error=>{console.log('erreur de lecture de la collection des partie'+error); reject("erreur")}
  )
  })
}

export const lancerPartie =(id:string)=>{
  firestore().collection(collectionPosition).doc(id).update({ statut:true })
  .then(()=>{
    return true;
  })
  .catch((error)=>{
    console.log('erreur' +error)
    return false;
  })
}

export const initAUser=(k:number,y:number)=>{
  const mailUser=auth().currentUser?.email;
  let nameUser=mailUser?.split('@')[0];
  firestore().collection(collectionPosition).doc(nameUser).set({positions:[], score:0,position:{x:0,y:0},constainScreen:{screenX:k,screenY:y}
  })
}

export const lancerAttaque=(p:Position, receiver:string)=>{
  firestore().collection(collectionPosition).doc(receiver).update({positions:FieldValue.arrayUnion(p), position:p})
  .catch((error)=>{console.error(error)})
}

export const setScrore=(n:number)=>{
  const mailUser=auth().currentUser?.email;
  let nameUser=mailUser?.split('@')[0];
  firestore().collection(collectionPosition).doc(nameUser).update({score:n})
}

export const getAdverseConstaintScreen=(receiver:string)=>{
  firestore().collection(collectionPosition).doc(receiver).get().then((data)=>{ return data.data()?.constainScreen})
  return {};
}






