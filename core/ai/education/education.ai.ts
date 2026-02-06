import * as tf from '@tensorflow/tfjs';

/**
 * SkillMatchingAI - Machine learning system for matching workers to appropriate tasks.
 * 
 * This module analyzes a worker's stated skills and task history to:
 * 1. Recommend relevant tasks they're likely to succeed at
 * 2. Estimate task completion likelihood
 * 3. Suggest skill development opportunities
 * 
 * Design considerations:
 * - Keeps model simple for fast inference (critical for mobile users on slow networks)
 * - Input features: skill categories, experience level, past task ratings, availability
 * - Output: Task suitability scores across different categories
 * 
 * Future enhancements:
 * - Collaborative filtering ("workers like you also completed...")
 * - Natural language processing for skill descriptions
 * - Adaptive learning from task outcomes
 */
export class SkillMatchingAI {
  private model: tf.Sequential;

  constructor() {
    // Simple neural network for initial prototype
    // 15 input features: skill category flags, experience level, rating, etc.
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({ 
      units: 20, 
      activation: 'relu', 
      inputShape: [15] 
    }));
    this.model.add(tf.layers.dropout({ rate: 0.2 })); // Prevent overfitting
    this.model.add(tf.layers.dense({ 
      units: 10, 
      activation: 'softmax' // Output probabilities for 10 skill categories
    }));
    this.model.compile({ 
      optimizer: tf.optimizers.adam(0.001), 
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });
  }

  /**
   * Trains the model on historical worker-task matching data.
   * 
   * @param data Array of training examples with worker features and task outcomes
   */
  async train(data: SkillMatchingTrainingData[]) {
    const inputs = data.map((d) => d.workerFeatures);
    const labels = data.map((d) => d.taskOutcome);
    
    await this.model.fit(tf.tensor2d(inputs), tf.tensor2d(labels), { 
      epochs: 100,
      batchSize: 32,
      validationSplit: 0.2 // Hold out 20% for validation
    });
  }

  /**
   * Predicts task suitability scores for a worker.
   * 
   * @param workerFeatures Encoded features representing worker's profile
   * @returns Array of scores (0-1) for each task category
   */
  async predict(workerFeatures: number[]): Promise<number[]> {
    const inputTensor = tf.tensor2d([workerFeatures]);
    const output = this.model.predict(inputTensor) as tf.Tensor;
    return Array.from(await output.data());
  }

  /**
   * Generates task recommendations for a specific worker.
   * 
   * @param workerId Database ID of the worker
   * @returns Recommended task categories with confidence scores
   */
  async getTaskRecommendations(workerId: string): Promise<TaskRecommendation[]> {
    const workerFeatures = await this.getWorkerFeatures(workerId);
    const scores = await this.predict(workerFeatures);
    
    // Convert scores to structured recommendations
    const categories = ['domestic', 'crafts', 'tutoring', 'data_entry', 
                       'creative', 'care', 'translation', 'digital', 'other'];
    
    return scores
      .map((score, index) => ({
        category: categories[index] || 'other',
        confidence: score,
      }))
      .filter(rec => rec.confidence > 0.3) // Only show reasonably confident matches
      .sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Extracts feature vector from worker profile.
   * Features encode skills, experience, ratings, and activity patterns.
   */
  private async getWorkerFeatures(workerId: string): Promise<number[]> {
    // TODO: Implement actual database query to fetch worker profile
    // For now, return placeholder data for development
    // In production, this would fetch:
    // - One-hot encoded skill categories
    // - Normalized experience level (tasks completed)
    // - Average rating received
    // - Response time metrics
    // - Availability flags
    return Array(15).fill(0).map(() => Math.random());
  }
}

export interface SkillMatchingTrainingData {
  workerFeatures: number[];    // Encoded worker profile
  taskOutcome: number[];       // One-hot encoded task category that was successful
}

export interface TaskRecommendation {
  category: string;
  confidence: number;  // 0-1 score
}
