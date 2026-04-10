#!/usr/bin/env node
const fs=require('fs');const path=require('path');const readline=require('readline');const rl=readline.createInterface({input:process.stdin,output:process.stdout});const colors={reset:'\u001B[0m',green:'\u001B[32m',blue:'\u001B[34m'};const q=(query)=>new Promise((resolve)=>rl.question(query,resolve));(async()=>{console.log(`
${colors.blue}🔧 MONTEERLY STUDIO - Setup${colors.reset}
`);const pid=await q('Firebase Project ID: ');const email=await q('Firebase Client Email: ');const key=await q('Firebase Private Key: ');const stripeSecret=await q('Stripe Secret Key: ');const stripePub=await q('Stripe Publishable Key: ');const fbKey=await q('Firebase API Key: ');const fbEmail=await q('Firebase Messaging Sender ID: ');const fbApp=await q('Firebase App ID: ');const env=`FIREBASE_PROJECT_ID=${pid}
FIREBASE_CLIENT_EMAIL=${email}
FIREBASE_PRIVATE_KEY="${key}"
NEXT_PUBLIC_FIREBASE_API_KEY=${fbKey}
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${pid}.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=${pid}
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${pid}.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${fbEmail}
NEXT_PUBLIC_FIREBASE_APP_ID=${fbApp}
STRIPE_SECRET_KEY=${stripeSecret}
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${stripePub}
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
`;fs.writeFileSync('.env.local',env);console.log(`
${colors.green}✅ Done!
`);rl.close();})();
