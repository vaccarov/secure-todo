package com.anonymous.securetodo

import android.app.Activity
import android.content.Intent
import android.provider.Settings
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SecuritySettingsModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "SecuritySettings"
    }

    @ReactMethod
    fun openSecuritySettings() {
        val activity: Activity? = currentActivity
        activity?.let {
            val intent = Intent(Settings.ACTION_SECURITY_SETTINGS)
            it.startActivity(intent)
        }
    }
}
