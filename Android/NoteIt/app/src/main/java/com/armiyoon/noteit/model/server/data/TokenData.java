package com.armiyoon.noteit.model.server.data;


import com.google.gson.annotations.SerializedName;

public class TokenData {

    @SerializedName("token_type")
    private String tokenType;

    @SerializedName("access_token")
    private String accessToken;

    @SerializedName("refresh_token")
    private String refreshToken;

    @SerializedName("scope")
    private String scope;

    @SerializedName("expires_in")
    private int expiresIn;

    public String getTokenType() {
        return tokenType;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public String getScope() {
        return scope;
    }

    public int getExpiresIn() {
        return expiresIn;
    }
}
