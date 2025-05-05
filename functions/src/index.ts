import { onCall } from 'firebase-functions/v2/https'
import * as admin from 'firebase-admin'
import { logger } from 'firebase-functions'
import { initializeApp } from 'firebase-admin/app'

initializeApp()

export const setAppIdClaim = onCall(async request => {
  const { uid, appId } = request.data

  logger.info('🔐 Incoming setAppIdClaim request', { uid, appId })

  if (!uid || !appId) {
    logger.warn('⚠️ Missing uid or appId in request data.')
    throw new Error('Missing uid or appId in request data.')
  }

  try {
    await admin.auth().setCustomUserClaims(uid, { appId })
    logger.info(`✅ Custom claim set for user ${uid} with appId: ${appId}`)
    return { success: true, message: 'Custom claim set successfully.' }
  } catch (error) {
    logger.error('❌ Error setting custom claim:', error)
    throw new Error('Failed to set custom claim.')
  }
})