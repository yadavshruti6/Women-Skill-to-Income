import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

/**
 * Marketplace entity for skill-based products and services.
 * 
 * Distinct from the task system, this allows workers to:
 * - List reusable services ("I offer tutoring at $X/hour")
 * - Sell physical products they create (crafts, baked goods, etc.)
 * - Build a portfolio of offerings
 * 
 * Rationale: Some workers prefer productizing their skills rather than
 * taking one-off tasks. This gives them that flexibility.
 * 
 * Think Etsy-style marketplace but focused on skills, not just crafts.
 * 
 * Status: Extended feature, basic structure in place.
 */
@Entity()
export class Marketplace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Marketplace name/title
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  // Category: services, products, or both
  @Column({ type: 'enum', enum: ['services', 'products', 'both'], default: 'both' })
  type: string;

  // Whether this marketplace is publicly visible
  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // TODO: Add relationships to products/services and orders
  // @OneToMany(() => Product, (product) => product.marketplace)
  // products: Product[];
  // 
  // @OneToMany(() => Order, (order) => order.marketplace)
  // orders: Order[];
}
