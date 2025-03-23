// index.js (ESM compatible)
import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { onCall } from 'firebase-functions/v2/https'
import { logger } from 'firebase-functions'

// ✅ Initialize admin
initializeApp()

export const setAppIdClaim = onCall(async request => {
  const { uid, appId } = request.data

  if (!uid || !appId) {
    throw new Error('Missing uid or appId in request data.')
  }

  try {
    const auth = getAuth()
    await auth.setCustomUserClaims(uid, { appId })
    logger.info(`✅ Custom claim set for user ${uid} with appId: ${appId}`)
    return { success: true, message: 'Custom claim set successfully.' }
  } catch (error) {
    logger.error('❌ Error setting custom claim:', error)
    throw new Error('Failed to set custom claim.')
  }
})
