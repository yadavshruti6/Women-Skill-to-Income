import * as tf from '@tensorflow/tfjs';

/**
 * WorkerGuidanceAI - System for providing contextual help and support to workers.
 * 
 * This module helps first-time digital workers navigate the platform by:
 * 1. Identifying when users might need help (struggling with task submission, etc.)
 * 2. Suggesting next steps based on their progress
 * 3. Recommending skill development paths
 * 
 * Rationale:
 * Many target users are new to digital work. Rather than expecting them to
 * figure everything out, the system proactively offers guidance at key moments.
 * This reduces frustration and abandonment rates.
 */
export class WorkerGuidanceAI {
  private model: tf.Sequential;

  constructor() {
    // Smaller model for quick inference on guidance decisions
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({ 
      units: 10, 
      activation: 'relu', 
      inputShape: [10] 
    }));
    this.model.add(tf.layers.dense({ 
      units: 5,  // Output: action recommendations
      activation: 'softmax' 
    }));
    this.model.compile({ 
      optimizer: tf.optimizers.adam(0.01), 
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });
  }

  /**
   * Trains the guidance model on user interaction patterns.
   * Learns which interventions are helpful at which times.
   */
  async train(data: GuidanceTrainingData[]) {
    const inputs = data.map((d) => d.userContext);
    const labels = data.map((d) => d.helpfulAction);
    
    await this.model.fit(tf.tensor2d(inputs), tf.tensor2d(labels), { 
      epochs: 100,
      batchSize: 16 
    });
  }

  /**
   * Predicts what type of guidance would be most helpful right now.
   * 
   * @param userContext Current user state (page, time on page, actions taken, etc.)
   * @returns Guidance recommendation scores
   */
  async predict(userContext: number[]): Promise<number[]> {
    const inputTensor = tf.tensor2d([userContext]);
    const output = this.model.predict(inputTensor) as tf.Tensor;
    return Array.from(await output.data());
  }

  /**
   * Gets contextual guidance for a worker based on their current activity.
   * 
   * @param workerId Worker's database ID
   * @param currentPage What page/feature they're using
   * @returns Guidance message or null if no intervention needed
   */
  async getGuidance(workerId: string, currentPage: string): Promise<GuidanceRecommendation | null> {
    const userContext = await this.getUserContext(workerId, currentPage);
    const scores = await this.predict(userContext);
    
    const guidanceTypes = [
      { type: 'tutorial', message: 'Would you like a quick walkthrough of this feature?' },
      { type: 'example', message: 'Here\'s an example of a successfully completed task.' },
      { type: 'skill', message: 'Consider adding skills to your profile to see more tasks.' },
      { type: 'support', message: 'Need help? Our support team can assist you.' },
      { type: 'none', message: null }
    ];
    
    // Find highest confidence guidance (excluding 'none')
    let maxScore = 0;
    let bestGuidance = null;
    
    for (let i = 0; i < scores.length - 1; i++) {
      if (scores[i] > maxScore && scores[i] > 0.5) { // Only show if confident
        maxScore = scores[i];
        bestGuidance = guidanceTypes[i];
      }
    }
    
    return bestGuidance;
  }

  /**
   * Extracts context features about user's current state.
   * Used to determine if/when to offer help.
   */
  private async getUserContext(workerId: string, currentPage: string): Promise<number[]> {
    // TODO: Implement actual context extraction
    // Features might include:
    // - Time on current page
    // - Number of actions attempted
    // - Whether profile is complete
    // - Number of tasks completed
    // - Time since last activity
    // - Page complexity indicators
    return Array(10).fill(0).map(() => Math.random());
  }
}

export interface GuidanceTrainingData {
  userContext: number[];      // Encoded user state
  helpfulAction: number[];    // One-hot encoded action that helped
}

export interface GuidanceRecommendation {
  type: string;
  message: string | null;
}
