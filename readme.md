# Resource Management

## Technologies Used

-   Node.js
-   Express.js
-   MongoDB
-   React
-   JavaScript (ES6+)
-   CSS/HTML

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone <repo-url>
    cd resource_management
    ```
2. Install dependencies for backend and frontend:
    ```bash
    cd server
    npm install
    cd ../client
    npm install
    ```
3. Configure environment variables as per `.env.example`.
4. Start backend and frontend servers:
    ```bash
    cd server
    npm run dev
    # In a new terminal
    cd ../client
    npm run dev
    ```

## AI Tools Used

-   **GitHub Copilot**: Assisted in code generation, boilerplate setup, and suggesting best practices.
-   **ChatGPT**: Used for debugging, code explanations, and architectural suggestions.

### How AI Accelerated Development

-   **Rapid Prototyping**: Generated CRUD endpoints and React components quickly.
-   **Code Refactoring**: Suggested improvements for code readability and performance.
-   **Documentation**: Helped draft initial README and inline code comments.

### Challenges with AI-Generated Code

-   **Context Awareness**: Sometimes AI-generated code lacked project-specific context, leading to integration issues.
-   **Security Concerns**: Some suggestions did not follow best security practices (e.g., input validation).
-   **Resolution**: Manually reviewed and tested all AI-generated code, cross-referenced with official documentation, and added custom validation.

### Approach to Validating AI Suggestions

-   **Manual Review**: Carefully reviewed all AI-generated code before merging.
-   **Testing**: Wrote unit and integration tests to ensure correctness.
-   **Documentation Check**: Verified suggestions against official docs and community best practices.

## Features

-   User authentication and authorization
-   Resource CRUD operations (create, read, update, delete)
-   Role-based access control
-   Dashboard with resource analytics
-   Responsive UI with React
-   RESTful API with Express.js
-   MongoDB integration for persistent storage
-   Error handling and input validation
-   Activity logging and audit trail
