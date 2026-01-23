# Hosting Frontend on Namecheap (with Vercel Backend)

Since your backend is already hosted on Vercel, you only need to host the Frontend (React) on Namecheap.

## Step 1: Connect Frontend to Vercel Backend

1.  **Get your Vercel URL**:
    - Go to your Vercel Dashboard and find your deployed backend project.
    - Copy the deployment URL (e.g., `https://greyhales-academy-api.vercel.app` - note: it must start with `https://`).

2.  **Update Configuration**:
    - Open `.env.production` in your project root.
    - Replace the placeholder URL with your actual Vercel backend URL.
    - **Example**:
      ```env
      VITE_API_URL=https://your-vercel-backend.vercel.app
      ```
      *(Make sure there is no trailing slash `/` at the end, although usually fine, it's safer without).*

3.  **Build the Project**:
    - Open your terminal in the project folder.
    - Run the build command:
      ```bash
      npm run build
      ```
    - This will generate a fresh `dist` folder configured to talk to your Vercel backend.

---

## Step 2: Upload to Namecheap

1.  **Log in to cPanel**:
    - Go to your Namecheap hosting dashboard -> cPanel.

2.  **Open File Manager**:
    - Navigate to **"File Manager"**.

3.  **Go to Public Folder**:
    - If you are hosting on your main domain (e.g., `yourdomain.com`), go to `public_html`.
    - If hosting on a subdomain (e.g., `app.yourdomain.com`), go to the folder created for that subdomain.
    - **Clear the folder**: Delete existing files *unless* you have other important files there.

4.  **Upload Files**:
    - Select **Upload**.
    - Verify you are uploading the **CONTENTS** of your local `dist` folder.
    - You can zip the contents of `dist`, upload the zip, and then **Extract** it on the server.
    - **Important**: Your `index.html` must be directly in `public_html` (or your subdomain folder), not inside a subfolder like `dist`.

---

## Step 3: Configure routing (Important for React)

Since this is a Single Page Application (SPA), we need to tell the server to redirect all traffic to `index.html` so React Router can handle it.

1.  **Create .htaccess**:
    - In your File Manager (inside `public_html`), create a **New File**.
    - Name it `.htaccess` (ensure the dot is at the start).
    - **Note**: If you don't see it after creating, go to **Settings** (top right) and check "Show Hidden Files (dotfiles)".

2.  **Edit .htaccess**:
    - Right-click `.htaccess` and choose **Edit**.
    - Paste the following code:

    ```apache
    <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    </IfModule>
    ```
    - Save changes.

## Step 4: Final Check

1.  Visit your domain (e.g., `https://yourdomain.com`).
2.  Your React app should load.
3.  Try to Login/Register. It should successfully connect to your Vercel backend.
