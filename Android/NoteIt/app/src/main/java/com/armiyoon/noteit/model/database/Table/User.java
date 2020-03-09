package com.armiyoon.noteit.model.database.Table;


import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class User {

    @PrimaryKey
    private final int id;

    private final String name;

    private final int login;

    public User(int id, String name, int login) {
        this.id = id;
        this.name = name;
        this.login = login;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getLogin() {
        return login;
    }
}
