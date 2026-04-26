import { Timestamp } from "firebase/firestore";

// 1. User Schema (The Creator/Client)
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'creator' | 'client' | 'agency' | 'admin';
  createdAt: Timestamp;
  verified: boolean; // KYC Status
  
  // Gamification Stats
  gamification: {
    level: number;
    xp: number;
    currentStreak: number;
    lastLogin: Timestamp;
    badges: string[]; // e.g., ['fast_delivery', 'top_rated']
  };

  // Wallet Summary
  wallet: {
    availableBalance: number; // Can be withdrawn
    escrowBalance: number;    // Locked in projects
    currency: 'EGP' | 'USD';
  };
}

// 2. Project Schema (The Workspace)
export interface Project {
  id: string;
  clientId: string;
  creatorId?: string; // Null if open job
  title: string;
  description: string;
  status: 'draft' | 'hiring' | 'in_progress' | 'review' | 'completed';
  
  // Financials
  budget: number;
  escrowStatus: 'unfunded' | 'funded' | 'released' | 'disputed';
  
  // Timeline
  deadline: Timestamp;
  createdAt: Timestamp;
  
  // Assets
  files: ProjectFile[];
}

export interface ProjectFile {
  id: string;
  name: string;
  url: string; // Private link
  previewUrl?: string; // Watermarked link
  type: 'video' | 'image' | 'doc';
  uploadedBy: string;
}

// 3. Transaction Schema (The Audit Log)
export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'escrow_lock' | 'escrow_release' | 'fee';
  status: 'pending' | 'success' | 'failed';
  provider: 'paymob' | 'paypal' | 'system';
  referenceId?: string; // Paymob Order ID
  timestamp: Timestamp;
}

################################################################################