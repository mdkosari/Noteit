package com.armiyoon.noteit;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.armiyoon.noteit.model.options.GoogleAuth;
import com.armiyoon.noteit.model.server.data.TokenData;
import com.armiyoon.noteit.peresnter.server.UserController;
import com.armiyoon.noteit.view.main.ILogin;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;

public class LoginActivity extends AppCompatActivity implements ILogin , View.OnClickListener {

    private static final String TAG = "NoteIt";
    Button gLogin,login;
    TextView show,tvSwitch,tvBottom;
    GoogleAuth googleAuth;
    LinearLayout llLogin,llSognUp;
    View vGoogle,vTop;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        initial();
    }

    void initial(){
        gLogin=findViewById(R.id.btn_google_login);
        gLogin.setOnClickListener(this);
        tvBottom=findViewById(R.id.tv_login_bottom);
        tvSwitch=findViewById(R.id.tv_swiche_sign_up);
        tvSwitch.setOnClickListener(this);
        login=findViewById(R.id.btn_login);
        login.setOnClickListener(this);
        googleAuth=new GoogleAuth(this);
        vGoogle=findViewById(R.id.v_google);
        vTop=findViewById(R.id.v_login_top);

        llLogin=findViewById(R.id.ll_login);
        llSognUp=findViewById(R.id.ll_sign_up);



    }

    @SuppressLint("SetTextI18n")
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode){
            case 101:
                try {
                    // The Task returned from this call is always completed, no need to attach
                    // a listener.
                    Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
                    GoogleSignInAccount account = task.getResult(ApiException.class);
//                    onLoggedIn(account);
                    assert account != null;
                    tvBottom.setText(account.getIdToken());
                    getToken(account.getIdToken());

                } catch (ApiException e) {
                    // The ApiException status code indicates the detailed failure reason.
                    Log.w(TAG, "signInResult:failed code=" + e.getStatusCode());
                    tvBottom.setText("catch 1 : "+e);
                }
        }
    }


    void getToken(String id){
        UserController controller=new UserController(this,this.getResources().getString(R.string.base_url));
        controller.start(id);
    }

    @Override
    public void onBackPressed() {
        startActivity(new Intent(this,SplashActivity.class));
        finish();
    }

    @Override
    public void receiveToken(TokenData tokenData) {
        tvBottom.setText(tokenData.getAccessToken());
    }

    @Override
    public void failed(String error) {
        tvBottom.setText("failed : "+error);
    }




    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.tv_swiche_sign_up:
                changeLayout();
                break;

            case R.id.btn_google_login:

                startActivityForResult(googleAuth.SignIn(), 101);
                break;
        }
    }

    private void changeLayout(){

        //check if login layout visible
        if(llLogin.getVisibility()==View.VISIBLE){

            llLogin.setVisibility(View.GONE);//login gone
            llSognUp.setVisibility(View.VISIBLE);//sign up visible
            tvSwitch.setText(" login");//change text swiche layout
            tvBottom.setText("have before account?");

            //set ui params
            LinearLayout.LayoutParams params = (LinearLayout.LayoutParams)
                    vGoogle.getLayoutParams();
            params.weight = 0.6f;
            vGoogle.setLayoutParams(params);
            params=(LinearLayout.LayoutParams) vTop.getLayoutParams();
            params.weight=0.2f;
            vTop.setLayoutParams(params);
        }else //check if sign up visible
            if (llSognUp.getVisibility()==View.VISIBLE){
                //login layout visible and sign up gonr
                llLogin.setVisibility(View.VISIBLE);
                llSognUp.setVisibility(View.GONE);

                //set ui params
                LinearLayout.LayoutParams params = (LinearLayout.LayoutParams)
                        vGoogle.getLayoutParams();
                params.weight = 0.8f;
                vGoogle.setLayoutParams(params);
                params=(LinearLayout.LayoutParams) vTop.getLayoutParams();
                params.weight=0.3f;
                vTop.setLayoutParams(params);
                tvSwitch.setText(" Sign Up");//check text swiche layout
                tvBottom.setText(this.getString(R.string.tv_sign_up_login));
        }
    }
}
