import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  UserCredential
} from 'firebase/auth';
import { auth } from './config';

// 이메일로 로그인
export const signInWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  if (!auth) {
    throw new Error("Firebase가 초기화되지 않았습니다.");
  }
  return await signInWithEmailAndPassword(auth, email, password);
};

// 이메일로 회원가입
export const signUpWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  if (!auth) {
    throw new Error("Firebase가 초기화되지 않았습니다.");
  }
  return await createUserWithEmailAndPassword(auth, email, password);
};

// 로그아웃
export const logout = async (): Promise<void> => {
  if (!auth) {
    throw new Error("Firebase가 초기화되지 않았습니다.");
  }
  return await signOut(auth);
};

// 인증 상태 변경 감지
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  if (!auth) {
    console.warn("Firebase가 초기화되지 않았습니다.");
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};

// 현재 사용자 가져오기
export const getCurrentUser = (): User | null => {
  if (!auth) {
    return null;
  }
  return auth.currentUser;
};
