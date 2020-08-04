/*
 * Copyright 2017 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.testreact1.camera;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.testreact1.R;
import com.testreact1.views.ProcessedImageFragment;

import java.io.File;

import devliving.online.cvscanner.CVScanner;
//import android.support.v7.app.AppCompatActivity;

public class CameraActivity extends AppCompatActivity implements
        ProcessedImageFragment.OnFragmentInteractionListener {

    protected final static int REQ_CODE_CROP = 101;

    private Camera2BasicFragment cameraFragment;
    private ProcessedImageFragment processedImgFrag;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            getSupportActionBar().setTitle("");
        }
        setContentView(R.layout.activity_camera);
        if (null == savedInstanceState) {
            cameraFragment = Camera2BasicFragment.newInstance();
            getSupportFragmentManager().beginTransaction()
                    .replace(R.id.container, cameraFragment)
                    .commit();
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()){
            case android.R.id.home:
                finish();
                break;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == Activity.RESULT_OK) {
            switch (requestCode) {
                case REQ_CODE_CROP:
                    String imgPath = data.getStringExtra(CVScanner.RESULT_IMAGE_PATH);
                    if (imgPath != null && (new File(imgPath)).exists()) {
                        Log.d("", "imgPath: " + imgPath);
                        processedImgFrag = ProcessedImageFragment.newInstance(imgPath, "");
                        getSupportFragmentManager().beginTransaction()
                                .replace(R.id.container, processedImgFrag)
                                .commit();

                    }
//                cameraFragment
                    break;
            }
        }
    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }
}