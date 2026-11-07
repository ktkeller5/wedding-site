# RSVP → Google Sheets

RSVP submissions are posted straight to a Google Sheet via a Google Apps Script web app. Set the server-only environment variable `GOOGLE_APPS_SCRIPT_URL` to the deployment's `/exec` URL for submissions to be accepted.

## Sheet setup

1. Create a Google Sheet.
2. Add a tab named `Responses`.
3. Add this header row:

   `name | email | welcome_party | ceremony_reception | brunch | notes | submitted_at`

4. In **Extensions → Apps Script**, replace the editor contents with `docs/google-apps-script.js`.
5. Deploy as a Web App that executes as the owner and accepts requests from anyone with the URL.
6. Copy the deployment `/exec` URL into the app's `GOOGLE_APPS_SCRIPT_URL` secret (via the Figma Make environment-variable flow — do not commit it).

The script upserts by email, so if a guest resubmits their RSVP, the row updates in place instead of creating a duplicate.
