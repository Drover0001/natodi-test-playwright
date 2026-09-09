import { test, expect } from '../../../src/fixture';
import { reqresData } from '../../../src/testData/reqres.data';

test.describe('Reqres Users API Tests', () => {
  test('user response matches the expected schema', async ({ request }) => {
    const response = await request.get(`${reqresData.baseUrl}/users/${reqresData.existingUserId}`);
    const body = await response.json();

    expect(body.data).toMatchObject({
      id: reqresData.existingUserId,
      email: reqresData.existingUserEmail,
      first_name: reqresData.existingUserFirstName,
      last_name: reqresData.existingUserLastName,
      avatar: reqresData.existingUserAvatar,
    });
  });
});

test.describe('Reqres Users API Tests with Fixtures', () => {
  test('should fetch an existing user via API controller', async ({ app }) => {
    const userResponse = await app.api.users.getUser(reqresData.existingUserId);

    expect(userResponse.data.id).toBe(reqresData.existingUserId);
    expect(userResponse.data.email).toBe(reqresData.existingUserEmail);
  });

  test('user fetched via API controller matches the expected schema', async ({ app }) => {
    const userResponse = await app.api.users.getUser(reqresData.existingUserId);

    expect(userResponse.data).toMatchObject({
      id: reqresData.existingUserId,
      email: reqresData.existingUserEmail,
      first_name: reqresData.existingUserFirstName,
      last_name: reqresData.existingUserLastName,
      avatar: reqresData.existingUserAvatar,
    });
  });
});
