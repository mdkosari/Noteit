package com.armiyoon.noteit.peresnter.database;


import android.content.Context;

import androidx.room.Room;

import com.armiyoon.noteit.model.database.Database;
import com.armiyoon.noteit.model.database.Table.ArticleTable;
import com.armiyoon.noteit.view.main.IDashboardView;

import java.util.List;

public class DatabasePeresenter {

    private final Context context;
    private final Database database;
    private final IDashboardView iDashboardView;

    public DatabasePeresenter(Context  context){
        this.context=context;
        this.database= Room.databaseBuilder(context,Database.class,"NoteIt").allowMainThreadQueries().build();
        this.iDashboardView=(IDashboardView)context;
    }

    public void getAllArtices(){
        List<ArticleTable> articles=database.getArticleDao().getAll();
        iDashboardView.receiveAllArticle(articles);
    }

    public void addArticles(ArticleTable... articleTables){
        database.getArticleDao().insert(articleTables);
    }


}
