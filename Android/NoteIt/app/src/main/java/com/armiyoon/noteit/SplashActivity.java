package com.armiyoon.noteit;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.armiyoon.noteit.model.options.GoogleAuth;
import com.armiyoon.noteit.view.options.ProgressBarAnimation;

public class SplashActivity extends AppCompatActivity implements View.OnClickListener {


    private ProgressBar loading;
    private LinearLayout options;
    private Button login,guest;
    private GoogleAuth googleAuth;
    boolean loggedIn=false,checkTime=false;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        initial();
    }

    void initial(){

        loading=findViewById(R.id.pb_loading_splash);
        options=findViewById(R.id.ll_splash_option);
        guest=findViewById(R.id.btn_guest);
        login=findViewById(R.id.btn_login);

        googleAuth=new GoogleAuth(this);
//        loggedIn=googleAuth.checkSignIn();

        new CountDownTimer(3000,1000){

            @Override
            public void onTick(long millisUntilFinished) { }

            @Override
            public void onFinish() {
                checkTime=true;
                nextStep();
            }
        }.start();
    }

    void nextStep(){
        if(checkTime && !loggedIn) {
            loading.setVisibility(View.GONE);
            options.setVisibility(View.VISIBLE);
            guest.setOnClickListener(this);
            login.setOnClickListener(this);
        }else if(checkTime){
            startActivity(new Intent(this, DashboardActivity.class));
        }
    }

    @Override
    public void onBackPressed() {
        nextStep();
        super.onBackPressed();
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.btn_guest:
                startActivity(new Intent(SplashActivity.this,DashboardActivity.class));
                finish();
                break;
            case R.id.btn_login:
                startActivity(new Intent(this,LoginActivity.class));
                finish();
        }

    }
}