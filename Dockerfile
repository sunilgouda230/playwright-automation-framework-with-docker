# 1. Use official Playwright base image (includes browsers + deps)
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy only package files first (for layer caching)
COPY package.json package-lock.json ./

# 4. Install dependencies
RUN npm ci

# 5. Copy rest of the code
COPY . .

# 6. Default command to run tests
CMD ["npx", "playwright", "test"]