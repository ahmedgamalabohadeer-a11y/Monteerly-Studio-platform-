// --- تعريفات الحزمة الأولى: المشاريع والمستخدمين ---

export interface Project {
  id: string;
  title: string;
  description: string;
  clientName?: string;
  budget: number;
  currency: 'EGP' | 'SAR' | 'USD';
  status: 'open' | 'in_progress' | 'completed' | 'review';
  tags: string[];
  createdAt: Date;
  deadline?: Date;
}

export interface CreatorProfile {
  uid: string;
  displayName: string;
  role: 'freelancer' | 'agency';
  level: number;
  badges: string[];
  skills: string[];
  rating: number;
  hourlyRate?: number;
}

export interface PageProps {
  params: { locale: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// --- تعريفات الحزمة الثالثة: الأكاديمية والتلعيب ---

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isLocked: boolean;
}

export interface CourseModule {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  studentsCount: number;
  rating: number;
  xpReward: number; // تطبيق نظام التلعيب
  tags: string[];
  price: number | 'Free';
  modules?: CourseModule[];
}

// --- تعريفات الحزمة الخامسة: المحادثة والمجتمع ---

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isSystem?: boolean; // رسائل النظام (مثل تحذيرات الحارس)
  isBlocked?: boolean; // رسائل محظورة
}

export interface Conversation {
  id: string;
  participantName: string;
  participantRole: 'Client' | 'Creator';
  lastMessage: string;
  unreadCount: number;
  onlineStatus: 'online' | 'offline' | 'busy';
  avatarColor: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorBadge: string; // شارات التلعيب
  content: string;
  likes: number;
  comments: number;
  tags: string[];
  timeAgo: string;
}
