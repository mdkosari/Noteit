package com.armiyoon.noteit.model.database.Table;


import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.ForeignKey;
import androidx.room.PrimaryKey;
import static androidx.room.ForeignKey.CASCADE;





@Entity(foreignKeys = {@ForeignKey(entity = ArticleTable.class,parentColumns = "id",childColumns = "articleId",onDelete = CASCADE)})
public class NoteTable {

    @PrimaryKey
    private final int id;

    private final String note;

    @ColumnInfo(index = true)
    private final int articleId;

    public NoteTable(int id, String note, int articleId) {
        this.id = id;
        this.note = note;

        this.articleId = articleId;
    }

    public int getId() {
        return id;
    }

    public String getNote() {
        return note;
    }

    public int getArticleId() {
        return articleId;
    }
}
