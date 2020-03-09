package com.armiyoon.noteit.model.database.Table;

import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.ForeignKey;
import androidx.room.PrimaryKey;

import static androidx.room.ForeignKey.CASCADE;


@Entity(foreignKeys = {@ForeignKey(entity = NoteTable.class,parentColumns = "id",childColumns = "noteId",onDelete = CASCADE)})
public class ImageTable {

    @PrimaryKey
    private final int id;

    @ColumnInfo(index = true)
    private final int noteId;

    private final String url;

    private final byte[] image;

    public ImageTable(int id, int noteId, String url, byte[] image) {
        this.id = id;
        this.noteId = noteId;
        this.url = url;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public int getNoteId() {
        return noteId;
    }

    public String getUrl() {
        return url;
    }

    public byte[] getImage() {
        return image;
    }
}
