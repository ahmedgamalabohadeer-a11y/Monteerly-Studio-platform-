import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore';

/**
 * خدمة أساسية للتعامل مع البيانات
 * هذا النمط يفصل المنطق عن واجهة المستخدم (Clean Architecture)
 */
export const DataService = {
  // مثال: جلب البيانات العامة
  async getAll(collectionName: string): Promise<DocumentData[]> {
    try {
      const q = query(collection(db, collectionName));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error(`Error fetching ${collectionName}:`, error);
      return [];
    }
  },
  
  // مثال: جلب بيانات خاصة بمستخدم
  async getUserData(collectionName: string, userId: string) {
    // سيتم تنفيذها عند ربط المصادقة
  }
};
