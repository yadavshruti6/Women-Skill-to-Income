import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.model';
import { PiCoinAddress } from './pi-coin-address.model';

/**
 * Wallet entity for managing user funds on the platform.
 * 
 * Integrates with Pi Network for low-cost blockchain transactions.
 * This is crucial for microjobs where traditional payment processors
 * would charge fees higher than the task value itself.
 * 
 * The wallet serves two purposes:
 * 1. For workers: Accumulate earnings from completed tasks
 * 2. For requesters: Hold funds in escrow until task completion
 */
@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Human-readable label (e.g., "My Task Wallet")
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  // Current balance in Pi coins
  // Uses decimal for precision in financial calculations
  @Column({ type: 'decimal', precision: 18, scale: 8, default: 0 })
  balance: number;

  // Funds currently locked in escrow for ongoing tasks
  // Prevents double-spending while tasks are in progress
  @Column({ type: 'decimal', precision: 18, scale: 8, default: 0 })
  escrowBalance: number;

  // Allows freezing wallet in case of suspicious activity
  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.wallet)
  @JoinColumn()
  user: User;

  // Pi Network blockchain address for external transactions
  @OneToOne(() => PiCoinAddress, (piCoinAddress) => piCoinAddress.wallet)
  @JoinColumn()
  piCoinAddress: PiCoinAddress;
}
