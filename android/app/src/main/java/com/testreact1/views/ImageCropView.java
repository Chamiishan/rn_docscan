package com.testreact1.views;

import android.view.LayoutInflater;
import android.view.View;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.testreact1.R;

public class ImageCropView extends SimpleViewManager<View> {

    private final String REACT_CLASS = "ImageCropper";

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    protected View createViewInstance(@NonNull ThemedReactContext reactContext) {
        return LayoutInflater.from(reactContext).inflate(R.layout.image_cropper, null);
    }



}
