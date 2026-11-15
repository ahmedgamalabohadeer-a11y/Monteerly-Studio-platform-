function assertContractInput(projectId: string, clientId: string, freelancerId: string, amount: number) {
  if (!projectId.trim() || !clientId.trim() || !freelancerId.trim()) {
    throw new Error('Contract participants and project are required.');
  }
  if (clientId === freelancerId) {
    throw new Error('Client and freelancer must be different accounts.');
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('Contract amount must be a positive number.');
  }
}

export async function activateSovereignAgreement(jobId: string, clientId: string, freelancerId: string, budget: number) {
  assertContractInput(jobId, clientId, freelancerId, budget);
  console.log(`✅ [Sovereign Engine]: تم تفعيل العقد الذكي للمشروع ${jobId}`);
  return true;
}

export async function generateContract(orderId: string, clientId: string, freelancerId: string, price: number) {
  assertContractInput(orderId, clientId, freelancerId, price);
  console.log(`📜 [Contract Engine]: توليد العقد الذكي للمشروع ${orderId}`);
  return true;
}
