package com.armiyoon.noteit.model.database;

import androidx.room.RoomDatabase;

import com.armiyoon.noteit.model.database.Dao.ArticleDao;
import com.armiyoon.noteit.model.database.Dao.ImageDao;
import com.armiyoon.noteit.model.database.Dao.NoteDao;
import com.armiyoon.noteit.model.database.Table.ArticleTable;
import com.armiyoon.noteit.model.database.Table.ImageTable;
import com.armiyoon.noteit.model.database.Table.NoteTable;

@androidx.room.Database(entities = {ArticleTable.class, NoteTable.class, ImageTable.class},version = 1,exportSchema = false)
public abstract class Database extends RoomDatabase {

    public abstract ArticleDao getArticleDao();
    public abstract NoteDao getNoteDao();
    public abstract ImageDao getImageDao();

}
