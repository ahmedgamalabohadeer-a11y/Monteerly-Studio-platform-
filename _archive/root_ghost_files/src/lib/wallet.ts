import { db } from "./firebase";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";

/**
 * دالة لتجميد مبلغ المشروع في الضمان (Escrow)
 * تعمل فقط إذا كان رصيد العميل "المتاح" كافياً
 */
export async function lockFundsInEscrow(userId: string, projectId: string, amount: number) {
  const userRef = doc(db, "users", userId);
  const projectRef = doc(db, "projects", projectId);

  try {
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) throw new Error("User not found");

      const userData = userDoc.data();
      const currentBalance = userData.wallet.availableBalance || 0;

      if (currentBalance < amount) {
        throw new Error("Insufficient funds");
      }

      // 1. Deduct from Available, Add to Escrow
      transaction.update(userRef, {
        "wallet.availableBalance": currentBalance - amount,
        "wallet.escrowBalance": (userData.wallet.escrowBalance || 0) + amount
      });

      // 2. Update Project Status
      transaction.update(projectRef, {
        escrowStatus: "funded",
        status: "in_progress"
      });
      
      // 3. Create Audit Log (Transaction) implementation would go here
    });
    console.log("Funds locked successfully");
    return { success: true };
  } catch (error) {
    console.error("Escrow lock failed", error);
    return { success: false, error };
  }
}

################################################################################