import admin from 'firebase-admin'
import fs from 'fs'
import path from 'path'

if (!admin.apps.length) {
  const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS

  if (!serviceAccountPath) {
    throw new Error(
      'GOOGLE_APPLICATION_CREDENTIALS environment variable is not set.'
    )
  }

  const resolvedPath = path.resolve(serviceAccountPath)
  const serviceAccount = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'))

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
}

export default admin
