package com.armiyoon.noteit.view.main;

import com.armiyoon.noteit.model.server.data.TokenData;

public interface ILogin {

    void receiveToken(TokenData tokenData);

    void failed(String error);
}
