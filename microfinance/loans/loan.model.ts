import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../database/models/user.model';

/**
 * Loan entity for microfinance support.
 * 
 * Future feature: Provides small loans to workers for:
 * - Equipment purchases (sewing machine, laptop, etc.)
 * - Internet connectivity costs
 * - Skill development courses
 * 
 * Rationale: Many women have skills but lack capital for basic equipment.
 * Microlending tied to future earnings can break this barrier.
 * 
 * Status: Planned feature, model structure in place for future implementation.
 */
@Entity()
export class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Loan amount in local currency or Pi coins
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  // Annual interest rate (kept low for target demographic)
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  interestRate: number;

  // Repayment period in months
  @Column()
  repaymentTerm: number;

  @Column({ type: 'enum', enum: ['pending', 'approved', 'active', 'repaid', 'defaulted'] })
  status: string;

  // Link to the borrower (worker)
  @ManyToOne(() => User)
  @JoinColumn()
  borrower: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  approvedAt: Date;
}
