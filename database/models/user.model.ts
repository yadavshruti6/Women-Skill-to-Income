import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Wallet } from './wallet.model';

/**
 * User entity representing both workers and requesters on the platform.
 * 
 * Workers are women offering skills for microjobs.
 * Requesters are individuals or businesses posting tasks.
 * 
 * Design decision: Keep user model simple to reduce onboarding friction.
 * More detailed profiles (skills, preferences) are stored in related tables.
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  // Hashed using bcrypt before storage
  @Column()
  password: string;

  // Allows temporary account suspension without deletion
  @Column({ default: true })
  isActive: boolean;

  // Basic identity verification status
  // Important for trust and safety, especially for payment handling
  @Column({ default: false })
  isVerified: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Each user has exactly one wallet for receiving/sending payments
  @OneToOne(() => Wallet, (wallet) => wallet.user)
  @JoinColumn()
  wallet: Wallet;
}
