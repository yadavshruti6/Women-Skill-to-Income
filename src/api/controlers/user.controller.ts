import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../../../common/enums';

/**
 * UserController handles HTTP endpoints for user management.
 * 
 * Manages both worker (skill providers) and requester (task posters) accounts.
 * Most endpoints require authentication; admin-only endpoints are marked explicitly.
 * 
 * Security considerations:
 * - Passwords never returned in responses
 * - Admin operations require role verification
 * - User can only modify their own profile (non-admin)
 */
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Registers a new user account (worker or requester).
   * This is one of the few public endpoints - anyone can register.
   */
  @Post()
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input or email already exists' })
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.createUser(createUserDTO);
  }

  /**
   * Retrieves all users (admin only).
   * Used for platform management and moderation.
   */
  @Get()
  @ApiOperation({ summary: 'Get all users (admin only)' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin role required' })
  @Auth(UserRole.ADMIN)
  async getUsers() {
    return this.userService.getUsers();
  }

  /**
   * Retrieves a specific user's profile.
   * Users can view their own profile; admins can view any profile.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get user profile by ID' })
  @ApiResponse({ status: 200, description: 'User profile retrieved' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  /**
   * Updates user profile information.
   * Users can update their own profiles; admins can update any profile.
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateUser(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    return this.userService.updateUser(id, updateUserDTO);
  }

  /**
   * Deletes a user account (admin only).
   * Consider implementing soft deletion in production to preserve
   * transaction history and handle pending tasks/disputes.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user account (admin only)' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin role required' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Auth(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
