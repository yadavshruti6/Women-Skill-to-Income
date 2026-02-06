/**
 * Main application entry point for the Women-Skill-to-Income platform.
 * 
 * This platform connects women with practical skills to microjob opportunities,
 * focusing on accessibility and trust through blockchain-based payments.
 * 
 * Built with NestJS for scalable backend architecture and Swagger for API documentation.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configure Swagger API documentation
  // Accessible at /api endpoint for developer reference
  const config = new DocumentBuilder()
    .setTitle('Women-Skill-to-Income API')
    .setDescription(
      'RESTful API for connecting women workers with skill-based microjobs. ' +
      'Handles user management, task posting/matching, escrow payments via Pi Network, ' +
      'and dispute resolution.'
    )
    .setVersion('1.0')
    .addBearerAuth()  // JWT authentication
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // Enable CORS for frontend access
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
  });
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`Women-Skill-to-Income API running on port ${port}`);
  console.log(`API documentation available at http://localhost:${port}/api`);
}

bootstrap();
