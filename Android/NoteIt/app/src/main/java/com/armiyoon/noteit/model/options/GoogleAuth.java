package com.armiyoon.noteit.model.options;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;


import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;

public class GoogleAuth {
    private Activity activity;


    public GoogleAuth(Activity activity){
        this.activity=activity;
    }

    public Intent SignIn(){

        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestEmail()
                .requestIdToken("172721583058-me8g907emf75ho53k80mjnv325685u3f.apps.googleusercontent.com")
                .build();

        GoogleSignInClient googleSignInClient = GoogleSignIn.getClient(activity, gso);

        return googleSignInClient.getSignInIntent();
    }

    public boolean checkSignIn(){
        GoogleSignInAccount alreadyLoggedAccount = GoogleSignIn.getLastSignedInAccount(activity);
        return alreadyLoggedAccount != null;
    }
}
