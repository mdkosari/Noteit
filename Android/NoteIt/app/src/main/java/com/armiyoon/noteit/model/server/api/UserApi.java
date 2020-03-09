package com.armiyoon.noteit.model.server.api;

import com.armiyoon.noteit.model.server.data.TokenData;

import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.Headers;
import retrofit2.http.POST;

public interface UserApi {

    //@Header("Authorization") String authHeader
//    @Headers("Content-Type: application/json")
    @POST("/auth/convert-token/")
    @FormUrlEncoded
    Call<TokenData> getToken(@Field("token") String token, @Field("backend") String backend,@Field("grant_type") String grant_type,@Field("client_id") String client_id,@Field("client_secret") String client_secret);

}
