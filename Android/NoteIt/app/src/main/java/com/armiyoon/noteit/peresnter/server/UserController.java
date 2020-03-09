package com.armiyoon.noteit.peresnter.server;

import android.content.Context;

import com.armiyoon.noteit.R;
import com.armiyoon.noteit.model.server.api.UserApi;
import com.armiyoon.noteit.model.server.data.TokenData;
import com.armiyoon.noteit.view.main.ILogin;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.IOException;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class UserController implements Callback<TokenData> {

    private final String baseUrl;
    final Context context;
    final ILogin iLogin;
    public UserController(Context context, String baseUrl){
        this.baseUrl=baseUrl;
        this.context=context;
        this.iLogin=(ILogin)context;
    }

    public void start(String token){

        Gson gson= new GsonBuilder().setLenient().create();

        Retrofit retrofit=new Retrofit.Builder().baseUrl(baseUrl).addConverterFactory(GsonConverterFactory.create(gson)).build();

        UserApi userApi=retrofit.create(UserApi.class);

        Call<TokenData> call=userApi.getToken(token, context.getResources().getString(R.string.backend),context.getResources().getString(R.string.grant_type) ,context.getResources().getString(R.string.client_id) , context.getResources().getString(R.string.client_secret));

        call.enqueue(this);
    }


    @Override
    public void onResponse(Call<TokenData> call, Response<TokenData> response) {
        if (response.isSuccessful()){
            iLogin.receiveToken(response.body());
        }else {
            try {
                iLogin.failed(response.errorBody().string());
            } catch (IOException e) {
                iLogin.failed("unknown error");
            }
        }

    }

    @Override
    public void onFailure(Call<TokenData> call, Throwable t) {
        iLogin.failed(t.toString());
    }




}
