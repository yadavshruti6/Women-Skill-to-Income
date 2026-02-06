/**
 * User roles within the Women-Skill-to-Income platform.
 * Workers complete tasks, Requesters post tasks, Admins handle disputes.
 */
export enum UserRole {
  ADMIN = 'admin',
  WORKER = 'worker',      // Women offering skills
  REQUESTER = 'requester', // Those posting tasks
}

/**
 * Account and profile status.
 */
export enum AccountStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',  // Due to policy violations
  PENDING_VERIFICATION = 'pending_verification',
}

/**
 * Task lifecycle states.
 * Tracks a task from posting through completion and payment.
 */
export enum TaskStatus {
  POSTED = 'posted',         // Available for workers to accept
  ACCEPTED = 'accepted',     // Worker has claimed the task
  IN_PROGRESS = 'in_progress',
  SUBMITTED = 'submitted',   // Worker submitted deliverables
  UNDER_REVIEW = 'under_review',
  COMPLETED = 'completed',   // Requester approved, payment released
  DISPUTED = 'disputed',     // Either party filed a dispute
  CANCELLED = 'cancelled',
}

/**
 * Types of blockchain transactions in the platform.
 */
export enum TransactionType {
  TASK_PAYMENT = 'task_payment',     // Payment for completed task
  ESCROW_DEPOSIT = 'escrow_deposit', // Requester funds held in escrow
  ESCROW_RELEASE = 'escrow_release', // Funds released to worker
  ESCROW_REFUND = 'escrow_refund',   // Funds returned to requester
  WITHDRAWAL = 'withdrawal',          // Worker withdraws to external wallet
  PLATFORM_FEE = 'platform_fee',     // Small fee for platform operation
}

/**
 * Skill categories for matching workers to tasks.
 * Keeps classification simple and relatable for target users.
 */
export enum SkillCategory {
  DOMESTIC = 'domestic',           // Cooking, cleaning consulting, home organization
  CRAFTS = 'crafts',               // Sewing, knitting, handicrafts
  TUTORING = 'tutoring',           // Teaching children, language lessons
  DATA_ENTRY = 'data_entry',       // Basic computer work, typing
  CREATIVE = 'creative',           // Design, content writing, art
  CARE = 'care',                   // Childcare advice, elderly care
  TRANSLATION = 'translation',     // Language translation services
  DIGITAL = 'digital',             // Social media, basic tech support
  OTHER = 'other',
}

/**
 * Dispute resolution outcomes.
 */
export enum DisputeResolution {
  PENDING = 'pending',
  RESOLVED_WORKER_FAVOR = 'resolved_worker_favor',
  RESOLVED_REQUESTER_FAVOR = 'resolved_requester_favor',
  RESOLVED_COMPROMISE = 'resolved_compromise',
  ESCALATED = 'escalated',
}
