package com.testreact1.RNClasses;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.testreact1.camera.CameraActivity;

public class ActivityStarterModule extends ReactContextBaseJavaModule {

    ActivityStarterModule(ReactApplicationContext applicationContext){
        super(applicationContext);
    }


    @NonNull
    @Override
    public String getName() {
        return "ActivityStarter";
    }


    @ReactMethod
    void openDocumentScan(){
        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, CameraActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK       );
        context.startActivity(intent);
    }

}
