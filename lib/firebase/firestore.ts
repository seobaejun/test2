import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit,
  DocumentData,
  QueryDocumentSnapshot,
  DocumentSnapshot
} from 'firebase/firestore';
import { db } from './config';

// 컬렉션에서 모든 문서 가져오기
export const getCollection = async (collectionName: string): Promise<DocumentData[]> => {
  if (!db) {
    throw new Error("Firebase가 초기화되지 않았습니다.");
  }
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// 특정 문서 가져오기
export const getDocument = async (collectionName: string, docId: string): Promise<DocumentData | null> => {
  if (!db) {
    throw new Error("Firebase가 초기화되지 않았습니다.");
  }
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    return null;
  }
};

// 새 문서 추가
export const addDocument = async (collectionName: string, data: any): Promise<string> => {
  if (!db) {
    throw new Error("Firebase가 초기화되지 않았습니다.");
  }
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef.id;
};

// 문서 업데이트
export const updateDocument = async (collectionName: string, docId: string, data: any): Promise<void> => {
  if (!db) {
    throw new Error("Firebase가 초기화되지 않았습니다.");
  }
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, data);
};

// 문서 삭제
export const deleteDocument = async (collectionName: string, docId: string): Promise<void> => {
  if (!db) {
    throw new Error("Firebase가 초기화되지 않았습니다.");
  }
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
};

// 조건부 쿼리
export const queryCollection = async (
  collectionName: string, 
  conditions: { field: string; operator: any; value: any }[],
  orderByField?: string,
  orderDirection?: 'asc' | 'desc',
  limitCount?: number
): Promise<DocumentData[]> => {
  if (!db) {
    throw new Error("Firebase가 초기화되지 않았습니다.");
  }
  let q = query(collection(db, collectionName));
  
  // 조건 추가
  conditions.forEach(condition => {
    q = query(q, where(condition.field, condition.operator, condition.value));
  });
  
  // 정렬 추가
  if (orderByField) {
    q = query(q, orderBy(orderByField, orderDirection || 'asc'));
  }
  
  // 제한 추가
  if (limitCount) {
    q = query(q, limit(limitCount));
  }
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
