export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  PAUSED = 'paused',
  EXPIRED = 'expired'
}

export interface Subscription {
    _id: string;
    userId: string;
    name: string;
    price: number;
    status: SubscriptionStatus;
    dueDate: Date;
    createdAt?: string;
  }
  
  export interface SubscriptionFormProps {
    onAdd: (subscription: Omit<Subscription, '_id' | 'userId' | 'createdAt'>) => Promise<void>;
    onUpdate: (id: string, updatedData: Partial<Subscription>) => Promise<void>;
    editingSubscription: Subscription | null;
    setEditingSubscription: (subscription: Subscription | null) => void;
    handleCloseModal: () => void;
  }
  
  export interface SubscriptionListProps {
    subscriptions: Subscription[];
    onEdit: (subscription: Subscription) => void;
    onDelete: (id: string) => Promise<void>;
  }
  
  export interface SubscriptionSummaryProps {
    subscriptions: Subscription[];
  }