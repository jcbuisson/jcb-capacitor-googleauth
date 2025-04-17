
// JCB: BASED ON https://github.com/CodetrixStudio/CapacitorGoogleAuth

// Work only for the web

## Install

#### 1. Install package

```sh
npm i jcb-capacitor-googleauth
```

#### 2. Update capacitor deps

```sh
npx cap update
```

## Usage

Register plugin and manually initialize

```ts
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

// use hook after platform dom ready
GoogleAuth.initialize({
  clientId: 'CLIENT_ID.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  grantOfflineAccess: true,
});
```

#### Options

- `clientId` - The app's client ID, found and created in the Google Developers Console.
- `scopes` – same as [Configure](#Configure) scopes
- `grantOfflineAccess` – boolean, default `false`, Set if your application needs to refresh access tokens when the user is not present at the browser.

Use it

```ts
GoogleAuth.signIn();
```

#### Vue 3

```vue
<script setup lang="ts">
import { defineComponent, onMounted } from 'vue';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

onMounted(() => {
  GoogleAuth.initialize();
});

async function logIn() {
  const response = await GoogleAuth.signIn();
  console.log(response);
}
</script>
```

**Refresh method**

This method should be called when the app is initialized to establish if the user is currently logged in. If true, the method will return an accessToken, idToken and an empty refreshToken.
```ts
checkLoggedIn() {
    GoogleAuth.refresh()
        .then((data) => {
            if (data.accessToken) {
                this.currentTokens = data;
            }
        })
        .catch((error) => {
            if (error.type === 'userLoggedOut') {
                this.signin()
            }
        });
}
```

## Configure

| Name                     | Type     | Description                                                                                                                   |
| ------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| clientId                 | string   | The app's client ID, found and created in the Google Developers Console.                                                      |
| iosClientId              | string   | Specific client ID key for iOS                                                                                                |
| androidClientId          | string   | Specific client ID key for Android                                                                                            |
| scopes                   | string[] | Scopes that you might need to request to access Google APIs<br>https://developers.google.com/identity/protocols/oauth2/scopes |
| serverClientId           | string   | This ClientId used for offline access and server side handling                                                                |
| forceCodeForRefreshToken | boolean  | Force user to select email address to regenerate AuthCode <br>used to get a valid refreshtoken (work on iOS and Android)      |

Provide configuration in root `capacitor.config.json`

```json
{
  "plugins": {
    "GoogleAuth": {
      "scopes": ["profile", "email"],
      "serverClientId": "xxxxxx-xxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
      "forceCodeForRefreshToken": true
    }
  }
}
```

or in `capacitor.config.ts`

```ts
/// <reference types="'@codetrix-studio/capacitor-google-auth'" />

const config: CapacitorConfig = {
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: 'xxxxxx-xxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
```

## API

<docgen-index>

* [`initialize(...)`](#initialize)
* [`signIn()`](#signin)
* [`refresh()`](#refresh)
* [`signOut()`](#signout)
* [Interfaces](#interfaces)

</docgen-index>
<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### initialize(...)

```typescript
initialize(options?: InitOptions) => void
```

Initializes the GoogleAuthPlugin, loading the gapi library and setting up the plugin.

| Param         | Type                                                | Description                        |
| ------------- | --------------------------------------------------- | ---------------------------------- |
| **`options`** | <code><a href="#initoptions">InitOptions</a></code> | - Optional initialization options. |

--------------------


### signIn()

```typescript
signIn() => Promise<User>
```

Initiates the sign-in process and returns a Promise that resolves with the user information.

**Returns:** <code>Promise&lt;<a href="#user">User</a>&gt;</code>

--------------------


### refresh()

```typescript
refresh() => Promise<Authentication>
```

Refreshes the authentication token and returns a Promise that resolves with the updated authentication details.

**Returns:** <code>Promise&lt;<a href="#authentication">Authentication</a>&gt;</code>

--------------------


### signOut()

```typescript
signOut() => Promise<any>
```

Signs out the user and returns a Promise.

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### Interfaces


#### InitOptions

| Prop                     | Type                  | Description                                                                                                                                      | Default            | Since      |
| ------------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ---------- |
| **`clientId`**           | <code>string</code>   | The app's client ID, found and created in the Google Developers Console. Common for Android or iOS. The default is defined in the configuration. |                    | 3.1.0      |
| **`scopes`**             | <code>string[]</code> | Specifies the scopes required for accessing Google APIs The default is defined in the configuration.                                             |                    | 3.4.0-rc.4 |
| **`grantOfflineAccess`** | <code>boolean</code>  | Set if your application needs to refresh access tokens when the user is not present at the browser. In response use `serverAuthCode` key         | <code>false</code> | 3.1.0      |


#### User

| Prop                 | Type                                                      | Description                                                         |
| -------------------- | --------------------------------------------------------- | ------------------------------------------------------------------- |
| **`id`**             | <code>string</code>                                       | The unique identifier for the user.                                 |
| **`email`**          | <code>string</code>                                       | The email address associated with the user.                         |
| **`name`**           | <code>string</code>                                       | The user's full name.                                               |
| **`familyName`**     | <code>string</code>                                       | The family name (last name) of the user.                            |
| **`givenName`**      | <code>string</code>                                       | The given name (first name) of the user.                            |
| **`imageUrl`**       | <code>string</code>                                       | The URL of the user's profile picture.                              |
| **`serverAuthCode`** | <code>string</code>                                       | The server authentication code.                                     |
| **`authentication`** | <code><a href="#authentication">Authentication</a></code> | The authentication details including access, refresh and ID tokens. |


#### Authentication

| Prop               | Type                | Description                                      |
| ------------------ | ------------------- | ------------------------------------------------ |
| **`accessToken`**  | <code>string</code> | The access token obtained during authentication. |
| **`idToken`**      | <code>string</code> | The ID token obtained during authentication.     |
| **`refreshToken`** | <code>string</code> | The refresh token.                               |

</docgen-api>


## License

[MIT](./LICENSE)
