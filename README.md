# Simple Notes App with React Native

## Strapi Setup

1. Create the .env file using the following format:

        HOST=0.0.0.0 
        PORT=1337
        APP_KEYS=secret1, secret2, secret3, secret4
        API_TOKEN_SALT=secret5
        ADMIN_JWT_SECRET=secret6
        JWT_SECRET=secret7

    Type *xxd -116 -ps /dev/urandom* in terminal to create each of the 16-byte secrets

2. Run *npm install* to install dependencies
3. Run *npm run develop* to start the server
4. Create admin user

    ![My Remote Image](https://user-images.githubusercontent.com/70300320/202225312-f587e48f-1676-44bd-8b28-65fa622205bb.png)

5. Update Permissions

     - Go to Settings => Roles
     - Under Permissions, expand Note permissions
     - Select all permissions
     - Click *Save* at top right
    ![My Remote Image](https://user-images.githubusercontent.com/70300320/202224615-74f17da0-0812-4d59-b9e1-b6c6578109fd.png)


## Expo

1. Download Expo Go from the App Store
2. Run *npm install* to install dependencies.
3. Run *npm start* to start the Metro bundler
4. Change the **base URL** in **/screens/App.js** to the LAN address running the Expo Metro bundler

    ![My Remote Image](https://user-images.githubusercontent.com/70300320/202224183-a7b83e6a-3d5f-420c-8426-bfec95104a63.png)

5. Scan the QR code to open Expo Go

