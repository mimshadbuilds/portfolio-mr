# Mimshad's Portfolio

A React, TypeScript, and Vite portfolio hosted on Firebase Hosting. Portfolio
content is backed by Cloud Firestore and can be managed through a protected
admin panel.

## Admin panel setup

The admin editor uses Firebase Authentication with email/password and writes
the `portfolio/content` document in Cloud Firestore. The public portfolio can
read this document; only the verified `mimshad.cse41@gmail.com` account can
change it.

1. In the Firebase console for the configured `portfolio-mr` project, enable
   **Authentication → Sign-in method → Email/Password**.
2. Create the `mimshad.cse41@gmail.com` user under **Authentication → Users**.
   Do not enable public account registration. Sign in at `/admin` and verify
   the email address before editing.
3. Create a Cloud Firestore database if the project does not have one.
4. Deploy the included database rules and the site:

   ```sh
   npm install
   npm run build
   firebase deploy --only firestore:rules,hosting
   ```

   The Firebase CLI must be installed and authenticated to the configured
   project. The rules are in `firestore.rules`; they allow public reads and
   require the verified admin email for every write.
5. Open `https://<your-host>/admin` and sign in. The editor supports profile and
   about content, project cards, skill groups, and blog links. **Save & publish**
   writes the changes to Firestore and updates the public portfolio.

The initial content is provided by `src/data/portfolio.ts`. If no Firestore
document exists, the site displays these defaults until the first save. If the
database is unavailable or rules are not deployed, the public site retains the
defaults and the admin panel reports the Firebase error.

Firebase's Spark plan is no-cost within its current quotas. Review Firebase's
[pricing plans](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans)
and [Firestore pricing](https://firebase.google.com/docs/firestore/pricing)
before enabling paid features or upgrading the project.

## Development

```sh
npm install
npm run dev
```

## Validation

```sh
npm run lint
npm run build
```
