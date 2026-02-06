import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../../models/user.model';

/**
 * Hub entity representing physical community centers.
 * 
 * Hubs provide:
 * - Internet access for workers in areas with poor connectivity
 * - Shared workspaces
 * - In-person training and skill development
 * - Community building and peer support
 * 
 * Rationale: Digital platforms alone aren't enough. Physical hubs help
 * bridge the digital divide and provide social support for isolated workers.
 * 
 * Each hub can have multiple workers associated with it.
 */
@Entity()
export class Hub {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  // Physical location - city or region
  @Column()
  location: string;

  // Detailed address for workers to visit
  @Column({ type: 'text', nullable: true })
  address: string;

  // Contact information for hub coordinators
  @Column({ nullable: true })
  contactEmail: string;

  @Column({ nullable: true })
  contactPhone: string;

  // Operating hours (stored as JSON or simple string)
  @Column({ type: 'text', nullable: true })
  operatingHours: string;

  // Workers registered at this hub
  @OneToMany(() => User, (user) => user.hub)
  workers: User[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
