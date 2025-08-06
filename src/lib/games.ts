"use client";

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
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface Game {
  id?: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  image: string;
  videoUrl: string;
  downloadUrl: string;
  category: string;
  rating: number;
  size: string;
  price: number;
  originalPrice?: number;
  isFree: boolean;
  isFeatured: boolean;
  downloads: number;
  createdAt?: any;
  updatedAt?: any;
}

export interface Purchase {
  id?: string;
  gameId: string;
  gameTitle: string;
  userId: string;
  userEmail: string;
  userName: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  transactionId?: string;
  purchasedAt: any;
}

// إضافة لعبة جديدة
export const addGame = async (game: Omit<Game, 'id' | 'downloads' | 'createdAt' | 'updatedAt'>) => {
  try {
    const gameData = {
      ...game,
      downloads: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'games'), gameData);
    return { id: docRef.id, ...gameData };
  } catch (error) {
    console.error('خطأ في إضافة اللعبة:', error);
    throw error;
  }
};

// الحصول على جميع الألعاب
export const getGames = async (): Promise<Game[]> => {
  try {
    const q = query(collection(db, 'games'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Game[];
  } catch (error) {
    console.error('خطأ في جلب الألعاب:', error);
    throw error;
  }
};

// الحصول على لعبة واحدة
export const getGame = async (id: string): Promise<Game | null> => {
  try {
    const docRef = doc(db, 'games', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Game;
    }
    return null;
  } catch (error) {
    console.error('خطأ في جلب اللعبة:', error);
    throw error;
  }
};

// تحديث لعبة
export const updateGame = async (id: string, updates: Partial<Game>) => {
  try {
    const docRef = doc(db, 'games', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('خطأ في تحديث اللعبة:', error);
    throw error;
  }
};

// حذف لعبة
export const deleteGame = async (id: string) => {
  try {
    const docRef = doc(db, 'games', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('خطأ في حذف اللعبة:', error);
    throw error;
  }
};

// تسجيل عملية شراء
export const createPurchase = async (purchase: Omit<Purchase, 'id' | 'purchasedAt'>) => {
  try {
    const purchaseData = {
      ...purchase,
      purchasedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'purchases'), purchaseData);
    return { id: docRef.id, ...purchaseData };
  } catch (error) {
    console.error('خطأ في إنشاء عملية الشراء:', error);
    throw error;
  }
};

// الحصول على عمليات الشراء للمستخدم
export const getUserPurchases = async (userId: string): Promise<Purchase[]> => {
  try {
    const q = query(
      collection(db, 'purchases'), 
      where('userId', '==', userId),
      orderBy('purchasedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Purchase[];
  } catch (error) {
    console.error('خطأ في جلب عمليات الشراء:', error);
    throw error;
  }
};

// التحقق من امتلاك اللعبة
export const checkGameOwnership = async (userId: string, gameId: string): Promise<boolean> => {
  try {
    const q = query(
      collection(db, 'purchases'), 
      where('userId', '==', userId),
      where('gameId', '==', gameId),
      where('status', '==', 'completed')
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('خطأ في التحقق من امتلاك اللعبة:', error);
    return false;
  }
};

// زيادة عدد التحميلات
export const incrementDownloads = async (gameId: string) => {
  try {
    const game = await getGame(gameId);
    if (game) {
      await updateGame(gameId, { downloads: (game.downloads || 0) + 1 });
    }
  } catch (error) {
    console.error('خطأ في زيادة عدد التحميلات:', error);
  }
}; 