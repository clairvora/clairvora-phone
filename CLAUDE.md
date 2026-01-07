# CLAUDE.md - Clairvora Phone Service

## Project Overview

Twilio voice/video call service for Clairvora psychic readings. Handles call initiation, TwiML routing, conference management, and status callbacks.

## Tech Stack

- **Runtime:** Cloudflare Workers
- **Voice/Video:** Twilio
- **Database:** Cloudflare D1 (shared with main app)
- **Auth:** Clerk (validates tokens from main app)
- **Language:** TypeScript

## What This Service Does

- Initiates outbound calls to clients and advisors
- Generates TwiML for call routing
- Manages conference rooms for readings
- Handles Twilio status callbacks
- Tracks call duration for billing
- Updates reading status and balance during calls

## Related Services

| Service | Repo | Purpose |
|---------|------|---------|
| Main App | `clairvora` | UI, payments, user accounts |
| Chat | `clairvora-chat` | WebSocket chat |
| Admin | `clairvora-admin` | Admin dashboard |

## Reference Code

Legacy PHP phone implementation at `/Users/softdev/Sites/clairvora-legacy/`:
- `httpdocs/psychics/readings/call/` - Call reading flow
- `_includes/functions_CALLREADING.php` - Call reading logic
- `_includes/functions_TWILIO.php` - Twilio integration
- `_includes/credentials_twilio.php` - Twilio credentials (structure only)

## Project Structure

```
src/
├── index.ts                    # Worker entry point, routing
├── handlers/
│   ├── initiate.ts             # Start new call
│   ├── twiml-client.ts         # TwiML for client leg
│   ├── twiml-advisor.ts        # TwiML for advisor leg
│   └── status-callback.ts      # Twilio webhooks
└── lib/
    ├── types.ts                # TypeScript types
    ├── twilio.ts               # Twilio API helpers
    └── auth.ts                 # Clerk token validation
```

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/initiate` | POST | Start a new call reading |
| `/twiml/client` | POST | TwiML for client call leg |
| `/twiml/advisor` | POST | TwiML for advisor call leg |
| `/status-callback` | POST | Twilio status webhooks |
| `/health` | GET | Health check |

## Call Flow

1. Main app calls `/initiate` with reading_id
2. Service creates Twilio call to client
3. Client answers → `/twiml/client` returns conference TwiML
4. Service creates Twilio call to advisor
5. Advisor answers → `/twiml/advisor` joins same conference
6. Status callbacks update reading status and duration
7. Call ends → final billing calculated

## Commands

```bash
npm run dev      # Start local dev server
npm run deploy   # Deploy to Cloudflare
```

## Environment Variables

Set via `wrangler secret put`:
- `TWILIO_ACCOUNT_SID` - Twilio account
- `TWILIO_AUTH_TOKEN` - Twilio auth
- `TWILIO_PHONE_NUMBER` - Outbound caller ID
- `CLERK_SECRET_KEY` - Validate auth tokens

D1 binding configured in `wrangler.toml`.
