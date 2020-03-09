package com.armiyoon.noteit.model.database.Dao;


import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import com.armiyoon.noteit.model.database.Table.ArticleTable;

import java.util.List;

@Dao
public interface ArticleDao {

    @Insert
    void insert(ArticleTable... articleTables);

    @Update
    void update(ArticleTable... articleTables);

    @Delete
    void delete(ArticleTable... articleTables);

    @Query("SELECT * FROM article")
    List<ArticleTable> getAll();

    @Query("SELECT * FROM article WHERE id=:id")
    ArticleTable getById(int id);

}
