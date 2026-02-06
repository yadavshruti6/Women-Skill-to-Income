[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![Pi Network](https://img.shields.io/badge/Pi%20Network-Integrated-purple.svg)](https://minepi.com/)

# Women-Skill-to-Income Platform

## What This Platform Does

This platform connects women who have skills but limited formal work experience—like homemakers, rural women, or those returning after career breaks—with small, task-based work opportunities. Instead of requiring them to compete on traditional freelancing platforms where established professionals dominate, this system matches their existing skills (cooking, crafts, tutoring, basic data entry) to microjobs they can realistically complete.

The platform handles three main things:
1. Helps women create a simple skill profile
2. Matches them to appropriate tasks posted by requesters
3. Ensures payments are secure and transparent using blockchain-based transactions

## Problem Statement

Many women who possess practical skills struggle to convert those skills into income. The barriers aren't about capability—they're about access and trust. Rural women may not have bank accounts. Homemakers may lack confidence navigating complex platforms. Women returning to work after years away may not know where to start.

Existing freelancing platforms assume users already understand how to market themselves, negotiate rates, and manage client relationships. For first-time digital workers, especially those in underserved communities, these platforms can feel inaccessible. Additionally, concerns about payment reliability and personal safety when interacting with strangers online prevent many women from even trying.

This platform aims to lower those barriers by focusing on:
- **Simplicity**: Minimal technical knowledge required
- **Trust**: Verified transactions and escrow-based payments
- **Flexibility**: Small tasks that fit around existing responsibilities
- **Inclusivity**: Designed for users with limited prior digital work experience

## How It Works

**Step 1: Registration and Skill Mapping**  
A woman signs up and describes what she can do—cooking, stitching, tutoring children, entering data, translating, etc. The system doesn't require a resume or portfolio. It asks simple questions about her skills and availability.

**Step 2: Task Matching**  
Requesters (individuals or small businesses) post specific tasks with clear requirements: "Need someone to label 500 images" or "Looking for weekly tutoring sessions for a 5th grader." The system suggests relevant tasks based on the woman's stated skills.

**Step 3: Task Acceptance and Execution**  
If a task looks manageable, the woman accepts it. She completes the work according to the agreed timeline and uploads deliverables through the platform.

**Step 4: Payment**  
Payment is held in escrow using blockchain (Pi Network integration for low-cost transactions). Once the requester confirms the work is satisfactory, funds are released to the woman's wallet. If disputes arise, a simple resolution process helps mediate.

**Step 5: Reputation Building**  
Completed tasks build a track record. Over time, this helps women access better opportunities and gain confidence in their ability to earn independently.

## Trust and Safety Considerations

For many users, this might be their first experience earning money through digital work. Trust is not optional—it's foundational.

The platform includes:
- **Escrow payments**: Requesters cannot withhold funds arbitrarily. Workers know they'll be paid for verified work.
- **Verified identities**: Basic identity checks reduce fraud on both sides.
- **Dispute resolution**: A straightforward process for handling disagreements without requiring legal intervention.
- **Community guidelines**: Clear rules about appropriate behavior and task types.

Safety also means protecting user data. The platform minimizes what personal information is shared publicly and uses blockchain to maintain transaction transparency without exposing sensitive details.

## How This Differs from Standard Freelancing Platforms

| Aspect | Traditional Platforms (Upwork, Fiverr) | This Platform |
|--------|--------------------------------------|---------------|
| Target audience | Established professionals competing globally | First-time workers with basic skills |
| Complexity | Requires portfolio, competitive bidding | Simple skill listing, direct task matching |
| Task size | Often larger projects requiring experience | Small, well-defined microtasks |
| Trust model | Ratings-heavy, competitive | Escrow-based, supportive |
| Onboarding | Assumes digital literacy | Designed for low-tech-confidence users |

This isn't to say traditional platforms are bad—they serve their audience well. But they're not built for someone who's never freelanced before and doesn't have the time or resources to build a competitive profile. This platform fills that gap.

## Interview Explanation

*If you were explaining this project in an interview:*

"I built a platform that helps women with practical skills—like homemakers or rural workers—find small paid tasks online. The idea came from observing that while many women have abilities that could generate income, they often don't know how to access digital work opportunities or feel intimidated by existing freelancing sites.

The system works by allowing women to register with a simple skill profile. Requesters post specific microtasks, and the platform matches tasks to appropriate workers. Payments are handled using blockchain-based escrow to ensure transparency and trust, which is particularly important for first-time digital workers who may be skeptical about getting paid.

The technical stack includes TypeScript for the backend, a blockchain integration using Pi Network for low-cost transactions, and a smart contract for handling task agreements and payments. I also built in basic dispute resolution and reputation tracking.

The goal wasn't to compete with Upwork or Fiverr—those platforms serve experienced freelancers. This focuses on accessibility and inclusion for people who've been left out of the gig economy. It's about making the entry point much lower and the trust factors much stronger."

## Technical Components

- **Backend**: Node.js with TypeScript
- **Database**: PostgreSQL with structured models for users, wallets, tasks, and transactions
- **Blockchain**: Ethereum-based smart contracts, Pi Network integration for payments
- **Testing**: Comprehensive test coverage for controllers, services, and smart contracts
- **Infrastructure**: Prepared for IoT device integration (e.g., rural connectivity solutions)

## Current Features

- User registration and skill profiling
- Wallet management with Pi Network integration
- Smart contract for task agreements and escrow
- Basic task matching system
- Payment processing using blockchain
- Test coverage for core services
- RESTful API for client interaction

## Future Enhancements

- AI-powered skill assessment and task recommendations
- Mobile app for easier access in low-connectivity areas
- Integration with local entrepreneurship hubs
- Expanded payment options (mobile money, local currencies)
- Mentorship and skill development modules
- Community forums for peer support

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/KOSASIH/economic-queens-tech.git
   cd economic-queens-tech
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (create a `.env` file):
   ```
   DATABASE_URL=your_postgres_connection_string
   PI_NETWORK_API_KEY=your_pi_network_key
   PORT=3000
   ```

4. Run migrations:
   ```bash
   npm run migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Run tests:
   ```bash
   npm test
   ```

## Contributing

Contributions are welcome, especially in these areas:
- Improving accessibility for low-literacy users
- Enhancing security and trust mechanisms
- Building mobile-first interfaces
- Localization and language support
- Documentation and user guides

Please open an issue first to discuss proposed changes before submitting a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Project Context

This was developed as part of exploring how blockchain and decentralized systems can address real-world social challenges. The focus is on practical implementation rather than theoretical concepts—building something that could actually be used by the intended audience.

---

*Note: This is a prototype/educational project. Production deployment would require additional security audits, user testing with the target demographic, and partnerships with local organizations that work with women in underserved communities.*
