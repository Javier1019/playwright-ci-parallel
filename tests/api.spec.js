// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('API Tests', () => {
  test('should fetch API data', async ({ request }) => {
    // Test against a public API
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('body');
  });

  test('should handle API errors gracefully', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/999999');
    
    expect(response.status()).toBe(404);
  });

  test('should validate API response structure', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users');
    
    expect(response.status()).toBe(200);
    
    const users = await response.json();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
    
    // Check first user structure
    const firstUser = users[0];
    expect(firstUser).toHaveProperty('id');
    expect(firstUser).toHaveProperty('name');
    expect(firstUser).toHaveProperty('email');
  });
});
