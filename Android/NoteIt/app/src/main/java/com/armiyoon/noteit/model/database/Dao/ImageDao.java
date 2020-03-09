package com.armiyoon.noteit.model.database.Dao;


import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import com.armiyoon.noteit.model.database.Table.ImageTable;

import java.util.List;

@Dao
public interface ImageDao {

    @Insert
    void insert(ImageTable... imageTables);

    @Update
    void update(ImageTable... imageTables);

    @Delete
    void delete(ImageTable... imageTables);

    @Query("SELECT * FROM imagetable WHERE noteId=:noteId")
    List<ImageTable> getByNote(int noteId);

}
