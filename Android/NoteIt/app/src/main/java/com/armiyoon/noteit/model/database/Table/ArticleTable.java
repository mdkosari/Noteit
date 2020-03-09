package com.armiyoon.noteit.model.database.Table;

import androidx.room.Entity;
import androidx.room.PrimaryKey;


@Entity(tableName = "article")
public class ArticleTable {

    @PrimaryKey
    private final int id;

    private final String name;

    private final String subject;

    public ArticleTable(int id, String name, String subject) {
        this.id = id;
        this.name = name;
        this.subject = subject;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSubject() {
        return subject;
    }
}
