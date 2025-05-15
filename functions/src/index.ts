import { onCall } from 'firebase-functions/v2/https'
import * as admin from 'firebase-admin'
import { logger } from 'firebase-functions'
import { initializeApp } from 'firebase-admin/app'

initializeApp()

export const setAppIdClaim = onCall(async request => {
  const { uid, app_id } = request.data

  logger.info('🔐 Incoming setAppIdClaim request', { uid, app_id })

  if (!uid || !app_id) {
    logger.warn('⚠️ Missing uid or app_id in request data.')
    throw new Error('Missing uid or app_id in request data.')
  }

  try {
    await admin.auth().setCustomUserClaims(uid, { app_id })
    logger.info(`✅ Custom claim set for user ${uid} with app_id: ${app_id}`)
    return { success: true, message: 'Custom claim set successfully.' }
  } catch (error) {
    logger.error('❌ Error setting custom claim:', error)
    throw new Error('Failed to set custom claim.')
  }
})
