package com.armiyoon.noteit.model.database.Dao;


import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import com.armiyoon.noteit.model.database.Table.NoteTable;

import java.util.List;

@Dao
public interface NoteDao {

    @Insert
    void insert(NoteTable... noteTables);

    @Update
    void update(NoteTable... noteTables);

    @Delete
    void delete(NoteTable... noteTables);

    @Query("SELECT * FROM notetable WHERE articleId=:articleId")
    List<NoteTable> getByArticle(int articleId);

    @Query("SELECT * FROM notetable WHERE id=:id")
    NoteTable getById(int id);


}
