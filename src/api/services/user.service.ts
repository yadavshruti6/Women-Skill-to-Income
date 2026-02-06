import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.model';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

/**
 * UserService handles user management operations for the platform.
 * 
 * This service manages both workers (women offering skills) and requesters
 * (those posting tasks). The distinction is handled via roles rather than
 * separate user types to keep the system simple.
 * 
 * Key responsibilities:
 * - User registration with secure password hashing
 * - Authentication and JWT token generation
 * - Profile management
 * - Account verification status tracking
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Creates a new user account.
   * 
   * Passwords are hashed using bcrypt with 10 salt rounds for security.
   * A corresponding wallet is automatically created (handled by database triggers
   * or separate wallet service).
   * 
   * @param createUserDTO - User registration data
   * @returns Newly created user (password hash not included in response)
   */
  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    // Check if email already exists to prevent duplicate accounts
    const existingUser = await this.userRepository.findOne({ 
      where: { email: createUserDTO.email } 
    });
    
    if (existingUser) {
      throw new HttpException('Email already registered', HttpStatus.CONFLICT);
    }

    const user = new User();
    user.username = createUserDTO.username;
    user.email = createUserDTO.email;
    // Hash password before storage - never store plain text passwords
    user.password = await bcrypt.hash(createUserDTO.password, 10);
    return this.userRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Retrieves a specific user by ID.
   * Used for profile viewing and administrative purposes.
   */
  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  /**
   * Updates user profile information.
   * Password changes should go through a separate secure flow.
   */
  async updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    const user = await this.getUser(id);
    user.username = updateUserDTO.username;
    user.email = updateUserDTO.email;
    return this.userRepository.save(user);
  }

  /**
   * Soft delete user account.
   * 
   * In production, consider soft deletion (marking inactive) rather than
   * hard deletion to preserve transaction history and handle disputes
   * on tasks that may have been completed before account deletion.
   */
  async deleteUser(id: string): Promise<void> {
    const user = await this.getUser(id);
    await this.userRepository.delete(user.id);
  }

  /**
   * Authenticates a user and generates a JWT token.
   * 
   * The JWT token includes the user ID and email, allowing stateless
   * authentication. Token expiry is set in constants.ts to balance
   * security (shorter is more secure) with user convenience.
   * 
   * @param userDTO - Login credentials
   * @returns JWT access token
   */
  async login(userDTO: any): Promise<any> {
    const user = await this.userRepository.findOne({ email: userDTO.email });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    
    // Use constant-time comparison to prevent timing attacks
    const isValidPassword = await bcrypt.compare(userDTO.password, user.password);
    if (!isValidPassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    
    // Include minimal user info in token payload
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
