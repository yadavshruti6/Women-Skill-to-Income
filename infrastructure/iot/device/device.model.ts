import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Hub } from '../../../database/entrepreneurship/hubs/hub.model';

/**
 * Device entity for IoT infrastructure management.
 * 
 * Tracks devices deployed at hubs or provided to workers:
 * - Raspberry Pi terminals for hub workstations
 * - Mobile hotspot devices for connectivity
 * - E-paper badges for worker identification at hubs
 * - Task notification devices
 * 
 * Rationale: Infrastructure tracking is crucial when providing physical
 * equipment to underserved communities. Need to track:
 * - Device location and status
 * - Firmware updates
 * - Maintenance schedules
 * - Device assignment to hubs/workers
 * 
 * This is part of the "last mile" solution for areas with limited
 * infrastructure where standard web access isn't sufficient.
 */
@Entity()
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Human-readable device name
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  // Device category: 'terminal', 'hotspot', 'badge', 'notification'
  @Column()
  deviceType: string;

  // Unique device identifier (MAC address, serial number, etc.)
  @Column({ unique: true })
  deviceId: string;

  // Model information for support and compatibility
  @Column()
  deviceModel: string;

  // Software version tracking for updates
  @Column({ nullable: true })
  firmwareVersion: string;

  @Column({ nullable: true })
  softwareVersion: string;

  @Column({ nullable: true })
  hardwareVersion: string;

  @Column({ unique: true })
  serialNumber: string;

  @Column({ nullable: true })
  macAddress: string;

  // Current IP address (for network troubleshooting)
  @Column({ nullable: true })
  ipAddress: string;

  // Device status for maintenance tracking
  @Column({ 
    type: 'enum', 
    enum: ['active', 'inactive', 'maintenance', 'decommissioned'],
    default: 'active'
  })
  status: string;

  // Which hub this device is deployed at (if applicable)
  @ManyToOne(() => Hub, { nullable: true })
  @JoinColumn()
  hub: Hub;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Last time device checked in (for monitoring connectivity)
  @Column({ type: 'timestamp', nullable: true })
  lastSeenAt: Date;
}
